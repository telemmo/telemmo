import {
  ifElse,
  propEq,
  always,
  toPairs,
  contains,
  addIndex,
  partial,
  flatten,
  split,
  pipe,
  join,
  head,
  last,
  tail,
  map,
  nth,
} from 'ramda'

import Promise from 'bluebird'

import i18n from '../i18n'
import models from '../models'
import { rejectUndefined } from './errors'
import { exploreUntilDead } from '../core/explore'

const flatHead = pipe(map(head), flatten)

export function renderCombat (player, combat) {
  return {
    to: player.providers.telegram.id,
    text: render(i18n.singular(player.language), player, combat),
  }
}

export function render (_, player, result) {
  const initiative = head(result.turns)
  const turns = tail(result.turns)
  const prizes = result.prizes.filter(
    propEq('charId', player.currentCharId),
  )

  const header = join(' ', [
    contains(player.currentCharId, result.winners)
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
      ifElse(
        propEq('damage', 0),
        t => _('<b>%s</b> <i>missed</i>\n', last(split(' ', t.attacker))),
        t => _('<b>%s</b> dealt <b>%s damage</b>\n',
          last(split(' ', t.attacker)),
          t.damage.toFixed(0),
        ),
      )(turn),
      (turn.casts || []).map(cast =>
        _('%s <b>%s</b> cast for <b>%s %s</b>\n',
          cast.emoji,
          cast.skill,
          cast.value,
          cast.type,
        ),
      ).join(''),
      _("<b>%s</b>'s hp: <b>%s</b> / %s",
        last(split(' ', turn.defender)),
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
    ':arrow_up: Experience: %s\n:shell: Items: %s\n:tophat: Equips: %s\n',
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

function renderCombat (player, combat) {
  return {
    to: player.providers.telegram.id,
    text: render(_.singular(player.language), player, combat),
  }
}

function InvalidMap (mapId) {
  this.message = `Invalid map id "${mapId}"`
  this.name = 'InvalidMap'
  this.mapIp = mapId
  Error.captureStackTrace(this, InvalidMap)
}
InvalidMap.prototype = Object.create(Error.prototype)
InvalidMap.prototype.constructor = InvalidMap


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
  const stancesIds = models.classes.find(char.classId).stances
  const stances = stancesIds.map(models.stances.find)

  dispatch({
    to: msg.chat,
    text: _('You started exploring %s!', gameMap.name),
    options: [
      [`/explore_${gameMap.id}`, ':information_source: /char_info'],
      stances.map(stance => `${stance.emoji} /stance_${stance.id}`),
      [':arrow_left: /overworld', ':earth_asia: /maps'],
    ],
  })
}


function startFight (dao, dispatch, _, msg, gameMap, char) {
  const exploration = exploreUntilDead(dao, msg.player, gameMap, char)

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

