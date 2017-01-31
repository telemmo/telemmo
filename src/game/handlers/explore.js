import {
  append,
  propEq,
  toPairs,
  addIndex,
  partial,
  flatten,
  flip,
  split,
  pipe,
  join,
  head,
  tail,
  map,
  nth,
} from 'ramda'

import Promise from 'bluebird'

import { rejectUndefined } from './errors'
import { randomMonster } from '../core/explore'
import { run, AlreadyOnCombat } from '../core/combat'

function InvalidMap (mapId) {
  this.message = `Invalid map id "${mapId}"`
  this.name = 'InvalidMap'
  this.mapIp = mapId
  Error.captureStackTrace(this, InvalidMap)
}
InvalidMap.prototype = Object.create(Error.prototype)
InvalidMap.prototype.constructor = InvalidMap

const flatHead = pipe(map(head), flatten)

function start (dao, player, mapId) {
  let monster

  try {
    monster = randomMonster(mapId)
  } catch (e) {
    return Promise.reject(new InvalidMap(mapId))
  }

  return dao.character.find({ _id: player.currentCharId })
    .then(flip(append)([[monster]]))
    .then(partial(run, [dao]))
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
      ),
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
  const equip = prizes
    .find(prize => prize.equip)

  const prizesView = _(
    ':arrow_up: Experience: %s\n:shell: Itens: %s\n:tophat: Equips: %s\n',
    exp ? exp.exp : _(':x:'),
    item ? item.item : _(':x:'),
    equip ? equip.equip : _(':x:'),
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

export default function call (dao, provider, _, msg) {
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(rejectUndefined(msg, _('No match')))
    .then(partial(start, [dao, msg.player]))
    .then(partial(render, [_, msg.player]))
    .catch(AlreadyOnCombat, () => _('Already exploring a map!'))
    .catch(InvalidMap, () => _('The desired map does not exist!'))
    .then(partial(reply, [msg]))
}

