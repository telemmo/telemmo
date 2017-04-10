import query from './charsByMap.json'

export function charsByMap (dao) {
  return dao.combat.aggregate(query)
}
