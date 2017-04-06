export default [
  // Weapons
  {
    id: 'bronze_blade',
    name: 'Bronze Blade',
    description: 'The worst weapon, but a weapon, amirite?',
    type: 'weapon',
    tier: 0,
    bonus: {
      str: 3,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: -2 - (attacker.level / 10),
      },
      log: {
        type: 'damage',
        value: 2 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'leaf_blade',
    name: 'Leaf Blade',
    description: 'A blade definitely not for smoking',
    type: 'weapon',
    tier: 2,
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 17,
      defender: {
        hp: -5 - (attacker.level / 10),
      },
      log: {
        type: 'damage',
        value: 5 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'silver_dagger',
    name: 'Silver Dagger',
    description: 'You just threw the fork away and called it dagger',
    type: 'weapon',
    tier: 1,
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: -3 - (attacker.level / 10),
      },
      log: {
        type: 'damage',
        value: 3 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'sharded_club',
    name: 'Sharded Club',
    description: 'A piece of rock as cool as it\'s impractical',
    type: 'weapon',
    tier: 3,
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aHit < 17,
      defender: {
        hp: -10 - (attacker.level / 10),
      },
      log: {
        type: 'damage',
        value: 10 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'swift_dagger',
    name: 'Swift Dagger',
    description: 'It\'s really light.',
    type: 'weapon',
    tier: 2,
    bonus: {
      str: 3,
      ref: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 17,
      defender: {
        hp: -4 - (attacker.level / 10),
      },
      log: {
        type: 'damage',
        value: 4 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'whip_of_vines',
    name: 'Whip of Vines',
    description: 'NOT "Vine Whip", we swear ;)',
    type: 'weapon',
    tier: 4,
    bonus: {
      str: 15,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 15 || rolls.aAim < 15),
      defender: {
        hp: -20 - (attacker.level / 5),
      },
      log: {
        type: 'damage',
        value: 20 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'psycho_scythe',
    name: 'Psycho Scythe',
    description: 'Better a psycho in your hands than a psycho in your city',
    type: 'weapon',
    tier: 5,
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 10),
      defender: {
        hp: -13 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 13 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'lancicle',
    name: 'Lancicle',
    description: 'IRL you would lick it... You also would regret it',
    type: 'weapon',
    tier: 6,
    bonus: {
      str: 17,
      con: 7,
      ref: 7,
      acc: 7,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 15),
      defender: {
        hp: -30 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 30 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'molten_gauntlets',
    name: 'Molten Gauntlets',
    description: 'How do you wear them?',
    type: 'weapon',
    tier: 7,
    bonus: {
      str: 22,
      con: 12,
      ref: 12,
      acc: 12,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 15),
      defender: {
        hp: -35 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 35 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'fire_sword',
    name: 'Fire Sword',
    description: 'none',
    type: 'weapon',
    tier: 8,
    bonus: {
      str: 30,
      con: 17,
      ref: 17,
      acc: 17,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 15),
      defender: {
        hp: -35 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 35 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'blood_chainsaw',
    name: 'Blood Chainsaw',
    description: 'No movie references here.',
    type: 'weapon',
    tier: 8,
    bonus: {
      str: 30,
      con: 25,
      ref: 10,
      acc: 30,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 10),
      defender: {
        hp: -20 - (attacker.level / 5),
      },
      log: {
        type: 'damage',
        value: 20 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'tentacle_whip',
    name: 'Tentacle Whip',
    description: 'Reminds you of something you saw in an anime once.',
    type: 'weapon',
    tier: 9,
    bonus: {
      str: 40,
      con: 30,
      ref: 10,
      acc: 35,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 14),
      defender: {
        hp: -45 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 45 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'grim_scythe',
    name: 'Grim Scythe',
    description: 'There is a spooky skeleton inside of you.',
    type: 'weapon',
    tier: 9,
    bonus: {
      str: 40,
      con: 25,
      ref: 20,
      acc: 20,
      Flow: 20,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 14),
      defender: {
        hp: -50 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 50 + (attacker.level / 4),
      },
    }),
  },
  // Sets
  {
    id: 'bronze_armor',
    name: 'Bronze Armor',
    description: 'Not quite good... You know... Are you? Don\'t judge',
    type: 'set',
    tier: 0,
    bonus: {
      con: 2,
      ref: 2,
    },
  },
  {
    id: 'foliage',
    name: 'Foliage Camouflage',
    description: 'I\'m not repeating the Leaf Dagger joke... No, dammit, get one :|',
    type: 'set',
    tier: 2,
    bonus: {
      con: 5,
      ref: 5,
    },
  },
  {
    id: 'silver_armor',
    name: 'Silver Armor',
    description: 'You\'re so totally showing it to them, girlfriend!',
    type: 'set',
    tier: 1,
    bonus: {
      con: 4,
      ref: 4,
    },
  },
  {
    id: 'granite',
    name: 'Granite Armor',
    description: 'You can now kill stuff inside a rock, not The Rock unfortunately.',
    type: 'set',
    tier: 3,
    bonus: {
      str: 5,
      con: 10,
    },
  },
  {
    id: 'feather',
    name: 'Feather Clothes',
    description: 'A lightweight set.',
    type: 'set',
    tier: 3,
    bonus: {
      ref: 10,
      con: 10,
    },
  },
  {
    id: 'porcelain',
    name: 'Porcelain Armor',
    description: 'Porcelain is actually quite resistant. Google it ;)',
    type: 'set',
    tier: 4,
    bonus: {
      con: 20,
    },
  },
  {
    id: 'miasma',
    name: 'Miasma Shroud',
    description: 'You shouldn\'t wear to a party, but... Is it a party without killing?',
    type: 'set',
    tier: 5,
    bonus: {
      con: 20,
      str: 5,
      ref: 5,
    },
  },
  {
    id: 'glacier',
    name: 'Glacier Armor',
    description: 'Kinda cold but you can manage it.',
    type: 'set',
    tier: 6,
    bonus: {
      con: 25,
      str: 10,
      ref: 10,
    },
  },
  {
    id: 'lava',
    name: 'Lava Coat',
    description: 'Ironically it doesn\'t melt itself.',
    type: 'set',
    tier: 7,
    bonus: {
      con: 30,
      str: 20,
      ref: 10,
    },
  },
  {
    id: 'electric',
    name: 'Electric Suit',
    description: 'Buzz Buzz',
    type: 'set',
    tier: 7,
    bonus: {
      con: 20,
      str: 20,
      ref: 25,
    },
  },
  {
    id: 'flame',
    name: 'Flame Cape',
    description: 'none',
    type: 'set',
    tier: 7,
    bonus: {
      con: 5,
      str: 5,
      ref: 35,
    },
  },
  {
    id: 'magma',
    name: 'Magma Cover',
    description: 'none',
    type: 'set',
    tier: 7,
    bonus: {
      con: 45,
    },
  },
  {
    id: 'dragon',
    name: 'Dragon Scale',
    description: 'none',
    type: 'set',
    tier: 7,
    bonus: {
      con: 10,
      ref: 45,
    },
  },
  {
    id: 'mecha',
    name: 'Mecha Suit',
    description: 'As overpowered as it can get.',
    type: 'set',
    tier: 8,
    bonus: {
      con: 30,
      str: 15,
      ref: 20,
    },
  },
  {
    id: 'steel',
    name: 'Steel Suit',
    description: 'As overpowered as it can get.',
    type: 'set',
    tier: 8,
    bonus: {
      con: 40,
      str: 20,
      ref: 25,
    },
  },
  {
    id: 'golem',
    name: 'Golem Armor',
    description: 'You had to use a chisel, but you managed to skin that monster.',
    type: 'set',
    tier: 9,
    bonus: {
      con: 50,
      str: 25,
      ref: 30,
    },
  },
  {
    id: 'unholy',
    name: 'Unholy Robes',
    description: 'Smells like Death.',
    type: 'set',
    tier: 9,
    bonus: {
      con: 50,
      str: 25,
      ref: 25,
      acc: 10,
      flow: 10,
    },
  },
  // Tokens
  {
    id: 'golden_beetle',
    name: 'Golden Beetle',
    description: 'A shiny cute helper very much not a pokedigimedabotmon',
    type: 'token',
    tier: 0,
    bonus: {
      flow: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 19,
      attacker: {
        hp: 5 + (attacker.level / 10),
      },
      log: {
        type: 'heal',
        value: 5 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'precious_ore',
    name: 'Precious Ore',
    description: 'It\'s mysterious powers won\'t really improve your math skills',
    type: 'token',
    tier: 1,
    bonus: {
      flow: 8,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 18,
      attacker: {
        hp: 10 + (attacker.level / 10),
        flow: attacker.flow * 0.1,
      },
      log: {
        type: 'heal (+FLOW)',
        value: 10 + (attacker.level / 10),
      },
    }),
  },
  {
    id: 'old_soul',
    name: 'Old Soul',
    description: 'A lonely soul now walks by your side because you know, fuck privacy.',
    type: 'token',
    tier: 2,
    bonus: {
      flow: 12,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 15,
      attacker: {
        hp: 10 + (attacker.level / 5),
        con: attacker.con * 0.2,
      },
      log: {
        type: 'heal (+CON)',
        value: 10 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'demons_pick',
    name: 'Demon\'s Pick',
    description: 'Jack Black would be prowd of you!',
    type: 'token',
    tier: 3,
    bonus: {
      flow: 15,
      ref: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 15,
      attacker: {
        hp: 15 + (attacker.level / 5),
        ref: attacker.ref * 0.2,
      },
      log: {
        type: 'heal (+REF)',
        value: 15 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'ice_ring',
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
        hp: 15 + (attacker.level / 5),
      },
      log: {
        type: 'heal',
        value: 15 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'fire_emblem',
    name: 'Fire Emblem',
    description: 'An emblem carrying an eternal fire.',
    type: 'token',
    tier: 5,
    bonus: {
      flow: 25,
      str: 25,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 14,
      attacker: {
        hp: 20 + (attacker.level / 5),
      },
      log: {
        type: 'heal',
        value: 20 + (attacker.level / 5),
      },
    }),
  },
  {
    id: 'fire_ring',
    name: 'Fire Ring',
    description: 'none',
    type: 'token',
    tier: 6,
    bonus: {
      flow: 15,
      str: 20,
      acc: 40,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 16),
      defender: {
        hp: -35 - (attacker.level / 4),
      },
      log: {
        type: 'damage',
        value: 35 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'dynamo',
    name: 'Dynamo',
    description: 'High end tech.',
    type: 'token',
    tier: 6,
    bonus: {
      flow: 30,
      str: 25,
      con: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 14,
      attacker: {
        hp: 30 + (attacker.level / 4),
      },
      log: {
        type: 'heal',
        value: 30 + (attacker.level / 4),
      },
    }),
  },
  {
    id: 'pandoras_box',
    name: 'Pandoras Box',
    description: 'You might not like what you find inside.',
    type: 'token',
    tier: 7,
    bonus: {
      flow: 40,
      str: 30,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 14,
      attacker: {
        hp: 40 + (attacker.level / 4),
        ref: attacker.str * 0.2,
      },
      log: {
        type: 'heal (+STR)',
        value: 40 + (attacker.level / 4),
      },
    }),
  },
]
