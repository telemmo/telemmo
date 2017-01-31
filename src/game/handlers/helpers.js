import {
  head,
  juxt,
  pipe,
  toUpper,
  tail,
  join,
} from 'ramda'

export const capitalize = pipe(
    juxt([pipe(head, toUpper), tail]),
    join(''),
)
