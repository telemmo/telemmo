import {
  merge,
  head,
} from 'ramda'

import { ObjectId } from 'mongodb'

import { level, nextLevelBar } from '../core/level'
import membersExp from '../core/membersExp'

import { rejectUndefined } from './errors'
import { capitalize } from './helpers'

export default function call (dao, provider, _, msg) {
  return dao.character
    .find({
      _id: ObjectId(msg.player.currentCharId),
    })
    .then(head)
    .then(rejectUndefined(msg, _('Invalid char Id')))
    .then(char => membersExp(dao, [ObjectId(char.id)])
      .then(head)
      .then(expObj => merge(char, {
        exp: expObj ? expObj.exp : 0,
      }))
      .then(charWithoutLevel => merge(charWithoutLevel, {
        level: level(charWithoutLevel),
      })),
    )
    .then(char => ({
      to: msg.chat,
      text: [
        _('<b>Titles:</b> %s', msg.player.titles.join(', ')),
        _('<b>Name:</b> %s', char.name),
        _('<b>Class:</b> %s', capitalize(char.classId)),
        _('<b>Stance:</b> %s', capitalize(char.stance)),
        _('<b>Level:</b> %s', char.level),
        _('<b>Exp:</b> %s', char.exp),
        _('\n<b>Level Progress :</b>\n<pre>%s</pre>', nextLevelBar(char)),
        _('\nStats\n%s',
          [
            _('<b>Strength: </b> %s', char.str),
            _('<b>Constitution: </b> %s', char.con),
            _('<b>Reflex: </b> %s', char.ref),
            _('<b>Accuracy: </b> %s', char.acc),
            _('<b>Flow: </b> %s', char.flow),
          ].join('\n'),
        ),
        _('\nsee /inventory for items and equips'),
      ].join('\n'),
    }))
}

