const {
  partial,
  mergeWith,
  merge,
} = require('ramda')

const mergeMerging = mergeWith(merge)

const queries = {
  notDeleted: { deletedAt: { $exists: false } },
}

function find (collection, query) {
  return collection.find(merge(queries.notDeleted, query)).toArray()
}

function update (collection, query, document) {
  const now = new Date()
  const timestamps = {
    $set: { updatedAt: now },
  }

  return collection.update(query, mergeMerging(timestamps, document))
}

function create (collection, document) {
  const now = new Date()
  const timestamps = {
    createdAt: now,
    updatedAt: now,
  }

  return collection.insert(merge(timestamps, document))
}

function destroy (collection, query) {
  return collection.update(query, { $set: { deletedAt: new Date() } })
}

function build (collection) {
  return {
    find: partial(find, [collection]),
    update: partial(update, [collection]),
    create: partial(create, [collection]),
    destroy: partial(destroy, [collection]),
  }
}

module.exports = {
  build,
}

