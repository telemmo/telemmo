import {
  unless,
  is,
} from 'ramda'

export default function weightedPool (arr, weightProp = 'influence') {
  return arr.map(unless(is(Object), x => ({ id: x })))
    .reduce((acc, { id, [weightProp]: weight = 1 }) => [
      ...acc,
      ...Array(weight).fill(id),
    ], [])
}
