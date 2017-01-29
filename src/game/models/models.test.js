import models from './index'
import {
  omit,
  map,
} from 'ramda'

function findAll(needle, haysack) {
  models[haysack].all.map(hay =>
    hay[needle].map(e =>
      models[needle].find(e.id)))
}

function findAllPlain(needle, haysack) {
  models[haysack].all.map(hay =>
    hay[needle].map(e =>
      models[needle].find(e)))
}

function equipsOnMonsters () {
  models.monsters.all.map(monster =>
    map(
      prizes => prizes.map(prize =>
        models.equips.find(prize)),
      omit(['exp', 'items'], monster.prizes)
    )
  )
}

test('models', () => {
  findAll('monsters', 'maps')
  findAll('skills', 'stances')
  findAllPlain('stances', 'classes')
  equipsOnMonsters()
})
