import { buildCombatStats } from './combatStats'

const player = {
  str: 5,
  con: 5,
  acc: 5,
  ref: 5,
  flow: 5,
  level: 0,
  equips: {
    weapon: 'leaf_blade',
    set: 'feather',
    token: 'ice_ring',
  },
}

test('combat stats', () => {
  expect(buildCombatStats(player)).toMatchObject({
    str: 20,
    con: 15,
    acc: 15,
    ref: 25,
    flow: 22,
    level: 0,
    equips: {
      weapon: 'leaf_blade',
      set: 'feather',
      token: 'ice_ring',
    },
    initialHp: (20 + 15 + 15 + 25) / 4 + 0 + 50
  })
})
