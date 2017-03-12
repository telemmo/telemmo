import models from '../../models'
import pickRandom from '../pickRandom'
import weightedPool from '../weightedPool'

export default function randomSkillFromStance (id) {
  const stance = models.stances.find(id)
  const skillId = pickRandom(weightedPool(stance.skills))
  return models.skills.find(skillId)
}
