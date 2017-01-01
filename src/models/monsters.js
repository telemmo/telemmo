const monsters = [
  {
    name: 'Rat',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 30,
      }
    ],
    str: 2,
    vit: 1,
    agi: 2,
    luk: 1,
    int: 2,
    dex: 1,
    loot: {
      types: ['Earth'],
      max: 2,
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
    vit: 3,
    agi: 4,
    luk: 3,
    int: 1,
    dex: 3,
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
    vit: 5,
    agi: 5,
    luk: 5,
    int: 5,
    dex: 5,
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
        spawnInfluence: 15,
      }
    ],
    str: 3,
    vit: 2,
    agi: 4,
    luk: 3,
    int: 1,
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
    int: 1,
    dex: 5,
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
        spawnInfluence: 5,
      }
    ],
    str: 10,
    vit: 10,
    agi: 7,
    luk: 1,
    int: 1,
    dex: 8,
    loot: {
      types: ['Rock', 'Earth', 'Wind'],
      max: 6,
    },
  },
  {
    name: 'Eletric Buffalo',
    maps: [
      {
        name: 'Green Fields',
        spawnInfluence: 2,
      }
    ],
    str: 15,
    vit: 15,
    agi: 10,
    luk: 1,
    int: 1,
    dex: 10,
    loot: {
      types: ['Rock', 'Earth', 'Wind', 'Shock'],
      max: 8,
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
