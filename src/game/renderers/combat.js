import {
  ifElse,
  propEq,
  toPairs,
  contains,
  addIndex,
  flatten,
  split,
  pipe,
  join,
  head,
  last,
  tail,
  map,
} from 'ramda'

import models from '../models'
import i18n from '../i18n'

const flatHead = pipe(map(head), flatten)

function render (_, player, result) {
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

export default function renderCombat (player, combat) {
  console.log('renderCombat:', JSON.stringify({ player }))

  return {
    to: player.providers.telegram.id,
    text: render(i18n.singular(player.language), player, combat),
  }
}

