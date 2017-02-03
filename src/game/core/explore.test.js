test('get random monster from map', () => {
  const { randomMonster } = require('./explore')

    //given some monsters
    let monsters =  Array.from({length:10}, function(){
            return {
                id:'monster_' + Math.random(),
                influence: Math.floor(Math.random()*10)
            }
        }
    )

    //we must pick one random
  const monster = randomMonster(
      monsters,
      function stubFind(id){
        return {
          id
        }
      }
  )

  //not null or undefined
  expect(monster).toBeDefined()

  //it must be at least one of the monsters given
  expect(monsters.find( mtr=> mtr.id === monster.id)).toBeTruthy()
});
