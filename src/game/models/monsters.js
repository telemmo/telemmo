export default [

/*//////////////////////////////////////////////////////////////////////////////
Green Fields

w . Leaf Blade
s . Foliage
t . Golden Beetle

*/
  {
    id: 'goat',
    name: 'Goat',
    str: 4,
    ref: 4,
    acc: 4,
    con: 4,
    flow: 4,
    level: 0,
    prizes: {
      exp: 2,
      items: ['Hide'],
    },
  },
  {
    id: 'wolf',
    name: 'Wolf',
    str: 5,
    ref: 5,
    acc: 5,
    con: 5,
    flow: 5,
    level: 1,
    prizes: {
      exp: 3,
      items: ['Fang'],
    },
  },
  {
    id: 'faun_warrior',
    name: 'Faun Warrior',
    str: 6,
    ref: 6,
    acc: 6,
    con: 6,
    flow: 6,
    level: 2,
    prizes: {
      exp: 5,
      items: ['Horn'],
      equips: ['leaf_blade'],
    },
  },
  {
    id: 'elf',
    name: 'Elf',
    str: 7,
    ref: 7,
    acc: 7,
    con: 7,
    flow: 7,
    level: 3,
    prizes: {
      exp: 6,
      equips: ['leaf_blade', 'foliage'],
      tokens: ['golden_beetle'],
    },
  },
  {
    id: 'centaur',
    name: 'Centaur',
    str: 8,
    ref: 8,
    acc: 8,
    con: 8,
    flow: 8,
    level: 5,
    prizes: {
      exp: 7,
      equips: ['leaf_blade', 'foliage'],
      tokens: ['golden_beetle'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Cave

w . Sharded Club
s . Granite
t . Precious Ore

*/
  {
    id: 'giant_bat',
    name: 'Giant Bat',
    str: 9,
    ref: 9,
    acc: 9,
    con: 9,
    flow: 9,
    level: 8,
    prizes: {
      exp: 8,
      items: ['Bat Wing'],
    },
  },
  {
    id: 'earthworm',
    name: 'Earthworm',
    str: 10,
    ref: 10,
    acc: 10,
    con: 10,
    flow: 10,
    level: 10,
    prizes: {
      exp: 10,
      items: ['Dirt'],
    },
  },
  {
    id: 'angered_bear',
    name: 'Angered Bear',
    str: 12,
    ref: 12,
    acc: 12,
    con: 12,
    flow: 12,
    level: 15,
    prizes: {
      exp: 15,
      items: ['Bear Paw'],
      equips: ['granite'],
    },
  },
  {
    id: 'troll',
    name: 'Troll',
    str: 13,
    ref: 14,
    acc: 13,
    con: 14,
    flow: 13,
    level: 17,
    prizes: {
      exp: 17,
      items: ['Big Bone'],
      equips: ['granite', 'sharded_club'],
    },
  },
  {
    id: 'beholder',
    name: 'Beholder',
    str: 16,
    ref: 16,
    acc: 16,
    con: 16,
    flow: 16,
    level: 22,
    prizes: {
      exp: 25,
      equips: ['granite', 'sharded_club'],
      tokens: ['precious_ore'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Dark Swamp

w . Whip of Vines
s . Porcelain
t . Old soul

*/
  {
    id: 'bold_wasp',
    name: 'Bold Wasp',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'snake',
    name: 'Snake',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'lizardrill',
    name: 'Lizardrill',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'gorgon',
    name: 'Gorgon',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'hydra',
    name: 'Hydra',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Demonic Forest

w . Psycho Scythe
s . Miasma
t . Demon's Pick

*/
  {
    id: 'tooth_fairy',
    name: 'Tooth Fairy',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'ghost',
    name: 'Ghost',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'imp',
    name: 'Imp',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'vampire',
    name: 'Vampire',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'werewolf',
    name: 'Werewolf',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Snowy Peak

w . Lancicle
s . Glacier
t . Ice Ring

*/
  {
    id: 'jackalope',
    name: 'Jackalope',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'frost_undead',
    name: 'Frost Undead',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'snow_chimera',
    name: 'Snow Chimera',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'dark_fanged_pine',
    name: 'Dark Fanged Pine',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'yeti_lord',
    name: 'Yeti Lord',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Volcanic Oasis

w . Molten Gauntlets
s . Lava
t . Fire Emblem

*/
  {
    id: 'lavabug',
    name: 'Lavabug',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'fire_cactus',
    name: 'Fire Cactus',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'ash_spirit',
    name: 'Ash Spirit',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'dragon',
    name: 'Dragon',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Robot City

w . Blood Chainsaw
s . Mecha
t . Dynamo

*/
  {
    id: 'lowly_solder',
    name: 'Lowly Solder',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'pysthon',
    name: 'Pysthon',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'sprocketeer',
    name: 'Sprocketeer',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'grate_knight',
    name: 'Grate Knight',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'king_gear',
    name: 'King Gear',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Deeps Below

w . Plague Staff
s . Unholy
t . Pandora's Box Shard

*/
  {
    id: 'colossal_spider',
    name: 'Colossal Spider',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'urork',
    name: 'Urork',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'golem',
    name: 'Golem',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'kraken',
    name: 'Kraken',
    str: 0,
    ref: 0,
    acc: 0,
    con: 0,
    flow: 0,
    prizes: {
      exp: 0,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
  {
    id: 'death',
    name: 'Death',
    stance: 'death',
    str: 100,
    ref: 100,
    acc: 100,
    con: 100,
    flow: 100,
    prizes: {
      exp: 100,
      items: ['?'],
      equips: ['?'],
      tokens: ['?'],
    },
  },
]
