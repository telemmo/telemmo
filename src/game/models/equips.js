import {
  lensPath,
  view,
  set,
} from 'ramda'

const defenderAim = lensPath(['teams', 1, 'overall', 'aim'])

export default [
  {
    id: 'leaf_blade',
    name: 'Leaf Blade',
    type: 'weapon',
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: - ( 5 + attacker.lvl/10),
      },
      log: {
        type: 'damage',
        value: 5 + attacker.lvl/10,
      },
    }),
  },
  {
    id: 'sharded_club',
    name: 'Sharded Club',
    type: 'weapon',
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aHit < 18,
      defender: {
        hp: - ( 10 + attacker.lvl/10),
      },
      log: {
        type: 'damage',
        value: 10 + attacker.lvl/10,
      },
    }),
  },
  {
    id: 'foliage',
    name: 'Foliage',
    type: 'set',
    bonus: {
      con: 5,
      ref: 5,
    },
  },
  {
    id: 'granite',
    name: 'Granite',
    type: 'set',
    bonus: {
      str: 5,
      con: 15,
    },
  },
  {
    id: 'golden_beetle',
    name: 'Golden Beetle',
    type: 'token',
    bonus: {
      flow: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 19,
      attacker: {
        hp: 5 + attacker.lvl/10,
      },
      log: {
        type: 'heal',
        value: 5 + attacker.lvl/10,
      },
    }),
  },
  {
    id: 'precious_ore',
    name: 'Precious Ore',
    type: 'token',
    bonus: {
      flow: 8,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 18,
      attacker: {
        hp: 3 + attacker.lvl/10,
        flow: attacker.flow * 0.1,
      },
      log: {
        type: 'heal (+FLOW)',
        value: 3 + attacker.lvl/10,
      },
    }),
  },
]
