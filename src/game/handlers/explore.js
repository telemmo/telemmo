import {
  propEq,
  toPairs,
  addIndex,
  partial,
  flatten,
  split,
  pipe,
  join,
  head,
  tail,
  map,
  nth,
} from 'ramda'

import Promise from 'bluebird'

import { reject, rejectUndefined } from './errors'
import { randomMonster } from '../core/explore'
import { run } from '../core/combat'

const flatHead = pipe(map(head), flatten)

function start (dao, player, mapId) {
  return Promise.all([
    dao.character.find({ _id: player.currentCharId }),
    [randomMonster(mapId)],
  ])
    .then(partial(run, [dao]))
}

function render (_, player, result) {
  console.log(result)

  const initiative = head(result.turns)
  const turns = tail(result.turns)
  const prizes = result.prizes.filter(
    propEq('charId', player.currentCharId),
  )

  console.log('prizes:', prizes)

  console.log('result.winner', result.winner, 'player.currentCharId', player.currentCharId)

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
    ':black_small_square:',
    ':white_small_square:',
    ':small_red_triangle:',
  ]

  const initiativeRolls = toPairs(initiative.rolls)

  const initiativeView = _(
    '*%s* won the initiative!\n%s\n',
    initiative.winner,
    addIndex(map)(
      (pair, idx) => `${bullets[idx]} ${pair[0]} rolled ${pair[1]}\n`,
      initiativeRolls,
    ).join(''),
  )

  const turnsView =
    join('', turns.map(turn => join('', [
      bullets[flatHead(initiativeRolls).indexOf(turn.attacker)],
      `*${head(split(' ', turn.attacker))}*\n`,
      _('`:dart: %s :anger: %s :sparkles: %s`\n',
        turn.rolls.aAim,
        turn.rolls.aHit,
        turn.rolls.aSkill,
      ),
      (turn.casts || []).map(cast =>
        _('Casted %s for %s %s\n',
          cast.skill,
          cast.value,
          cast.type,
        ),
      ),
      _('Attacked for %s damage', turn.damage),
      '\n',
      _("%s's hp: %s/%s",
        head(split(' ', turn.defender)),
        turn.defenderHp.current,
        turn.defenderHp.init,
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
    'Experience: %s\nItens: %s\nEquips: %s\n',
    exp ? exp.exp : _('none :('),
    item ? item.item : _('none :('),
    equip ? equip.equip : _('none :('),
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
    .then(rejectUndefined(msg, _('Invalid map name')))
    .then(partial(start, [dao, msg.player]))
    .then(partial(render, [_, msg.player]))
    .then(partial(reply, [msg]))
    .catch(partial(reject, [msg, _('Invalid map name')]))
}

