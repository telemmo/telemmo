import {
  partial,
  prop,
  head,
  map,
} from 'ramda'

import { ObjectId } from 'mongodb'
import membersEquips from './membersEquips'
import models from '../models'

export default function call (dao, provider, _, msg) {
  return dao.character
    .find({ playerId: msg.player.id })
    .then(chars => chars.map(char => ObjectId(char.id)))
    .then(partial(membersEquips, [dao]))
    .then(head)
    .then(prop('equips'))
    .then(map(models.equips.find))
    .then(equips => ({
      to: msg.chat,
      text: equips.map(equip =>
        `${equip.name} - ${equip.type} - /use_equip_${equip.id}`,
      ).join('\n'),
    }))
}

