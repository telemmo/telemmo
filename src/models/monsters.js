const monsters = [
  {
    name: 'Rat',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 30,
      }
    ],
    str: 4,
    vit: 4,
    agi: 4,
    luk: 4,
    int: 4,
    dex: 4,
    loot: {
      types: ['Earth', 'Rock'],
      max: 2,
    },
  },
  {
    name: 'Bird',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 25,
      }
    ],
    str: 4,
    vit: 4,
    agi: 4,
    luk: 4,
    int: 4,
    dex: 4,
    loot: {
      types: ['Wind',],
      max: 2,
    },
  },
  {
    name: 'Goat',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 20,
      }
    ],
    str: 4,
    vit: 4,
    agi: 4,
    luk: 5,
    int: 5,
    dex: 5,
    loot: {
      types: ['Earth', 'Rock'],
      max: 2,
    },
  },
  {
    name: 'Spider',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 15,
      }
    ],
    str: 7,
    vit: 7,
    agi: 7,
    luk: 6,
    int: 6,
    dex: 6,
    loot: {
      types: ['Wind', 'Rock'],
      max: 4,
    },
  },
  {
    name: 'Snake',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 18,
      }
    ],
    str: 6,
    vit: 6,
    agi: 6,
    luk: 6,
    int: 6,
    dex: 6,
    loot: {
      types: ['Wind', 'Earth'],
      max: 3,
    },
  },
  {
    name: 'Toad',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 5,
      }
    ],
    str: 9,
    vit: 9,
    agi: 9,
    luk: 9,
    int: 9,
    dex: 9,
    loot: {
      types: ['Wind', 'Earth', 'Water',],
      max: 6,
    },
  },
  {
    name: 'Buffalo',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 2,
      }
    ],
    str: 15,
    vit: 15,
    agi: 15,
    luk: 15,
    int: 15,
    dex: 15,
    loot: {
      types: ['Rock', 'Earth', 'Wind'],
      max: 7,
    },
  },
  {
    name: 'Bat',
    maps: [
      {
        name: 'Cave',
        spawnInfluence: 25,
      }
    ],
    str: 15,
    vit: 15,
    agi: 15,
    luk: 15,
    int: 15,
    dex: 15,
    loot: {
      types: ['Wind'],
      max: 3,
    },
  },
  {
    name: 'Cave Spider',
    maps: [
      {
        name: 'Cave',
        spawnInfluence: 20,
      }
    ],
    str: 19,
    vit: 19,
    agi: 19,
    luk: 19,
    int: 19,
    dex: 19,
    loot: {
      types: ['Earth',],
      max: 5,
    },
  },
  {
    name: 'Rock Monster',
    maps: [
      {
        name: 'Cave',
        spawnInfluence: 10,
      }
    ],
    str: 24,
    vit: 24,
    agi: 24,
    luk: 24,
    int: 24,
    dex: 24,
    loot: {
      types: ['Rock', 'earth'],
      max: 7,
    },
  },
  {
    name: 'Earth Elemental',
    maps: [
      {
        name: 'Cave',
        spawnInfluence: 9,
      }
    ],
    str: 28,
    vit: 28,
    agi: 28,
    luk: 28,
    int: 28,
    dex: 28,
    loot: {
      types: ['Earth',],
      max: 6,
    },
  },
  {
    name: 'Cave Nightmare',
    maps: [
      {
        name: 'Cave',
        spawnInfluence: 2,
      }
    ],
    str: 33,
    vit: 33,
    agi: 30,
    luk: 30,
    int: 20,
    dex: 33,
    loot: {
      types: ['Earth', 'Wind', 'Shock'],
      max: 8,
    },
  },
  {
    name: 'Croco',
    maps: [
      {
        name: 'Dark Swamp',
        spawnInfluence: 35,
      }
    ],
    str: 35,
    vit: 35,
    agi: 35,
    luk: 35,
    int: 35,
    dex: 35,
    loot: {
      types: ['Water', 'Shock', 'Earth',],
      max: 8,
    },
  },
  {
    name: 'Piranha Horde',
    maps: [
      {
        name: 'Dark Swamp',
        spawnInfluence: 25,
      }
    ],
    str: 30,
    vit: 33,
    agi: 30,
    luk: 35,
    int: 35,
    dex: 30,
    loot: {
      types: ['Water', 'Wind', ],
      max: 10,
    },
  },
  {
    name: 'Tribesman',
    maps: [
      {
        name: 'Dark Swamp',
        spawnInfluence: 15,
      }
    ],
    str: 45,
    vit: 43,
    agi: 40,
    luk: 40,
    int: 40,
    dex: 40,
    loot: {
      types: ['Shock', 'Rock'],
      max: 12,
    },
  },
  {
    name: 'Swamp Thing',
    maps: [
      {
        name: 'Dark Swamp',
        spawnInfluence: 5,
      }
    ],
    str: 50,
    vit: 55,
    agi: 50,
    luk: 50,
    int: 50,
    dex: 50,
    loot: {
      types: ['Water', 'Earth', 'Wind', 'Shock'],
      max: 13,
    },
  },
  {
    name: 'Corrupted Deer',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 40,
      }
    ],
    str: 65,
    vit: 60,
    agi: 65,
    luk: 60,
    int: 60,
    dex: 65,
    loot: {
      types: ['Wind', 'Shock'],
      max: 18,
    },
  },
  {
    name: 'Water Elemental',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 30,
      }
    ],
    str: 70,
    vit: 70,
    agi: 70,
    luk: 70,
    int: 70,
    dex: 80,
    loot: {
      types: ['Water'],
      max: 25,
    },
  },
  {
    name: 'Possessor',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 20,
      }
    ],
    str: 90,
    vit: 90,
    agi: 90,
    luk: 90,
    int: 90,
    dex: 90,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 15,
    },
  },
  {
    name: 'Dark Spirit',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 5,
      }
    ],
    str: 100,
    vit: 105,
    agi: 110,
    luk: 110,
    int: 110,
    dex: 110,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 20,
    },
  },
  {
    name: 'Raged Yak',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 40,
      }
    ],
    str: 125,
    vit: 140,
    agi: 120,
    luk: 120,
    int: 120,
    dex: 120,
    loot: {
      types: ['Rock', 'Earth', 'Wind',],
      max: 23,
    },
  },
  {
    name: 'Wolf Pack',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 30,
      }
    ],
    str: 120,
    vit: 120,
    agi: 140,
    luk: 130,
    int: 120,
    dex: 135,
    loot: {
      types: ['Wind', 'Shock',],
      max: 25,
    },
  },
  {
    name: 'Breeze Owl',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 10,
      }
    ],
    str: 130,
    vit: 130,
    agi: 140,
    luk: 130,
    int: 140,
    dex: 140,
    loot: {
      types: ['Wind', 'Water'],
      max: 30,
    },
  },
  {
    name: 'Yeti',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 5,
      }
    ],
    str: 140,
    vit: 140,
    agi: 130,
    luk: 120,
    int: 125,
    dex: 140,
    loot: {
      types: ['Rock', 'Water', 'Earth', 'Wind', 'Shock', 'Ice'],
      max: 35,
    },
  },
  {
    name: 'Ice Lord',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 5,
      }
    ],
    str: 180,
    vit: 180,
    agi: 180,
    luk: 180,
    int: 180,
    dex: 180,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water', 'Ice'],
      max: 40,
    },
  },
  {
    name: 'Magma Golem',
    maps: [
      {
        name: 'Volcanic Oasis',
        spawnInfluence: 30,
      }
    ],
    str: 250,
    vit: 250,
    agi: 180,
    luk: 180,
    int: 180,
    dex: 180,
    loot: {
      types: ['Rock', 'Fire',],
      max: 40,
    },
  },
  {
    name: 'Fire Elemental',
    maps: [
      {
        name: 'Volcanic Oasis',
        spawnInfluence: 25,
      }
    ],
    str: 200,
    vit: 200,
    agi: 230,
    luk: 180,
    int: 180,
    dex: 300,
    loot: {
      types: ['Fire',],
      max: 55,
    },
  },
  {
    name: 'Komodo Serpent',
    maps: [
      {
        name: 'Volcanic Oasis',
        spawnInfluence: 13,
      }
    ],
    str: 300,
    vit: 300,
    agi: 400,
    luk: 300,
    int: 300,
    dex: 300,
    loot: {
      types: ['Earth', 'Wind', 'Water'],
      max: 50,
    },
  },
  {
    name: 'Rock Giant',
    maps: [
      {
        name: 'Volcanic Oasis',
        spawnInfluence: 5,
      }
    ],
    str: 450,
    vit: 450,
    agi: 280,
    luk: 280,
    int: 280,
    dex: 280,
    loot: {
      types: ['Rock', 'Earth',],
      max: 70,
    },
  },
  {
    name: 'Patrol',
    maps: [
      {
        name: 'Robot City',
        spawnInfluence: 30,
      }
    ],
    str: 300,
    vit: 300,
    agi: 370,
    luk: 340,
    int: 300,
    dex: 340,
    loot: {
      types: ['Shock', 'Rock', 'Metal',],
      max: 60,
    },
  },
  {
    name: 'Seeker',
    maps: [
      {
        name: 'Robot City',
        spawnInfluence: 25,
      }
    ],
    str: 350,
    vit: 350,
    agi: 450,
    luk: 340,
    int: 350,
    dex: 370,
    loot: {
      types: ['Shock', 'Wind', 'Metal',],
      max: 70,
    },
  },
  {
    name: 'Dreadnought',
    maps: [
      {
        name: 'Robot City',
        spawnInfluence: 15,
      }
    ],
    str: 530,
    vit: 530,
    agi: 400,
    luk: 340,
    int: 270,
    dex: 340,
    loot: {
      types: ['Shock', 'Wind', 'Metal', 'Rock',],
      max: 75,
    },
  },
  {
    name: 'BL4Z3N4T0R',
    maps: [
      {
        name: 'Robot City',
        spawnInfluence: 5,
      }
    ],
    str: 600,
    vit: 600,
    agi: 600,
    luk: 600,
    int: 600,
    dex: 600,
    loot: {
      types: ['Shock', 'Wind', 'Metal',],
      max: 80,
    },
  },
  {
    name: 'Merfolk',
    maps: [
      {
        name: 'Deeps Below',
        spawnInfluence: 30,
      }
    ],
    str: 500,
    vit: 500,
    agi: 600,
    luk: 500,
    int: 500,
    dex: 550,
    loot: {
      types: ['Water', 'Metal',],
      max: 85,
    },
  },
  {
    name: 'Kraken',
    maps: [
      {
        name: 'Deeps Below',
        spawnInfluence: 25,
      }
    ],
    str: 700,
    vit: 700,
    agi: 600,
    luk: 450,
    int: 400,
    dex: 650,
    loot: {
      types: ['Water', 'Shock', 'Earth'],
      max: 90,
    },
  },
  {
    name: 'Megalodon',
    maps: [
      {
        name: 'Deeps Below',
        spawnInfluence: 15,
      }
    ],
    str: 650,
    vit: 650,
    agi: 750,
    luk: 750,
    int: 650,
    dex: 750,
    loot: {
      types: ['Water', 'Ice', 'Wind'],
      max: 95,
    },
  },
  {
    name: 'Merfolk King',
    maps: [
      {
        name: 'Deeps Below',
        spawnInfluence: 5,
      }
    ],
    str: 850,
    vit: 850,
    agi: 750,
    luk: 750,
    int: 850,
    dex: 750,
    loot: {
      types: ['Water', 'Ice', 'Wind', 'Metal', 'Ice',],
      max: 95,
    },
  },
  {
    name: 'Wyrm',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 45,
      }
    ],
    str: 800,
    vit: 800,
    agi: 850,
    luk: 830,
    int: 800,
    dex: 830,
    loot: {
      types: ['Fire', 'Earth',],
      max: 90,
    },
  },
  {
    name: 'Drake',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 30,
      }
    ],
    str: 950,
    vit: 950,
    agi: 900,
    luk: 830,
    int: 900,
    dex: 830,
    loot: {
      types: ['Fire', 'Rock', 'Earth'],
      max: 95,
    },
  },
  {
    name: 'Frost Dragon',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 25,
      }
    ],
    str: 930,
    vit: 930,
    agi: 850,
    luk: 1000,
    int: 930,
    dex: 1000,
    loot: {
      types: ['Ice', 'Water', 'Wind'],
      max: 95,
    },
  },
  {
    name: 'Eletric Dragon',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 25,
      }
    ],
    str: 930,
    vit: 930,
    agi: 850,
    luk: 1000,
    int: 930,
    dex: 1000,
    loot: {
      types: ['Shock', 'Earth', 'Wind'],
      max: 95,
    },
  },
  {
    name: 'Black Wyrm',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 20,
      }
    ],
    str: 1100,
    vit: 1100,
    agi: 900,
    luk: 900,
    int: 930,
    dex: 1000,
    loot: {
      types: ['Shock', 'Earth', 'Wind', 'Metal', 'Fire'],
      max: 95,
    },
  },
  {
    name: 'White Wyrm',
    maps: [
      {
        name: 'Dragonic Sanctuary',
        spawnInfluence: 10,
      }
    ],
    str: 1250,
    vit: 1250,
    agi: 1200,
    luk: 1000,
    int: 1250,
    dex: 1000,
    loot: {
      types: ['Shock', 'Earth', 'Wind', 'Ice', 'Metal', 'Rock', ],
      max: 100,
    },
  },
  {
    name: 'Beholder',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 30,
      }
    ],
    str: 2000,
    vit: 2000,
    agi: 2000,
    luk: 2000,
    int: 2000,
    dex: 2000,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water', 'Ice'],
      max: 130,
    },
  },
  {
    name: 'Obelisk',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 12,
      }
    ],
    str: 4000,
    vit: 4000,
    agi: 4000,
    luk: 4000,
    int: 4000,
    dex: 4000,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water', 'Metal'],
      max: 160,
    },
  },
  {
    name: 'Baphomet',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 5,
      }
    ],
    str: 6000,
    vit: 6000,
    agi: 6000,
    luk: 6000,
    int: 6000,
    dex: 6000,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water' ,'Ice', 'Metal', 'Fire'],
      max: 200,
    },
  },
  {
    name: 'Death',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 1,
      }
    ],
    str: 10000,
    vit: 10000,
    agi: 10000,
    luk: 10000,
    int: 10000,
    dex: 10000,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water' ,'Ice', 'Metal', 'Fire'],
      max: 300,
    },
  },
]
module.exports = {
  randomFromMap,
  isValidMap
}

function randomFromMap(mapName) {
  const spawnPool = buildSpawnPool(mapMonsters(mapName))
  const monsterName = spawnPool[Math.floor(Math.random() * spawnPool.length)]
  return buildMonster(monsterName)
}

function buildMonster(monsterName) {
  return monsters.find(monster => monster.name === monsterName)
}

// returns all monsters in a map
function mapMonsters (mapName) {
  return monsters.filter(monster =>
    monster.maps.find(map => map.name === mapName)
  ).map(monster =>
    Object.assign({}, monster, {
      spawnInfluence: monster.maps
        .find(map => map.name === mapName).spawnInfluence
    })
  )
}

function buildSpawnPool (monsters) {
  const spawnPool = []
  monsters.forEach(monster =>
    Array.from({length:monster.spawnInfluence}).forEach(() =>
      spawnPool.push(monster.name)
    )
  )
  return spawnPool
}

function isValidMap (name) {
  const result = monsters
    .filter(monster => monster.maps.find(map => map.name === name))
  if (result.length === 0) {
    return false
  }
  return true
}
