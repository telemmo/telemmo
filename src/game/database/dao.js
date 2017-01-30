const {
  partial,
  always,
  mergeWith,
  merge,
  assoc,
  prop,
  pipe,
  omit,
  map,
} = require('ramda')

const mergeMerging = mergeWith(merge)

const queries = {
  notDeleted: { deletedAt: { $exists: false } },
}

const renameId = obj =>
  assoc('id', prop('_id', obj), omit('_id', obj))

function find (collection, query) {
  return collection.find(merge(queries.notDeleted, query)).toArray()
    .then(map(renameId))
}

function update (collection, query, document) {
  const sealed = merge({}, document)

  return collection.update(query, sealed)
    .then(always(sealed))
}

function create (collection, document) {
  const now = new Date()
  const timestamps = {
    createdAt: now,
    updatedAt: now,
  }

  const sealed = merge(document, timestamps)

  return collection.insertOne(sealed)
    .then(pipe(always(sealed), renameId))
}

function destroy (collection, query) {
  return collection.update(query, { $set: { deletedAt: new Date() } })
}

function aggregate (collection, pipeline) {
  return collection.aggregate(pipeline).toArray()
}

function build (collection) {
  return {
    find: partial(find, [collection]),
    update: partial(update, [collection]),
    create: partial(create, [collection]),
    destroy: partial(destroy, [collection]),
    aggregate: partial(aggregate, [collection]),
  }
}

module.exports = {
  build,
}

