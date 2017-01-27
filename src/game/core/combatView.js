import {
  head,
  tail,
  dropLast,
  last,
  map,
  mapObjIndexed,
  toPairs,
} from 'ramda'

import _ from 'printf'

export function test () {
  console.log(
    viewCombat(combat, 'Worms')
  )
}

export function viewCombat (c, id) {
  const initiative = head(c.turns)
  const turns = tail(c.turns)
  const prizes = c.prizes.filter(prize => prize.owner === id)
  const getTeamInit = name =>
    c.teams.find(team => team.members.find(member => member.name === name)).overall.init

  const header = _(`%s vs. %s\n\n`, c.teams[0].overall.name, c.teams[1].overall.name)

  const initiativeView = _(
    '*%s* won the initiative!\n%s\n',
    initiative.winner,
    map(
      (pair) => `${pair[0]}: ${pair[1]} (+${getTeamInit(pair[0])})\n`,
      toPairs(initiative.rolls)
    ).join('')
  )

  const turnsView = _(
    '%s\n\n',
    turns.map(turn =>
      `*${
        turn.attacker
      }* rolled: ${map(
      (pair) => `${pair[0]} ${pair[1]}, `,
      toPairs(turn.rolls)
    ).join('')}${
        turn.casts ? turn.casts.map(cast => `\n+ casted ${cast.skill} for ${cast.value} ${cast.type}`).join('') : ''
      }\nattacked ${turn.damage} damage. *${turn.defender}'s hp: ${turn.defenderHp}*`
    ).join('\n\n')
  )

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

  const view = header + initiativeView + turnsView + prizesView
  return view
}
