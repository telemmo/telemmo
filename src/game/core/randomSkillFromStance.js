import models from '../models'

export default function randomSkillFromStance (name) {
  const stance = models.stances.find(name)
  const skills = stance.skills.reduce((acc, skill) => {
    return [
      ...acc,
      ...Array.from({ length: skill.influence }).map(e => skill.name)
    ]
  }, [])
  const skillName = skills[Math.floor(Math.random() * skills.length)]
  const skill = models.skills.find(skillName)
  return skill
}
