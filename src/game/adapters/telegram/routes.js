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
    match: /\/improve_stats/,
    handler: handlers.stats,
  },
  {
    match: /\/change_name (.*)/,
    handler: handlers.changeName,
  },
  {
    match: /\/change_char/,
    handler: handlers.changeChar,
  },
  {
    match: /\/use_char_(.*)/,
    handler: handlers.useChar,
  },
  {
    match: /\/change_name (.*)/,
    handler: handlers.changeName,
  },
  {
    match: /\/explore_(\w+)/,
    handler: handlers.explore,
  },
]

