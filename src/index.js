import engine from './engine'
import game from './game'

function handleError (error) {
  console.error('Engine exploded')
  console.error(error.message)
  console.error(error.stack)
}

Promise.resolve()
  .then(game.start)
  .then(engine.start)
  .then(() => console.log('Engine started'))
  .catch(handleError)

