export default [
  {
    id: 'fireball',
    name: 'Fireball',
    fire: (attacker, defender, rolls) => ({
      defender: {
        // hp: attacker.flow - defender.def/4,
        hp: 0,
      },
      log: {
        type: 'damage',
        value: rolls.hit
      }
    })
  },
]
