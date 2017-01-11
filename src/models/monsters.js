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
    str: 8,
    vit: 8,
    agi: 8,
    luk: 8,
    int: 8,
    dex: 8,
    loot: {
      types: ['Rock', 'Earth', 'Wind'],
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
    str: 10,
    vit: 10,
    agi: 10,
    luk: 10,
    int: 10,
    dex: 10,
    loot: {
      types: ['Rock', 'Earth', 'Wind'],
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
    str: 15,
    vit: 15,
    agi: 15,
    luk: 15,
    int: 15,
    dex: 15,
    loot: {
      types: ['Rock'],
      max: 7,
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
    str: 20,
    vit: 20,
    agi: 25,
    luk: 25,
    int: 10,
    dex: 10,
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
      types: ['Water', 'Shock'],
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
    name: 'Crazed Tribesman',
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
      types: ['Wind', 'Shock'],
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
    name: 'Possessed Deer',
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
    name: 'Flying Demon',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 30,
      }
    ],
    str: 65,
    vit: 65,
    agi: 60,
    luk: 68,
    int: 65,
    dex: 60,
    loot: {
      types: ['Wind'],
      max: 20,
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
    str: 70,
    vit: 70,
    agi: 75,
    luk: 75,
    int: 70,
    dex: 75,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 15,
    },
  },
  {
    name: 'Corrupted Florest Keeper',
    maps: [
      {
        name: 'Demonic Forest',
        spawnInfluence: 5,
      }
    ],
    str: 80,
    vit: 85,
    agi: 80,
    luk: 80,
    int: 80,
    dex: 80,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 17,
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
      max: 20,
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
      types: ['Wind', 'Shock'],
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
      types: ['Rock', 'Water', 'Earth', 'Wind', 'Shock'],
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
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water'],
      max: 40,
    },
  },
  {
    name: 'Beholder',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 9,
      }
    ],
    str: 300,
    vit: 300,
    agi: 300,
    luk: 300,
    int: 300,
    dex: 300,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water'],
      max: 80,
    },
  },
  {
    name: 'Obelisk',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 3,
      }
    ],
    str: 500,
    vit: 500,
    agi: 500,
    luk: 500,
    int: 500,
    dex: 500,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water'],
      max: 100,
    },
  },
  {
    name: 'Baphomet',
    maps: [
      {
        name: 'Doom Hill',
        spawnInfluence: 1,
      }
    ],
    str: 1000,
    vit: 1000,
    agi: 1000,
    luk: 1000,
    int: 1000,
    dex: 1000,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock', 'Water'],
      max: 200,
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
