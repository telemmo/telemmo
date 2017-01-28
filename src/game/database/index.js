import { MongoClient } from 'mongodb'

import dao from './dao'

function build (db) {
  return {
    player: dao.build(db.collection('player')),
    character: dao.build(db.collection('character')),
    combat: dao.build(db.collection('combat')),
  }
}

function connect () {
  return MongoClient
    .connect(process.env.MONGO_URL)
    .then(build)
}

export default {
  connect,
}
