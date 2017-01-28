export default [
  {
    id: 'fireball',
    name: 'Fireball',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: 0,
      },
      log: {
        type: 'damage',
        value: 0,
      },
    }),
  },
]
