const {
  partial,
  always,
  mergeWith,
  merge,
  assoc,
  prop,
  omit,
  map,
} = require('ramda')

const mergeMerging = mergeWith(merge)

const queries = {
  notDeleted: { deletedAt: { $exists: false } },
}

const renameId = obj =>
  assoc('id', prop('_id', obj), omit('id', obj))

function find (collection, query) {
  return collection.find(merge(queries.notDeleted, query)).toArray()
    .then(map(renameId))
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

  const sealed = merge(timestamps, document)

  return collection.insertOne(sealed)
    .then(always(sealed))
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

