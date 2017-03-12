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
    ref: 3,
    acc: 4,
    con: 3,
    flow: 7,
    level: 0,
    prizes: {
      exp: 2,
      items: ['Hide'],
      equips: ['bronze_armor'],
      tokens: ['golden_beetle'],
    },
  },
  {
    id: 'wolf',
    name: 'Wolf',
    str: 5,
    ref: 4,
    acc: 5,
    con: 4,
    flow: 8,
    level: 1,
    prizes: {
      exp: 3,
      items: ['Fang'],
      equips: ['bronze_blade'],
      tokens: ['golden_beetle'],
    },
  },
  {
    id: 'faun_warrior',
    name: 'Faun Warrior',
    str: 6,
    ref: 6,
    acc: 6,
    con: 6,
    flow: 8,
    level: 2,
    prizes: {
      exp: 4,
      items: ['Horn'],
      equips: ['leaf_blade'],
      tokens: ['golden_beetle'],
    },
  },
  {
    id: 'elf',
    name: 'Elf',
    str: 7,
    ref: 7,
    acc: 7,
    con: 7,
    flow: 10,
    level: 3,
    prizes: {
      exp: 5,
      equips: ['leaf_blade', 'foliage'],
      tokens: ['golden_beetle'],
    },
  },
  {
    id: 'centaur',
    name: 'Centaur',
    str: 10,
    ref: 10,
    acc: 10,
    con: 10,
    flow: 10,
    level: 6,
    prizes: {
      exp: 30,
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
    flow: 15,
    level: 8,
    prizes: {
      exp: 8,
      items: ['Bat Wing'],
      equips: ['silver_armor'],
      tokens: ['precious_ore'],
    },
  },
  {
    id: 'earthworm',
    name: 'Earthworm',
    str: 10,
    ref: 10,
    acc: 10,
    con: 10,
    flow: 14,
    level: 10,
    prizes: {
      exp: 10,
      items: ['Dirt'],
      equips: ['silver_dagger'],
      tokens: ['precious_ore'],
    },
  },
  {
    id: 'angered_bear',
    name: 'Angered Bear',
    str: 12,
    ref: 12,
    acc: 12,
    con: 12,
    flow: 17,
    level: 15,
    prizes: {
      exp: 15,
      items: ['Bear Paw'],
      equips: ['granite'],
      tokens: ['precious_ore'],
    },
  },
  {
    id: 'troll',
    name: 'Troll',
    str: 13,
    ref: 14,
    acc: 13,
    con: 14,
    flow: 20,
    level: 17,
    prizes: {
      exp: 17,
      items: ['Big Bone'],
      equips: ['granite', 'sharded_club'],
      tokens: ['precious_ore'],
    },
  },
  {
    id: 'beholder',
    name: 'Beholder',
    str: 16,
    ref: 16,
    acc: 16,
    con: 16,
    flow: 25,
    level: 22,
    prizes: {
      exp: 100,
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
    str: 17,
    ref: 17,
    acc: 17,
    con: 17,
    flow: 30,
    level: 23,
    prizes: {
      exp: 23,
      items: ['Sting'],
      equips: ['swift_dagger'],
      tokens: ['old_soul'],
    },
  },
  {
    id: 'snake',
    name: 'Snake',
    str: 18,
    ref: 18,
    acc: 18,
    con: 18,
    flow: 32,
    level: 25,
    prizes: {
      exp: 25,
      items: ['Snakeskin'],
      equips: ['feather'],
      tokens: ['old_soul'],
    },
  },
  {
    id: 'lizardrill',
    name: 'Lizardrill',
    str: 19,
    ref: 19,
    acc: 19,
    con: 19,
    flow: 34,
    level: 29,
    prizes: {
      exp: 29,
      items: ['Lizard Tail'],
      equips: ['whip_of_vines'],
      tokens: ['old_soul'],
    },
  },
  {
    id: 'gorgon',
    name: 'Gorgon',
    str: 21,
    ref: 21,
    acc: 21,
    con: 21,
    flow: 36,
    level: 33,
    prizes: {
      exp: 33,
      items: ['Block'],
      equips: ['whip_of_vines', 'porcelain'],
      tokens: ['old_soul'],
    },
  },
  {
    id: 'hydra',
    name: 'Hydra',
    str: 24,
    ref: 24,
    acc: 24,
    con: 24,
    flow: 40,
    level: 38,
    prizes: {
      exp: 200,
      equips: ['whip_of_vines', 'porcelain'],
      tokens: ['old_soul'],
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
    str: 24,
    ref: 24,
    acc: 24,
    con: 24,
    flow: 40,
    level: 41,
    prizes: {
      exp: 41,
      items: ['Tooth'],
      tokens: ['demons_pick'],
    },
  },
  {
    id: 'ghost',
    name: 'Ghost',
    str: 26,
    ref: 26,
    acc: 26,
    con: 26,
    flow: 40,
    level: 44,
    prizes: {
      exp: 44,
      items: ['Blanket'],
      tokens: ['demons_pick'],
    },
  },
  {
    id: 'imp',
    name: 'Imp',
    str: 27,
    ref: 27,
    acc: 27,
    con: 27,
    flow: 40,
    level: 46,
    prizes: {
      exp: 46,
      items: ['Ashes'],
      equips: ['miasma'],
      tokens: ['demons_pick'],
    },
  },
  {
    id: 'vampire',
    name: 'Vampire',
    str: 30,
    ref: 30,
    acc: 30,
    con: 30,
    flow: 45,
    level: 49,
    prizes: {
      exp: 49,
      items: ['Blood'],
      equips: ['psycho_scythe', 'miasma'],
      tokens: ['demons_pick'],
    },
  },
  {
    id: 'werewolf',
    name: 'Werewolf',
    str: 32,
    ref: 32,
    acc: 32,
    con: 32,
    flow: 50,
    level: 52,
    prizes: {
      exp: 350,
      equips: ['psycho_scythe', 'miasma'],
      tokens: ['demons_pick'],
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
    str: 34,
    ref: 34,
    acc: 34,
    con: 34,
    flow: 50,
    level: 55,
    prizes: {
      exp: 55,
      items: ['Ice Block'],
      tokens: ['ice_ring'],
    },
  },
  {
    id: 'frost_undead',
    name: 'Frost Undead',
    str: 36,
    ref: 36,
    acc: 36,
    con: 36,
    flow: 50,
    level: 57,
    prizes: {
      exp: 57,
      items: ['Frost Bones'],
      tokens: ['ice_ring'],
    },
  },
  {
    id: 'snow_chimera',
    name: 'Snow Chimera',
    str: 38,
    ref: 38,
    acc: 38,
    con: 38,
    flow: 50,
    level: 61,
    prizes: {
      exp: 61,
      items: ['Refined Ice'],
      equips: ['lancicle'],
      tokens: ['ice_ring'],
    },
  },
  {
    id: 'dark_fanged_pine',
    name: 'Dark Fanged Pine',
    str: 40,
    ref: 40,
    acc: 40,
    con: 40,
    flow: 50,
    level: 63,
    prizes: {
      exp: 63,
      items: ['Dark Fang'],
      equips: ['glacier',],
      tokens: ['ice_ring'],
    },
  },
  {
    id: 'yeti_lord',
    name: 'Yeti Lord',
    str: 44,
    ref: 44,
    acc: 44,
    con: 44,
    flow: 60,
    level: 67,
    prizes: {
      exp: 500,
      equips: ['glacier', 'lancicle'],
      tokens: ['ice_ring'],
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
    str: 50,
    ref: 50,
    acc: 50,
    con: 50,
    flow: 60,
    level: 75,
    prizes: {
      exp: 75,
      items: ['Lava Carcass'],
      tokens: ['fire_emblem'],
    },
  },
  {
    id: 'fire_cactus',
    name: 'Fire Cactus',
    str: 55,
    ref: 55,
    acc: 55,
    con: 55,
    flow: 65,
    level: 80,
    prizes: {
      exp: 80,
      items: ['Fire Spike'],
      tokens: ['fire_emblem'],
    },
  },
  {
    id: 'ash_spirit',
    name: 'Ash Spirit',
    str: 63,
    ref: 63,
    acc: 63,
    con: 63,
    flow: 63,
    level: 88,
    prizes: {
      exp: 100,
      items: ['Glowing Ashes'],
      equips: ['flame', 'magma'],
      tokens: ['fire_emblem'],
    },
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    str: 70,
    ref: 70,
    acc: 70,
    con: 70,
    flow: 80,
    level: 95,
    prizes: {
      exp: 110,
      items: ['Molten Feather'],
      equips: [
        { id: 'molten_gauntlets', weight: 2 },
        { id: 'flame', weight: 1 },
        { id: 'magma', weight: 1 },
        { id: 'lava', weight: 1 },
      ],
      tokens: ['fire_emblem'],
    },
  },
  {
    id: 'dragon',
    name: 'Dragon',
    str: 80,
    ref: 80,
    acc: 80,
    con: 80,
    flow: 90,
    level: 115,
    prizes: {
      exp: 750,
      equips: [
        { id: 'molten_gauntlets', weight: 3 },
        { id: 'lava', weight: 2 },
        { id: 'dragon', weight: 1 },
        { id: 'fire_sword', weight: 1 },
      ],
      tokens: ['fire_emblem', 'fire_emblem', 'fire_ring'],
    },
  },
  {
    id: 'shiny_dragon',
    name: 'Shiny Dragon',
    str: 100,
    ref: 100,
    acc: 100,
    con: 100,
    flow: 100,
    level: 135,
    prizes: {
      exp: 1300,
      equips: ['dragon', 'fire_sword'],
      tokens: ['fire_ring'],
    },
  },

/*//////////////////////////////////////////////////////////////////////////////
Robot City

w . Blood Chainsaw
s . Mecha Suit
t . Dynamo

*/
  {
    id: 'lowly_solder',
    name: 'Lowly Solder',
    str: 90,
    ref: 90,
    acc: 90,
    con: 90,
    flow: 110,
    level: 130,
    prizes: {
      exp: 130,
      items: ['Rifle Piece'],
      tokens: ['dynamo'],
    },
  },
  {
    id: 'pysthon',
    name: 'Pysthon',
    str: 110,
    ref: 110,
    acc: 110,
    con: 110,
    flow: 115,
    level: 165,
    prizes: {
      exp: 150,
      items: ['Dark Oil'],
      equips: ['electric'],
      tokens: ['dynamo'],
    },
  },
  {
    id: 'sprocketeer',
    name: 'Sprocketeer',
    str: 120,
    ref: 120,
    acc: 120,
    con: 120,
    flow: 120,
    level: 170,
    prizes: {
      exp: 170,
      items: ['Broken rocket'],
      equips: ['electric'],
      tokens: ['dynamo'],
    },
  },
  {
    id: 'grate_knight',
    name: 'Grate Knight',
    str: 150,
    ref: 150,
    acc: 150,
    con: 150,
    flow: 170,
    level: 180,
    prizes: {
      exp: 200,
      items: ['Grate'],
      equips: ['mecha', 'steel'],
      tokens: ['dynamo'],
    },
  },
  {
    id: 'king_gear',
    name: 'King Gear',
    str: 180,
    ref: 180,
    acc: 180,
    con: 180,
    flow: 220,
    level: 220,
    prizes: {
      exp: 2000,
      equips: ['blood_chainsaw'],
      tokens: ['dynamo'],
    },
  },
]
// #<{(|//////////////////////////////////////////////////////////////////////////////
// Deeps Below
//
// w . Plague Staff
// s . Unholy
// t . Pandora's Box Shard
//
// |)}>#
//   {
//     id: 'colossal_spider',
//     name: 'Colossal Spider',
//     str: 0,
//     ref: 0,
//     acc: 0,
//     con: 0,
//     flow: 0,
//     prizes: {
//       exp: 0,
//       items: ['?'],
//       equips: ['?'],
//       tokens: ['?'],
//     },
//   },
//   {
//     id: 'urork',
//     name: 'Urork',
//     str: 0,
//     ref: 0,
//     acc: 0,
//     con: 0,
//     flow: 0,
//     prizes: {
//       exp: 0,
//       items: ['?'],
//       equips: ['?'],
//       tokens: ['?'],
//     },
//   },
//   {
//     id: 'golem',
//     name: 'Golem',
//     str: 0,
//     ref: 0,
//     acc: 0,
//     con: 0,
//     flow: 0,
//     prizes: {
//       exp: 0,
//       items: ['?'],
//       equips: ['?'],
//       tokens: ['?'],
//     },
//   },
//   {
//     id: 'kraken',
//     name: 'Kraken',
//     str: 0,
//     ref: 0,
//     acc: 0,
//     con: 0,
//     flow: 0,
//     prizes: {
//       exp: 0,
//       items: ['?'],
//       equips: ['?'],
//       tokens: ['?'],
//     },
//   },
//   {
//     id: 'death',
//     name: 'Death',
//     stance: 'death',
//     str: 100,
//     ref: 100,
//     acc: 100,
//     con: 100,
//     flow: 100,
//     prizes: {
//       exp: 100,
//       items: ['?'],
//       equips: ['?'],
//       tokens: ['?'],
//     },
//   },
// ]
