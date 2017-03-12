import models from '../../models'
import { pickRandom, weightedPool } from '../utils'

export default function randomSkillFromStance (id) {
  const stance = models.stances.find(id)
  const skillId = pickRandom(weightedPool(stance.skills))
  return models.skills.find(skillId)
}
