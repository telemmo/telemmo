import models from './index'


function checkDamageSkillValues (firedSkill) {
  if (firedSkill.log.type.match(/\bdamage\b/)) {
    expect(firedSkill.log.value).toBe(-firedSkill.defender.hp)
  }

  return firedSkill
}

function checkHealSkillValues (firedSkill) {
  if (firedSkill.log.type.match(/\bheal\b/)) {
    expect(firedSkill.log.value).toBe(firedSkill.attacker.hp)
  }

  return firedSkill
}

function checkSkillEffectVsLog (skill) {
  const attacker = { level: 100, hp: 500, con: 50, str: 40, ref: 60, acc: 70, flow: 90 }
  const defender = { level: 80, hp: 300, con: 60, str: 70, ref: 50, acc: 40, flow: 75 }
  const rolls = {}

  const firedSkill = skill.fire(attacker, defender, rolls)
  checkHealSkillValues(firedSkill)
  checkDamageSkillValues(firedSkill)
}

describe('checking skill effect vs log values', () => {
  models.skills.all
    .map(skill => test(skill.id, () => checkSkillEffectVsLog(skill)))
})
