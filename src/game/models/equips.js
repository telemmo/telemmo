export default [
  // Weapons
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
        hp: - ( 5 + attacker.level/10),
      },
      log: {
        type: 'damage',
        value: 5 + attacker.level/10,
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
    type: 'weapon',
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
    type: 'weapon',
    bonus: {
      str: 10,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aHit < 10),
      defender: {
        hp: - ( 10 + attacker.level/5),
      },
      log: {
        type: 'damage',
        value: 10 + attacker.level/5,
      },
    }),
  },
  {
    id: 'lancicle',
    name: 'Lancicle',
    type: 'weapon',
    bonus: {
      str: 17,
      con: 7,
      ref: 7,
      acc: 7,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: (rolls.aAim < 19),
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
    id: 'foliage',
    name: 'Foliage Set',
    type: 'set',
    bonus: {
      con: 5,
      ref: 5,
    },
  },
  {
    id: 'granite',
    name: 'Granite Set',
    type: 'set',
    bonus: {
      str: 5,
      con: 10,
    },
  },
  {
    id: 'porcelain',
    name: 'Porcelain Set',
    type: 'set',
    bonus: {
      con: 20,
    },
  },
  {
    id: 'miasma',
    name: 'Miasma',
    type: 'set',
    bonus: {
      con: 20,
      str: 5,
      ref: 5,
    },
  },
  {
    id: 'glacier',
    name: 'Glacier',
    type: 'set',
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
    type: 'token',
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
    type: 'token',
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
    type: 'token',
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
    type: 'token',
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
    type: 'token',
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
