export default [
  // Arcane -  Mage
  {
    id: 'pulse',
    name: 'Pulse',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (15 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (15 + attacker.level/4),
      },
    }),
  },
  {
    id: 'ice_shard',
    name: 'Ice Shard',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (22 + attacker.level/5),
        ref: - (defender.ref * 0.2)
      },
      log: {
        type: 'damage (-REF)',
        value: (22 + attacker.level/5),
      },
    }),
  },
  {
    id: 'fireball',
    name: 'Fireball',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (35 + attacker.level/3),
      },
      log: {
        type: 'damage',
        value: (35 + attacker.level/3),
      },
    }),
  },
  {
    id: 'maelstrom',
    name: 'Maelstrom',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (50 + attacker.level/2),
      },
      log: {
        type: 'damage',
        value: (50 + attacker.level/2),
      },
    }),
  },
  // Debuff - Mage
  {
    id: 'smog',
    name: 'Smog',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (11 + attacker.level/8),
        acc: - (defender.acc * 0.2)
      },
      log: {
        type: 'damage (-ACC)',
        value: (11 + attacker.level/8),
      },
    }),
  },
  {
    id: 'slime',
    name: 'Slime',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (22 + attacker.level/5),
        ref: - (defender.ref * 0.3)
      },
      log: {
        type: 'damage (-REF)',
        value: (22 + attacker.level/5),
      },
    }),
  },
  {
    id: 'confusion',
    name: 'Confusion',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (12 + attacker.level/8),
        str: - (defender.str * 0.3),
        con: - (defender.con * 0.3),
      },
      log: {
        type: 'damage (-STR -CON)',
        value: (12 + attacker.level/8),
      },
    }),
  },
  {
    id: 'mirage',
    name: 'Mirage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (1 + attacker.level/10),
        acc: - (defender.acc * 0.35),
        ref: - (defender.ref * 0.35),
        str: - (defender.str * 0.35),
        con: - (defender.con * 0.35),
        flow: - (defender.flow * 0.35),
      },
      log: {
        type: 'damage (-ALL STATS)',
        value: (1 + attacker.level/10),
      },
    }),
  },
  // Endure - Fighter
  {
    id: 'meditate',
    name: 'Meditate',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (1 + attacker.level/10),
      },
      attacker: {
        str: defender.str * 0.1,
        acc: defender.acc * 0.1,
      },
      log: {
        type: 'damage (+STR +ACC)',
        value: (1 + attacker.level/10),
      },
    }),
  },
  {
    id: 'bandage',
    name: 'Bandage',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (10 + attacker.level/8),
      },
      log: {
        type: 'heal',
        value: (10 + attacker.level/8),
      },
    }),
  },
  {
    id: 'shield_bash',
    name: 'Shield Bash',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (30 + attacker.level/5),
        flow: - (defender.flow * 0.1),
      },
      log: {
        type: 'damage (-FLOW)',
        value: (30 + attacker.level/5),
      },
    }),
  },
  {
    id: 'bulk_up',
    name: 'Bulk Up',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        str: attacker.str * 0.3,
        con: attacker.con * 0.3,
        hp: 10 + attacker.level/8,
      },
      log: {
        type: 'heal (+STR +CON)',
        value: (10 + attacker.level/8),
      },
    }),
  },
  // Berserk - Fighter
  {
    id: 'rage',
    name: 'Rage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/6),
      },
      attacker: {
        str: attacker.str * 0.1,
        con: attacker.con * 0.1,
      },
      log: {
        type: 'damage (+STR +CON)',
        value: (10 + attacker.level/6),
      },
    }),
  },
  {
    id: 'fast_strike',
    name: 'Fast Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (20 + attacker.level/4),
      },
    }),
  },
  {
    id: 'blood_mask',
    name: 'Blood Mask',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/8),
      },
      attacker: {
        str: attacker.str * 0.25,
        ref: attacker.ref * 0.25,
      },
      log: {
        type: 'damage (+STR +REF)',
        value: (20 + attacker.level/8),
      },
    }),
  },
  {
    id: 'massacre',
    name: 'Massacre',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (35 + attacker.level/2),
      },
      log: {
        type: 'damage',
        value: - (35 + attacker.level/2),
      },
    }),
  },
  // Poison - Thief
  {
    id: 'poison_dart',
    name: 'Poison Dart',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/8),
        ref: - (defender.ref * 0.2)
      },
      log: {
        type: 'damage (-REF)',
        value: (10 + attacker.level/8),
      },
    }),
  },
  {
    id: 'sand_attack',
    name: 'Sand Attack',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/6),
        acc: - (defender.acc * 0.2)
      },
      log: {
        type: 'damage (-ACC)',
        value: (20 + attacker.level/6),
      },
    }),
  },
  {
    id: 'deep_cut',
    name: 'Deep Cut',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (30 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (30 + attacker.level/4),
      },
    }),
  },
  {
    id: 'toxic_ballista',
    name: 'Toxic Ballista',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (35 + attacker.level/4),
        acc: - (defender.acc * 0.2),
        ref: - (defender.ref * 0.2),
      },
      log: {
        type: 'damage (-ACC -REF)',
        value: (35 + attacker.level/4),
      },
    }),
  },
  // Stealth - Thief
  {
    id: 'smoke_screen',
    name: 'Smoke Screen',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/10),
      },
      attacker: {
        acc: attacker.acc * 0.1,
        ref: attacker.ref * 0.1,
      },
      log: {
        type: 'damage (+ACC +REF)',
        value: (10 + attacker.level/10),
      },
    }),
  },
  {
    id: 'conceal',
    name: 'Conceal',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/10),
      },
      attacker: {
        acc: attacker.acc * 0.3,
        ref: attacker.ref * 0.3,
      },
      log: {
        type: 'damage (+ACC +REF)',
        value: (20 + attacker.level/10),
      },
    }),
  },
  {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (50 + attacker.level/8),
      },
      log: {
        type: 'damage',
        value: (50 + attacker.level/8),
      },
    }),
  },
  {
    id: 'deathstab',
    name: 'Deathstab',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (50 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (50 + attacker.level/4),
      },
    }),
  },
  // Martial - Acolyte
  {
    id: 'knuckles',
    name: 'Knuckles',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (10 + attacker.level/4),
      },
    }),
  },
  {
    id: 'mantis_slash',
    name: 'Mantis Slash',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (20 + attacker.level/4),
      },
    }),
  },
  {
    id: 'ying_strike',
    name: 'Ying Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (30 + attacker.level/4),
      },
      attacker: {
        str: attacker.str * 0.2,
        acc: attacker.acc * 0.2,
      },
      log: {
        type: 'damage (+STR +ACC)',
        value: (30 + attacker.level/4),
      },
    }),
  },
  {
    id: 'emerald_punch',
    name: 'Emerald Punch',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (40 + attacker.level/3),
      },
      log: {
        type: 'damage',
        value: (40 + attacker.level/3),
      },
    }),
  },
  // Buffer - Acolyte
  {
    id: 'heal',
    name: 'Heal',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (10 + attacker.level/10),
      },
      log: {
        type: 'heal',
        value: (10 + attacker.level/10),
      },
    }),
  },
  {
    id: 'bless',
    name: 'Bless',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (attacker.level/10),
        con: attacker.con * 0.2
      },
      log: {
        type: 'heal',
        value: (attacker.level/10),
      },
    }),
  },
  {
    id: 'power_aura',
    name: 'Power Aura',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (attacker.level/10),
        str: attacker.str * 0.4
      },
      log: {
        type: 'heal',
        value: (attacker.level/10),
      },
    }),
  },
  {
    id: 'divine_beam',
    name: 'Divine Beam',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - ( 50 + (attacker.level/10)),
      },
      log: {
        type: 'damage',
        value: (50 + attacker.level/10),
      },
    }),
  },
  // Sniper - Ranger
  {
    id: 'scope',
    name: 'Scope',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/4),
      },
      attacker: {
        acc: attacker.acc * 0.2,
      },
      log: {
        type: 'damage (+ACC)',
        value: (10 + attacker.level/4),
      },
    }),
  },
  {
    id: 'herbal_scent',
    name: 'Herbal Scent',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/4),
      },
      attacker: {
        con: attacker.con * 0.2,
      },
      log: {
        type: 'damage (+CON)',
        value: (20 + attacker.level/4),
      },
    }),
  },
  {
    id: 'power_arrow',
    name: 'Power Arrow',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (40 + attacker.level/4),
      },
      log: {
        type: 'damage',
        value: (40 + attacker.level/4),
      },
    }),
  },
  {
    id: 'headshot',
    name: 'Headshot',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (40 + attacker.level/2),
      },
      log: {
        type: 'damage',
        value: (40 + attacker.level/2),
      },
    }),
  },
  // Trapper - Ranger
  {
    id: 'tripwire',
    name: 'Tripwire',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/7),
        ref: - (defender.ref * 0.2)
      },
      log: {
        type: 'damage (-REF)',
        value: (10 + attacker.level/7),
      },
    }),
  },
  {
    id: 'patience',
    name: 'Patience',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/5),
      },
      attacker: {
        flow: attacker.flow * 0.2
      },
      log: {
        type: 'damage (+FLOW)',
        value: (20 + attacker.level/5),
      },
    }),
  },
  {
    id: 'bear_trap',
    name: 'Bear Trap',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (10 + attacker.level/8),
        ref: - (defender.ref * 0.3),
        acc: - (defender.acc * 0.3),
      },
      log: {
        type: 'damage (-REF -ACC)',
        value: (10 + attacker.level/8),
      },
    }),
  },
  {
    id: 'explosive_charge',
    name: 'Explosive Charge',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (40 + attacker.level/2),
      },
      log: {
        type: 'damage',
        value: - (40 + attacker.level/2),
      },
    }),
  },
  // Support - Merchant
  {
    id: 'tune_weapon',
    name: 'Tune Weapon',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (2 + attacker.level/10),
        str: attacker.str * 0.2
      },
      log: {
        type: 'heal (+STR)',
        value: (2 + attacker.level/10),
      },
    }),
  },
  {
    id: 'potion',
    name: 'Potion',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: (20 + attacker.level/5),
      },
      log: {
        type: 'heal',
        value: (20 + attacker.level/5),
      },
    }),
  },
  {
    id: 'runover',
    name: 'Runover',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - ( 35 + (attacker.level/10)),
      },
      log: {
        type: 'damage',
        value: (35 + attacker.level/10),
      },
    }),
  },
  {
    id: 'chemical_bomb',
    name: 'Chemical Bomb',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - ( 10 + (attacker.level/5)),
        con: - (defender.con * 0.3),
      },
      log: {
        type: 'damage (-CON)',
        value: 10 + attacker.level/5,
      },
    }),
  },
  // Breaker - Merchant
  {
    id: 'smart_hit',
    name: 'Smart Hit',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (15 + attacker.level/8),
        ref: - (defender.ref * 0.2)
      },
      log: {
        type: 'damage (-REF)',
        value: (15 + attacker.level/8),
      },
    }),
  },
  {
    id: 'calculated_blow',
    name: 'Calculated Blow',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/5),
        con: - (defender.con * 0.1)
      },
      log: {
        type: 'damage (-CON)',
        value: (20 + attacker.level/5),
      },
    }),
  },
  {
    id: 'sabotage',
    name: 'Sabotage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (25 + attacker.level/8),
        str: - (defender.str * 0.1),
        ref: - (defender.ref * 0.1),
        acc: - (defender.acc * 0.1),
        con: - (defender.con * 0.1),
      },
      log: {
        type: 'damage (-STR -CON -REF -ACC)',
        value: (25 + attacker.level/8),
      },
    }),
  },
  {
    id: 'hammer_down',
    name: 'Hammer Down',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: - (20 + attacker.level/10),
        acc: - (defender.acc * 0.2),
        ref: - (defender.ref * 0.2),
        str: - (defender.str * 0.2),
        con: - (defender.con * 0.2),
        flow: - (defender.flow * 0.2),
      },
      log: {
        type: 'damage (-ALL STATS)',
        value: (20 + attacker.level/10),
      },
    }),
  },
]
