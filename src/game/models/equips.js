export default [
  // Weapons
  {
    id: 'bronze_blade',
    name: 'Bronze Blade',
    description: 'The worst weapon in the game, but it\'s a weapon.',
    type: 'weapon',
    tier: 0,
    bonus: {
      str: 3,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: - ( 2 + attacker.level/10),
      },
      log: {
        type: 'damage',
        value: 2 + attacker.level/10,
      },
    }),
  },
  {
    id: 'leaf_blade',
    name: 'Leaf Blade',
    description: 'A blade. Made of leaf.',
    type: 'weapon',
    tier: 0,
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 17,
      defender: {
        hp: - ( 5 + attacker.level/10),
      },
      log: {
        type: 'damage',
        value: 5 + attacker.level/10,
      },
    }),
  },
  {
    id: 'silver_dagger',
    name: 'Silver Dagger',
    description: 'A silver dagger.',
    type: 'weapon',
    tier: 1,
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: - ( 3 + attacker.level/10),
      },
      log: {
        type: 'damage',
        value: 3 + attacker.level/10,
      },
    }),
  },
  {
    id: 'sharded_club',
    name: 'Sharded Club',
    description: 'A really spiky club.',
    type: 'weapon',
    tier: 1,
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aHit < 17,
      defender: {
        hp: - ( 10 + attacker.level/10),
      },
      log: {
        type: 'damage',
        value: 10 + attacker.level/10,
      },
    }),
  },
  {
    id: 'whip_of_vines',
    name: 'Whip of Vines',
    description: 'It was supposed to be "Vine Whip" but maybe Nintendo would sue us.',
    type: 'weapon',
    tier: 2,
    bonus: {
      str: 15,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 15 || rolls.aAim < 15),
      defender: {
        hp: - ( 20 + attacker.level/5),
      },
      log: {
        type: 'damage',
        value: 20 + attacker.level/5,
      },
    }),
  },
  {
    id: 'psycho_scythe',
    name: 'Psycho Scythe',
    description: 'A scythe once used by a psycho.',
    type: 'weapon',
    tier: 3,
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 10),
      defender: {
        hp: - ( 13 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: 13 + attacker.level/4,
      },
    }),
  },
  {
    id: 'lancicle',
    name: 'Lancicle',
    description: 'It\'s shinny and it\'s pointy.',
    type: 'weapon',
    tier: 4,
    bonus: {
      str: 17,
      con: 7,
      ref: 7,
      acc: 7,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 18),
      defender: {
        hp: - ( 30 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: 30 + attacker.level/4,
      },
    }),
  },
  // Sets
  {
    id: 'bronze_armor',
    name: 'Bronze Armor',
    description: 'Not quite good but brings in some defense.',
    type: 'set',
    tier: 0,
    bonus: {
      con: 2,
      ref: 2,
    },
  },
  {
    id: 'foliage_camouflage',
    name: 'Foliage Camouflage',
    description: 'A set. Made of leaf.',
    type: 'set',
    tier: 0,
    bonus: {
      con: 5,
      ref: 5,
    },
  },
  {
    id: 'silver_armor',
    name: 'Silver Armor',
    description: 'A silver armor.',
    type: 'set',
    tier: 1,
    bonus: {
      con: 4,
      ref: 4,
    },
  },
  {
    id: 'granite_armor',
    name: 'Granite Armor',
    description: 'You can now kill stuff inside a rock.',
    type: 'set',
    tier: 1,
    bonus: {
      str: 5,
      con: 10,
    },
  },
  {
    id: 'porcelain_armor',
    name: 'Porcelain Armor',
    description: 'Porcelain is actually quite resistent.',
    type: 'set',
    tier: 2,
    bonus: {
      con: 20,
    },
  },
  {
    id: 'miasma_shroud',
    name: 'Miasma Shroud',
    description: 'Google it, it\'s easier.',
    type: 'set',
    tier: 3,
    bonus: {
      con: 20,
      str: 5,
      ref: 5,
    },
  },
  {
    id: 'glacier_armor',
    name: 'Glacier Armor',
    description: 'Kinda cold but you can manage it.',
    type: 'set',
    tier: 4,
    bonus: {
      con: 25,
      str: 10,
      ref: 10,
    },
  },
  // Tokens
  {
    id: 'golden_beetle',
    name: 'Golden Beetle',
    description: 'A shiny beetle that helps you.',
    type: 'token',
    tier: 0,
    bonus: {
      flow: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 19,
      attacker: {
        hp: 5 + attacker.level/10,
      },
      log: {
        type: 'heal',
        value: 5 + attacker.level/10,
      },
    }),
  },
  {
    id: 'precious_ore',
    name: 'Precious Ore',
    description: 'A rare magical ore with mistery powers.',
    type: 'token',
    tier: 1,
    bonus: {
      flow: 8,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 18,
      attacker: {
        hp: 10 + attacker.level/10,
        flow: attacker.flow * 0.1,
      },
      log: {
        type: 'heal (+FLOW)',
        value: 10 + attacker.level/10,
      },
    }),
  },
  {
    id: 'old_soul',
    name: 'Old Soul',
    description: 'You found this lonely soul and now it\'s by your side.',
    type: 'token',
    tier: 2,
    bonus: {
      flow: 12,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 15,
      attacker: {
        hp: 10 + attacker.level/5,
        con: attacker.con * 0.2,
      },
      log: {
        type: 'heal (+CON)',
        value: 10 + attacker.level/5,
      },
    }),
  },
  {
    id: 'demons_pick' ,
    name: 'Demon\'s Pick',
    description: 'Jack Black would be prowd of you.',
    type: 'token',
    tier: 3,
    bonus: {
      flow: 15,
      ref: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 15,
      attacker: {
        hp: 15 + attacker.level/5,
        ref: attacker.ref * 0.2,
      },
      log: {
        type: 'heal (+REF)',
        value: 15 + attacker.level/5,
      },
    }),
  },
  {
    id: 'ice_ring' ,
    name: 'Ice Ring',
    description: 'It looks as powerfull as it shines.',
    type: 'token',
    tier: 4,
    bonus: {
      flow: 17,
      ref: 10,
      str: 10,
      acc: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 15,
      attacker: {
        hp: 15 + attacker.level/5,
      },
      log: {
        type: 'heal',
        value: 15 + attacker.level/5,
      },
    }),
  },
]
