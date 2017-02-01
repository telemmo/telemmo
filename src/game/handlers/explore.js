import {
  propEq,
  always,
  toPairs,
  addIndex,
  identity,
  partial,
  flatten,
  ifElse,
  isNil,
  split,
  pipe,
  join,
  head,
  tail,
  tap,
  map,
  nth,
} from 'ramda'

import Promise from 'bluebird'
import { Observable } from 'rx'

import models from '../models'
import { rejectUndefined } from './errors'
import { randomMonster } from '../core/explore'
import { run } from '../core/combat'

function InvalidMap (mapId) {
  this.message = `Invalid map id "${mapId}"`
  this.name = 'InvalidMap'
  this.mapIp = mapId
  Error.captureStackTrace(this, InvalidMap)
}
InvalidMap.prototype = Object.create(Error.prototype)
InvalidMap.prototype.constructor = InvalidMap

const flatHead = pipe(map(head), flatten)

function fightUntilDead (dao, player, gameMap, char) {
  return Observable.create((subscriber) => {
    function fight () {
      const monster = randomMonster(gameMap.id)

      return run(dao, [[monster], [char]])
        .then(ifElse(
          isNil,
          () => Promise.reject(new Error()),
          identity,
        ))
        .then(tap(subscriber.next.bind(subscriber)))
        .then(ifElse(
          propEq('winner', player.currentCharId),
          fight,
          identity,
        ))
        .catch(() => console.log('Invalid combat token, refusing to save'))
    }

    fight()
  })
}

export function render (_, player, result) {
  const initiative = head(result.turns)
  const turns = tail(result.turns)
  const prizes = result.prizes.filter(
    propEq('charId', player.currentCharId),
  )

  const header = join(' ', [
    `${result.winner}` === `${player.currentCharId}`
    ? _(':heavy_check_mark:')
    : _(':x:'),
    _(
      '%s vs. %s\n\n',
      result.teams[0].overall.name,
      result.teams[1].overall.name,
    ),
  ])

  const bullets = [
    ':small_orange_diamond:',
    ':small_blue_diamond:',
  ]

  const largeBullets = [
    ':large_orange_diamond:',
    ':large_blue_diamond:',
  ]

  const initiativeRolls = toPairs(initiative.rolls)

  const initiativeView = _(
    '%s\n<b>%s</b> won the initiative!\n\n',
    addIndex(map)(
      (pair, idx) =>
        `${largeBullets[idx]} ${pair[0]} rolled ${pair[1]}\n`,
      initiativeRolls,
    ).join(''),
    initiative.winner,
  )

  const turnsView =
    join('', turns.map(turn => join('', [
      bullets[flatHead(initiativeRolls).indexOf(turn.attacker)],
      // `<b>${head(split(' ', turn.attacker))}</b> `,
      _(':dart: %s :anger: %s :sparkles: %s\n',
        turn.rolls.aAim,
        turn.rolls.aHit,
        turn.rolls.aSkill,
      ),
      _('<b>%s</b> dealt <b>%s damage</b>\n',
        head(split(' ', turn.attacker)),
        turn.damage.toFixed(0),
      ),
      (turn.casts || []).map(cast =>
        _('%s <b>%s</b> casted for <b>%s %s</b>\n',
          cast.emoji,
          cast.skill,
          cast.value,
          cast.type,
        ),
      ).join(''),
      _("<b>%s</b>'s hp: <b>%s</b> / %s",
        head(split(' ', turn.defender)),
        turn.defenderHp.current.toFixed(0),
        turn.defenderHp.init.toFixed(0),
      ),
      '\n',
      '\n',
    ])))

  const exp = prizes
    .find(prize => prize.exp)
  const item = prizes
    .find(prize => prize.item)
  const equips = prizes
    .filter(prize => prize.equip)

  const prizesView = _(
    ':arrow_up: Experience: %s\n:shell: Itens: %s\n:tophat: Equips: %s\n',
    exp ? exp.exp : _(':x:'),
    item ? item.item : _(':x:'),
    equips.length > 0
      ? equips.map(o => models.equips.find(o.equip).name).join(', ')
      : _(':x:'),
  )

  const text = join('', [
    header,
    initiativeView,
    turnsView,
    prizesView,
  ])

  return text
}

function reply (msg, text) {
  return {
    to: msg.chat,
    text,
  }
}

function sendCombatResult (dispatch, _, msg, combat) {
  const text = render(_, msg.player, combat)
  dispatch(reply(msg, text))
}

function sendExplorationStart (dispatch, _, msg, gameMap, char) {
  const stances = models.classes.find(char.classId).stances

  dispatch({
    to: msg.chat,
    text: _('You started exploring %s!', gameMap.name),
    options: [
      [`/explore_${gameMap.id}`],
      stances.map(id => `/stance_${id}`),
      ['/overworld', '/maps'],
    ],
  })
}

function startFight (dao, dispatch, _, msg, gameMap, char) {
  const exploration = fightUntilDead(dao, msg.player, gameMap, char)

  exploration.subscribe(
    partial(sendCombatResult, [dispatch, _, msg]))

  return sendExplorationStart(dispatch, _, msg, gameMap, char)
}

function startExploring (dao, dispatch, _, msg, mapId) {
  let gameMap

  try {
    gameMap = models.maps.find(mapId)
  } catch (e) {
    throw new InvalidMap(mapId)
  }

  return dao.character.find({ _id: msg.player.currentCharId })
    .then(head)
    .then(partial(startFight, [dao, dispatch, _, msg, gameMap]))
    .then(always(_('You will only stop if you lose a battle. If that happens, just start exploring again.')))
}

export default function call (dao, dispatch, _, msg) {
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(rejectUndefined(msg, _('No match')))
    .then(partial(startExploring, [dao, dispatch, _, msg]))
    .catch(InvalidMap, () => _('The desired map does not exist!'))
    .then(partial(reply, [msg]))
}

