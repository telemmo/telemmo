const monsters = [
  {
    name: 'Jelly',
    maps: [
      {
        name: 'Easy Fields',
        spawnInfluence: 30
      }
    ],
    str: 1,
    vit: 1,
    agi: 1,
    luk: 3,
    int: 3,
    dex: 3,
    loot: {
      types: ['Rock', 'Earth'],
      max: 2,
    },
  },
  {
    name: 'Jello',
    maps: [
      {
        name: 'Easy Fields',
        spawnInfluence: 30
      }
    ],
    str: 3,
    vit: 3,
    agi: 3,
    luk: 1,
    int: 1,
    dex: 1,
    loot: {
      types: ['Water', 'Ice'],
      max: 2,
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
