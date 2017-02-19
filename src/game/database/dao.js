const {
  partial,
  always,
  identity,
  ifElse,
  isNil,
  merge,
  assoc,
  prop,
  pipe,
  omit,
  map,
} = require('ramda')

const queries = {
  notDeleted: { deletedAt: { $exists: false } },
}

const renameId = obj =>
  assoc('id', prop('_id', obj), omit('_id', obj))

function find (collection, query) {
  return collection.find(merge(queries.notDeleted, query)).toArray()
    .then(map(renameId))
}

function update (collection, query, document, options) {
  const sealed = merge({}, document)
  const opts = merge({ returnOriginal: false }, options || {})

  return collection.findOneAndUpdate(query, sealed, opts)
    .then(prop('value'))
    .then(ifElse(
      isNil,
      identity,
      renameId,
    ))
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

function destroy (collection, query, options) {
  if (options.hard) {
    return collection.remove(query) 
  }

  return collection.findOneAndUpdate(
    query, { $set: { deletedAt: new Date() } })
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

