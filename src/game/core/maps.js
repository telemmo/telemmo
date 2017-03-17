export function charsByMap (dao) {
  return dao.combat.aggregate([
    {
      $match: {
        finishedAt: {
          $exists: false
        },
        deletedAt: {
          $exists: false
        },
        "source.name": "map"
      }
    },
    {
      $group: {
        _id: "$source.id",
        chars: {
          $addToSet: "$teams.members.id"
        }
      }
    },
    {
      $unwind: "$chars"
    },
    {
      $unwind: "$chars"
    },
    {
      $unwind: "$chars"
    },
    {
      $match: {
        chars: {
          $type: 7
        },
        _id: {
          $ne: "green_fields"
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        chars: {
          $addToSet: "$chars"
        }
      }
    }
  ])
    .toArray()
}
