const monsters = [
  {
    name: 'Rat',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 40,
      }
    ],
    str: 2,
    vit: 1,
    agi: 2,
    luk: 1,
    int: 2,
    dex: 1,
    loot: {
      types: ['Earth', 'Rock'],
      max: 1,
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
    str: 2,
    vit: 2,
    agi: 2,
    luk: 2,
    int: 2,
    dex: 2,
    loot: {
      types: ['Wind',],
      max: 1,
    },
  },
  {
    name: 'Big Rat',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 20,
      }
    ],
    str: 4,
    vit: 5,
    agi: 3,
    luk: 3,
    int: 4,
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
    str: 5,
    vit: 6,
    agi: 7,
    luk: 5,
    int: 6,
    dex: 7,
    loot: {
      types: ['Wind'],
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
    str: 4,
    vit: 2,
    agi: 4,
    luk: 3,
    int: 3,
    dex: 5,
    loot: {
      types: ['Wind', 'Earth'],
      max: 2,
    },
  },
  {
    name: 'Toad',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 7,
      }
    ],
    str: 7,
    vit: 7,
    agi: 5,
    luk: 6,
    int: 7,
    dex: 7,
    loot: {
      types: ['Water',],
      max: 5,
    },
  },
  {
    name: 'Buffalo',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 4,
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
      max: 6,
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
      max: 6,
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
      types: ['Rock', 'Earth'],
      max: 7,
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
      max: 20,
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
    agi: 5,
    luk: 5,
    int: 10,
    dex: 10,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
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
    str: 15,
    vit: 15,
    agi: 15,
    luk: 15,
    int: 15,
    dex: 15,
    loot: {
      types: ['Earth', 'Shock'],
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
    str: 10,
    vit: 13,
    agi: 20,
    luk: 15,
    int: 5,
    dex: 20,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 6,
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
    str: 15,
    vit: 13,
    agi: 20,
    luk: 20,
    int: 10,
    dex: 20,
    loot: {
      types: ['Wind', 'Shock'],
      max: 8,
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
    str: 20,
    vit: 25,
    agi: 20,
    luk: 20,
    int: 20,
    dex: 20,
    loot: {
      types: ['Earth', 'Wind', 'Shock'],
      max: 8,
    },
  },
  {
    name: 'Demonic Florest',
    maps: [
      {
        name: 'Possessed Deer',
        spawnInfluence: 40,
      }
    ],
    str: 25,
    vit: 20,
    agi: 15,
    luk: 20,
    int: 10,
    dex: 15,
    loot: {
      types: ['Wind', 'Shock'],
      max: 8,
    },
  },
  {
    name: 'Flying Demon',
    maps: [
      {
        name: 'Demonic Florest',
        spawnInfluence: 30,
      }
    ],
    str: 15,
    vit: 15,
    agi: 30,
    luk: 28,
    int: 15,
    dex: 30,
    loot: {
      types: ['Wind'],
      max: 10,
    },
  },
  {
    name: 'Possessor',
    maps: [
      {
        name: 'Demonic Florest',
        spawnInfluence: 20,
      }
    ],
    str: 20,
    vit: 40,
    agi: 15,
    luk: 15,
    int: 30,
    dex: 15,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 15,
    },
  },
  {
    name: 'Corrupted Florest Keeper',
    maps: [
      {
        name: 'Demonic Florest',
        spawnInfluence: 5,
      }
    ],
    str: 40,
    vit: 35,
    agi: 20,
    luk: 20,
    int: 20,
    dex: 20,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 10,
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
    str: 25,
    vit: 40,
    agi: 20,
    luk: 20,
    int: 20,
    dex: 20,
    loot: {
      types: ['Rock','Wind'],
      max: 10,
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
    str: 20,
    vit: 20,
    agi: 40,
    luk: 30,
    int: 20,
    dex: 35,
    loot: {
      types: ['Wind', 'Shock'],
      max: 10,
    },
  },
  {
    name: 'Breeze Owl',
    maps: [
      {
        name: 'Snowy Peak',
        spawnInfluence: 15,
      }
    ],
    str: 20,
    vit: 20,
    agi: 40,
    luk: 20,
    int: 40,
    dex: 40,
    loot: {
      types: ['Wind'],
      max: 15,
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
    str: 40,
    vit: 40,
    agi: 30,
    luk: 20,
    int: 25,
    dex: 40,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 20,
    },
  },
]
module.exports = {
  randomFromMap,
  isValidMap
}
const tap = x => { console.log(x); return x }

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
