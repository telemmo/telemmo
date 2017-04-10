import {
  always,
  partial,
  head,
  nth,
} from 'ramda'

import Promise from 'bluebird'

import models from '../models'
import { rejectUndefined } from './errors'
import { exploreUntilDead } from '../core/explore'
import render from '../renderers/combat'

function InvalidMap (mapId) {
  this.message = `Invalid map id "${mapId}"`
  this.name = 'InvalidMap'
  this.mapIp = mapId
  Error.captureStackTrace(this, InvalidMap)
}
InvalidMap.prototype = Object.create(Error.prototype)
InvalidMap.prototype.constructor = InvalidMap


function reply (msg, text) {
  return {
    to: msg.chat,
    text,
  }
}

function sendCombatResult (dispatch, msg, combat) {
  const text = render(msg.player, combat)
  dispatch(text)
}

function sendExplorationStart (dispatch, _, msg, gameMap, char) {
  const stancesIds = models.classes.find(char.classId).stances
  const stances = stancesIds.map(models.stances.find)

  dispatch({
    to: msg.chat,
    text: _('You started exploring %s!', gameMap.name),
    options: [
      [`/explore_${gameMap.id}`, ':information_source: /char_info'],
      stances.map(stance => `${stance.emoji} /stance_${stance.id}`),
      [':arrow_left: /overworld', ':earth_asia: /maps'],
    ],
  })
}


function startFight (dao, dispatch, _, msg, gameMap, char) {
  const exploration = exploreUntilDead(dao, msg.player, gameMap, char)

  exploration.subscribe(
    partial(sendCombatResult, [dispatch, msg]))

  return sendExplorationStart(dispatch, _, msg, gameMap, char)
}

function startExploring (dao, dispatch, _, msg, mapId) {
  let gameMap

  try {
    gameMap = models.maps.find(mapId)
  } catch (e) {
    throw new InvalidMap(mapId)
  }

  return dao.character.find({ _id: msg.player.currentCharId })
    .then(head)
    .then(partial(startFight, [dao, dispatch, _, msg, gameMap]))
    .then(always(_('You will only stop if you lose a battle. If that happens, just start exploring again.')))
}

export default function call (dao, dispatch, _, msg) {
  return Promise.resolve(msg.matches)
    .then(rejectUndefined(msg, _('No match')))
    .then(nth(1))
    .then(rejectUndefined(msg, _('No match')))
    .then(partial(startExploring, [dao, dispatch, _, msg]))
    .catch(InvalidMap, () => _('The desired map does not exist!'))
    .then(partial(reply, [msg]))
}

