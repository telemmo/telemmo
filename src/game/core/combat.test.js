import models from '../models'

function exploreMock (allStats, stance, monster) {
  return [
    [{
      name: 'Worms',
      stance: 'arcane',
      flow: allStats,
      str: allStats,
      ref: allStats,
      acc: allStats,
      con: allStats,
      equips: {
        weapon: 'poison_dagger'
      }
    }],
    [models.monsters.find(monster)],
  ]
}

test('combat', () => {
  const { combat } = require('./combat')

  const teams = (exploreMock(100, 'arcane', 'death'))
  return combat(teams)
    .tap(({ finishedAt, winner }) => {
      expect(finishedAt).toBeTruthy()
      expect(winner).toBeTruthy()
    })
    // .tap(c => console.log(JSON.stringify(c, null, 2)))
});

