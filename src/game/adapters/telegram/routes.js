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
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/inventory/,
    handler: handlers.inventory,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/use_equip_(\w+)/,
    handler: handlers.useEquip,
    next: handlers.inventory,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/char_info/,
    handler: handlers.charInfo,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/improve_stats/,
    handler: handlers.improveStats,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/up_(\w+)/,
    handler: handlers.upStat,
    next: handlers.improveStats,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/reset_stats/,
    handler: handlers.resetStats,
    next: handlers.improveStats,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/stance_(\w+)/,
    handler: handlers.changeStance,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/change_char/,
    handler: handlers.changeChar,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/use_char_(.*)/,
    handler: handlers.useChar,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/change_name (.*)/,
    handler: handlers.changeName,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
  {
    match: /\/explore_(\w+)/,
    handler: handlers.explore,
    condition: msg => msg.player.currentCharId,
    error: handlers.start,
  },
]

