import {
  prop,
  flatten,
  filter,
  pipe,
  map,
} from 'ramda'

import { ObjectId } from 'mongodb'

export const teamsMemberIds = pipe(
  flatten,
  map(prop('id')),
  filter(ObjectId.isValid),
  map(ObjectId),
)

export const combatMemberIds = pipe(
  prop('teams'),
  map(prop('members')),
  teamsMemberIds,
)
