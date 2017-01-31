import handlers from '../../handlers'

export default [
  {
    match: /\/start/,
    handler: handlers.start,
  },
  {
    match: /\/overworld/,
    handler: handlers.start,
  },
  {
    match: /\/new_char/,
    handler: handlers.welcome,
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
    match: /\/inventory/,
    handler: handlers.inventory,
  },
  {
    match: /\/use_equip_(\w+)/,
    handler: handlers.useEquip,
  },
  {
    match: /\/char_info/,
    handler: handlers.charInfo,
  },
  {
    match: /\/improve_stats/,
    handler: handlers.stats,
  },
  {
    match: /\/stance_(\w+)/,
    handler: handlers.changeStance,
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

