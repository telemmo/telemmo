import handlers from '../../handlers'

export default [
  {
    match: /\/start/,
    handler: handlers.start,
  },
  {
    match: /\/info_(\w+)/,
    handler: handlers.classInfo,
  },
  {
    match: /\/create_(\w+)/,
    handler: handlers.createChar,
    next: handlers.start,
  },
  {
    match: /\/maps/,
    handler: handlers.maps,
  },
  {
    match: /\/explore_(\w+)/,
    handler: handlers.explore,
  },
]

