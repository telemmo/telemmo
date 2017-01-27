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

const combat = {
  "teams": [
    {
      "overall": {
        "atk": 6,
        "def": 1,
        "aim": 1,
        "dod": 1,
        "initialHp": 51,
        "flow": 1,
        "init": 4,
        "name": "Worms",
        "str": 8,
        "int": 13,
        "ref": 8,
        "acc": 13,
        "con": 8,
        "kno": 18,
        "equips": {
          "weapon": "poison_dagger"
        },
        "hp": 38
      },
      "members": [
        {
          "atk": 6,
          "def": 1,
          "aim": 1,
          "dod": 1,
          "initialHp": 51,
          "flow": 1,
          "init": 4,
          "name": "Worms",
          "stance": "arcane",
          "str": 8,
          "int": 13,
          "ref": 8,
          "acc": 13,
          "con": 8,
          "kno": 18,
          "equips": {
            "weapon": "poison_dagger"
          },
          "hp": 51
        }
      ]
    },
    {
      "overall": {
        "stance": [],
        "atk": 0,
        "def": 0,
        "aim": 0,
        "dod": 0,
        "initialHp": 50,
        "flow": 0,
        "init": 0,
        "id": "rat",
        "name": "Rat",
        "str": 1,
        "int": 1,
        "ref": 1,
        "acc": 1,
        "con": 1,
        "kno": 1,
        "prizes": {
          "exp": 2,
          "items": [
            "Fang"
          ],
          "equips": [
            "spider_web_clothes",
            "spidy"
          ],
          "tokens": [
            "spidy"
          ]
        },
        "hp": -7
      },
      "members": [
        {
          "atk": 0,
          "def": 0,
          "aim": 0,
          "dod": 0,
          "initialHp": 50,
          "flow": 0,
          "init": 0,
          "id": "rat",
          "name": "Rat",
          "str": 1,
          "int": 1,
          "ref": 1,
          "acc": 1,
          "con": 1,
          "kno": 1,
          "prizes": {
            "exp": 2,
            "items": [
              "Fang"
            ],
            "equips": [
              "spider_web_clothes",
              "spidy"
            ],
            "tokens": [
              "spidy"
            ]
          },
          "hp": 50
        }
      ]
    }
  ],
  "startedAt": "2017-01-27T04:51:18.138Z",
  "turns": [
    {
      "winner": "Rat",
      "rolls": {
        "Worms": 7,
        "Rat": 17
      }
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 0,
      "defenderHp": 51,
      "rolls": {
        "skill": 12,
        "aim": 4,
        "hit": 18
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 0,
      "defenderHp": 50,
      "rolls": {
        "skill": 17,
        "aim": 5,
        "hit": 14
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 0,
      "defenderHp": 51,
      "rolls": {
        "skill": 16,
        "aim": 9,
        "hit": 6
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 10,
      "defenderHp": 50,
      "rolls": {
        "skill": 15,
        "aim": 9,
        "hit": 8
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 0,
      "defenderHp": 51,
      "rolls": {
        "skill": 13,
        "aim": 6,
        "hit": 2
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 9,
      "defenderHp": 50,
      "rolls": {
        "skill": 15,
        "aim": 12,
        "hit": 7
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 0,
      "defenderHp": 51,
      "rolls": {
        "skill": 15,
        "aim": 1,
        "hit": 6
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 15,
      "defenderHp": 35,
      "rolls": {
        "skill": 14,
        "aim": 12,
        "hit": 13
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 0,
      "defenderHp": 51,
      "rolls": {
        "skill": 18,
        "aim": 7,
        "hit": 5
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 21,
      "defenderHp": 14,
      "rolls": {
        "skill": 7,
        "aim": 14,
        "hit": 19
      },
      "casts": [
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 13,
      "defenderHp": 38,
      "rolls": {
        "skill": 11,
        "aim": 17,
        "hit": 13
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 0,
      "defenderHp": 14,
      "rolls": {
        "skill": 16,
        "aim": 8,
        "hit": 10
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    },
    {
      "attacker": "Rat",
      "defender": "Worms",
      "damage": 1,
      "defenderHp": 38,
      "rolls": {
        "skill": 11,
        "aim": 15,
        "hit": 1
      },
      "casts": []
    },
    {
      "attacker": "Worms",
      "defender": "Rat",
      "damage": 21,
      "defenderHp": -7,
      "rolls": {
        "skill": 13,
        "aim": 12,
        "hit": 19
      },
      "casts": [
        {
          "skill": "Fireball",
          "type": "damage",
          "value": 0
        },
        {
          "skill": "Poison Dagger",
          "type": "aim debuff",
          "value": 0
        }
      ]
    }
  ],
  "prizes": [
    {
      "owner": "Worms",
      "exp": 2
    }
  ],
  "finishedAt": "2017-01-27T04:51:18.167Z",
  "winner": "Worms"
}

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
      `*${turn.attacker}* rolled: ${map(
        (pair) => `${pair[0]} ${pair[1]}, `,
        toPairs(turn.rolls)
      ).join('')}\nfor ${turn.damage} damage. *${turn.defender}'s hp: ${turn.defenderHp}*'`
    ).join('\n')
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
