export default [
  {
    id: 'arcane',
    name: 'Arcane',
    emoji: ':stars:',
    description: 'You channel the arcane power and cast powerfull spells.',
    bonus: {
      int: 5,
      kno: 10,
      acc: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'debuff',
    name: 'Debuff',
    emoji: ':hotsprings:',
    description: 'You use dirty magic, your spells can disable or weaken the enemies.',
    bonus: {
      int: 10,
      kno: 5,
      acc: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'endure',
    name: 'Endure',
    emoji: ':tractor:',
    description: 'You boost your defensive stats by concentrating on endurance.',
    bonus: {
      con: 10,
      str: 5,
      ref: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'berserk',
    name: 'Berserk',
    emoji: ':triumph:',
    description: 'You enrage and attacks become faster and stronger.',
    bonus: {
      str: 10,
      ref: 10,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'poison',
    name: 'Poison',
    emoji: ':pill:',
    description: 'Your sklls and weapons are really toxic.',
    bonus: {
      acc: 10,
      ref: 10,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'stealth',
    name: 'Stealth',
    emoji: ':ghost:',
    description: 'You use silent moves.',
    bonus: {
      str: 10,
      acc: 5,
      ref: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'martial',
    name: 'Martial',
    emoji: ':mortar_board:',
    description: 'You\'ve trained martial arts in the monastery. You use melee combat.',
    bonus: {
      int: 7,
      kno: 7,
      ref: 6,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'buffer',
    name: 'Buffer',
    emoji: ':church:',
    description: 'You use divine power to heal and buff you and your allies.',
    bonus: {
      int: 10,
      kno: 10,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'sniper',
    name: 'Sniper',
    emoji: ':eight_pointed_black_star:',
    description: 'You aim really well because of your military training. Shoot from far away.',
    bonus: {
      acc: 10,
      str: 5,
      ref: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'trapper',
    name: 'Trapper',
    emoji: ':fishing_pole_and_fish:',
    description: 'Your military skills allows you to plan your fights very well. You use traps and explosives.',
    bonus: {
      ref: 20,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    emoji: ':flower_playing_cards:',
    description: 'You empower your allies in combat by giving them better weapons and potions in combat using your skills.',
    bonus: {
      int: 10,
      ref: 5,
      kno: 5,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
  {
    id: 'breaker',
    name: 'Breaker',
    emoji: ':eight_spoked_asterisk:',
    description: 'You know the opponent\'s armor weak spots because you sell them. Your attacks deals more damage and disables your enemies.',
    bonus: {
      str: 10,
      acc: 10,
    },
    skills: [
      {
        id: 'fireball',
        influence: 20,
      },
    ],
  },
]
