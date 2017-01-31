export default function membersEquips (dao, members) {
  return dao.combat
    .aggregate([
      { $match: { winner: { $in: members } } },
      { $project: { prizes: 1 } },
      { $unwind: '$prizes' },
      { $project: { equip: '$prizes.equip' } },
      { $group: { _id: '$charId', equips: { $addToSet: '$equip' } } },
    ])
}
