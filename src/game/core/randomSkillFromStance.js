import models from '../models'

export default function randomSkillFromStance (name) {
  const stance = models.stances.find(name)
  const skillName = stance.skills[Math.floor(Math.random() * stance.skills.length)]
  const skill = models.skills.find(skillName)
  return skill
}
