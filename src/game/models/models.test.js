import models from './index'

function findAll(needle, haysack) {
  models[haysack].all.map(hay =>
    hay[needle].map(e =>
      models[needle].find(e.id)))
}

test('models', () => {
  findAll('monsters', 'maps')
  findAll('skills', 'stances')
})
