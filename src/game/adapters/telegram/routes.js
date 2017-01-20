import handlers from '../../handlers'

export default [
  {
    match: /\/start/,
    handler: handlers.start,
  },
  {
    match: /\/info_(.*)/,
    handler: handlers.classInfo,
  },
]

