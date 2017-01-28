test('get random monster from map', () => {
  const { randomMonster } = require('./explore')
  const monster = randomMonster('green_fields')
  expect(monster.prizes).toBeTruthy();
});
