export default function membersExp (dao, members) {
  return dao.combat
    .aggregate([
      { $match: { winner: { $in: members } } },
      { $project: { prizes: 1 } },
      { $unwind: '$prizes' },
      { $project: { exp: '$prizes.exp' } },
      { $group: { _id: '$charId', exp: { $sum: '$exp' } } },
    ])
}
