/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "defender|rolls" }] */

export default [
  // Arcane - Mage
  {
    id: 'pulse',
    name: 'Pulse',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.4),
      },
      log: {
        type: 'damage',
        value: 15 + (attacker.level * 0.4),
      },
    }),
  },
  {
    id: 'ice_shard',
    name: 'Ice Shard',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
        ref: -defender.flow * 0.15,
      },
      log: {
        type: 'damage (-FLOW)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'fireball',
    name: 'Fireball',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -35 - (attacker.level * 0.45),
      },
      log: {
        type: 'damage',
        value: 35 + (attacker.level * 0.45),
      },
    }),
  },
  {
    id: 'maelstrom',
    name: 'Maelstrom',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -45 - (attacker.level * 0.6),
      },
      log: {
        type: 'damage',
        value: 45 + (attacker.level * 0.6),
      },
    }),
  },
  // Debuff - Mage
  {
    id: 'smog',
    name: 'Smog',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
        acc: -defender.acc * 0.15,
      },
      log: {
        type: 'damage (-ACC)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'slime',
    name: 'Slime',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
        ref: -defender.ref * 0.15,
      },
      log: {
        type: 'damage (-REF)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'confusion',
    name: 'Confusion',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.25),
        str: -defender.str * 0.15,
        con: -defender.con * 0.15,
      },
      log: {
        type: 'damage (-STR -CON)',
        value: 20 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'mirage',
    name: 'Mirage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.15),
        acc: -defender.acc * 0.11,
        ref: -defender.ref * 0.11,
        str: -defender.str * 0.11,
        con: -defender.con * 0.11,
        flow: -defender.flow * 0.11,
      },
      log: {
        type: 'damage (-ALL STATS)',
        value: 15 + (attacker.level * 0.15),
      },
    }),
  },
  // Endure - Fighter
  {
    id: 'taunt',
    name: 'Taunt',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
      },
      attacker: {
        str: defender.str * 0.1,
        acc: defender.acc * 0.1,
      },
      log: {
        type: 'damage (+STR +ACC)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'bandage',
    name: 'Bandage',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 15 + (attacker.level * 0.25),
      },
      log: {
        type: 'heal',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'shield_bash',
    name: 'Shield Bash',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -25 - (attacker.level * 0.35),
        flow: -defender.flow * 0.15,
      },
      log: {
        type: 'damage (-FLOW)',
        value: 25 + (attacker.level * 0.35),
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
        hp: 16 + (attacker.level * 0.2),
      },
      log: {
        type: 'heal (+STR +CON)',
        value: 16 + (attacker.level * 0.2),
      },
    }),
  },
  // Berserk - Fighter
  {
    id: 'rage',
    name: 'Rage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
      },
      attacker: {
        str: attacker.str * 0.1,
        con: attacker.con * 0.1,
      },
      log: {
        type: 'damage (+STR +CON)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'fast_strike',
    name: 'Fast Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.35),
      },
      log: {
        type: 'damage',
        value: 20 + (attacker.level * 0.35),
      },
    }),
  },
  {
    id: 'blood_mask',
    name: 'Blood Mask',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.25),
      },
      attacker: {
        str: attacker.str * 0.25,
        ref: attacker.ref * 0.15,
      },
      log: {
        type: 'damage (+STR +REF)',
        value: 20 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'massacre',
    name: 'Massacre',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: -40 + (attacker.level * 0.55),
      },
    }),
  },
  // Poison - Thief
  {
    id: 'poison_dart',
    name: 'Poison Dart',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
        ref: -defender.ref * 0.15,
      },
      log: {
        type: 'damage (-REF)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'sand_attack',
    name: 'Sand Attack',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
        acc: -defender.acc * 0.15,
      },
      log: {
        type: 'damage (-ACC)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'deep_cut',
    name: 'Deep Cut',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -30 - (attacker.level * 0.45),
      },
      log: {
        type: 'damage',
        value: 30 + (attacker.level * 0.45),
      },
    }),
  },
  {
    id: 'toxic_ballista',
    name: 'Toxic Ballista',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -17 - (attacker.level * 0.17),
        acc: -defender.acc * 0.225,
        ref: -defender.ref * 0.225,
      },
      log: {
        type: 'damage (-ACC -REF)',
        value: 17 + (attacker.level * 0.17),
      },
    }),
  },
  // Stealth - Thief
  {
    id: 'smoke_screen',
    name: 'Smoke Screen',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
      },
      attacker: {
        acc: attacker.acc * 0.1,
        ref: attacker.ref * 0.1,
      },
      log: {
        type: 'damage (+ACC +REF)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'conceal',
    name: 'Conceal',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -10 - (attacker.level * 0.15),
      },
      attacker: {
        acc: attacker.acc * 0.2,
        ref: attacker.ref * 0.2,
      },
      log: {
        type: 'damage (+ACC +REF)',
        value: 10 + (attacker.level * 0.15),
      },
    }),
  },
  {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -30 - (attacker.level * 0.45),
      },
      log: {
        type: 'damage',
        value: 30 + (attacker.level * 0.45),
      },
    }),
  },
  {
    id: 'deathstab',
    name: 'Deathstab',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: 40 + (attacker.level * 0.55),
      },
    }),
  },
  // Martial - Acolyte
  {
    id: 'knuckles',
    name: 'Knuckles',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -10 - (attacker.level * 0.25),
      },
      log: {
        type: 'damage',
        value: 10 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'mantis_slash',
    name: 'Mantis Slash',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.35),
      },
      log: {
        type: 'damage',
        value: 20 + (attacker.level * 0.35),
      },
    }),
  },
  {
    id: 'ying_strike',
    name: 'Ying Strike',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.25),
      },
      attacker: {
        str: attacker.str * 0.2,
        acc: attacker.acc * 0.2,
      },
      log: {
        type: 'damage (+STR +ACC)',
        value: 20 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'emerald_punch',
    name: 'Emerald Punch',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: 40 + (attacker.level * 0.55),
      },
    }),
  },
  // Buffer - Acolyte
  {
    id: 'heal',
    name: 'Heal',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 10 + (attacker.level * 0.2),
      },
      log: {
        type: 'heal',
        value: 10 + (attacker.level * 0.2),
      },
    }),
  },
  {
    id: 'bless',
    name: 'Bless',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 10 + (attacker.level * 0.2),
        con: attacker.con * 0.2,
      },
      log: {
        type: 'heal (+CON)',
        value: attacker.level * 0.2,
      },
    }),
  },
  {
    id: 'power_aura',
    name: 'Power Aura',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 10 + (attacker.level * 0.2),
        str: attacker.str * 0.4,
      },
      log: {
        type: 'heal (+STR)',
        value: attacker.level * 0.2,
      },
    }),
  },
  {
    id: 'divine_beam',
    name: 'Divine Beam',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: 40 + (attacker.level * 0.55),
      },
    }),
  },
  // Sniper - Ranger
  {
    id: 'scope',
    name: 'Scope',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
      },
      attacker: {
        acc: attacker.acc * 0.2,
      },
      log: {
        type: 'damage (+ACC)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'herbal_scent',
    name: 'Herbal Scent',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
      },
      attacker: {
        con: attacker.con * 0.2,
      },
      log: {
        type: 'damage (+CON)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'power_arrow',
    name: 'Power Arrow',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -30 - (attacker.level * 0.45),
      },
      log: {
        type: 'damage',
        value: 30 + (attacker.level * 0.55),
      },
    }),
  },
  {
    id: 'headshot',
    name: 'Headshot',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: 40 + (attacker.level * 0.55),
      },
    }),
  },
  // Trapper - Ranger
  {
    id: 'tripwire',
    name: 'Tripwire',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
        ref: -defender.ref * 0.15,
      },
      log: {
        type: 'damage (-REF)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'patience',
    name: 'Patience',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
      },
      attacker: {
        flow: attacker.flow * 0.2,
      },
      log: {
        type: 'damage (+FLOW)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'bear_trap',
    name: 'Bear Trap',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.25),
        ref: -defender.ref * 0.15,
        acc: -defender.acc * 0.15,
      },
      log: {
        type: 'damage (-REF -ACC)',
        value: 20 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'explosive_charge',
    name: 'Explosive Charge',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -40 - (attacker.level * 0.55),
      },
      log: {
        type: 'damage',
        value: -40 + (attacker.level * 0.55),
      },
    }),
  },
  // Support - Merchant
  {
    id: 'tune_weapon',
    name: 'Tune Weapon',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 7 + (attacker.level * 0.15),
        str: attacker.str * 0.2,
      },
      log: {
        type: 'heal (+STR)',
        value: 7 + (attacker.level * 0.15),
      },
    }),
  },
  {
    id: 'potion',
    name: 'Potion',
    fire: (attacker, defender, rolls) => ({
      attacker: {
        hp: 15 + (attacker.level * 0.25),
      },
      log: {
        type: 'heal',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'runover',
    name: 'Runover',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -35 - (attacker.level * 0.45),
      },
      log: {
        type: 'damage',
        value: 35 + (attacker.level * 0.45),
      },
    }),
  },
  {
    id: 'chemical_bomb',
    name: 'Chemical Bomb',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -25 - (attacker.level * 0.3),
        con: -defender.con * 0.3,
      },
      log: {
        type: 'damage (-CON)',
        value: 25 + (attacker.level * 0.3),
      },
    }),
  },
  // Breaker - Merchant
  {
    id: 'smart_hit',
    name: 'Smart Hit',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -7 - (attacker.level * 0.17),
        ref: -defender.ref * 0.15,
      },
      log: {
        type: 'damage (-REF)',
        value: 7 + (attacker.level * 0.17),
      },
    }),
  },
  {
    id: 'calculated_blow',
    name: 'Calculated Blow',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -15 - (attacker.level * 0.25),
        con: -defender.con * 0.15,
      },
      log: {
        type: 'damage (-CON)',
        value: 15 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'sabotage',
    name: 'Sabotage',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -20 - (attacker.level * 0.25),
        ref: -defender.ref * 0.15,
        acc: -defender.acc * 0.15,
      },
      log: {
        type: 'damage (-REF -ACC)',
        value: 20 + (attacker.level * 0.25),
      },
    }),
  },
  {
    id: 'hammer_down',
    name: 'Hammer Down',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: -25 - (attacker.level * 0.3),
        str: -defender.str * 0.15,
        con: -defender.con * 0.15,
      },
      log: {
        type: 'damage (-CON -STR)',
        value: 25 + (attacker.level * 0.3),
      },
    }),
  },
]
