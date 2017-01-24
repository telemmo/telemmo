export default [
  {
    name: 'Rat',
    bonus: {
      atk: 3,
    },
  },
  {
    name: 'Spider',
    bonus: {
      dod: 3,
    },
    skill: (combat) => {
      if (combat.rolls.aim >= 15) {
        combat.teams[1].poisoned = true
      }
    },
  },
]
