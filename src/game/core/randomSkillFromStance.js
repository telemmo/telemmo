import {
  always,
} from 'ramda'

import models from '../models'

export default function randomSkillFromStance (id) {
  const stance = models.stances.find(id)
  const skills = stance.skills.reduce((acc, skill) => {
    console.log(skill)
    return [
      ...acc,
      ...Array.from({ length: skill.influence }).map(always(skill.id))
    ]
  }, [])
  const skillId = skills[Math.floor(Math.random() * skills.length)]
  const skill = models.skills.find(skillId)
  return skill
}
