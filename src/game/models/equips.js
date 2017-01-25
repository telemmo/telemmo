export default [
  {
    id: 'spider_web_clothes',
    name: 'Spider Web Clothes',
    description: 'A set of clothes made from spider web.',
    type: 'set',
    bonus: {
      def: 5,
    },
  },
  {
    id: 'spidy',
    name: 'Spidy',
    description: 'A small spider companion',
    type: 'token',
    bonus: {
      atk: 5,
      def: 5,
    },
  },
  {
    id: 'poison_dagger',
    name: 'Poison Dagger',
    description: 'A dagger poisoned with snake venom. Poisons the enemy if you roll 19 or higher in AIM d20',
    type: 'weapon',
    bonus: {
      atk: 5,
    },
    skill: (combat) => {
      if (combat.rolls.aim >= 19) {
        combat.teams[1].poisoned = true
      }
    },
  },
]
