const db = {
  players: [
    {
      createdAt: Date,
      updatedAt: Date,
      providers: [
        {
          name: String,
          userId: String,
        },
      ],
      name: String,
      gold: Number,
      titles: [String],
      language: String,
      items: [
        {
          name: String,
          amount: Number,
        },
      ],
      combat: {
        lastStart: Date,
      },
      characters: [
        {
          createdAt: Date,
          name: String,
          className: String,
          experience: Number,
          level: Number,
          equipment: String,
          stance: String,
          statPoints: Number,
          skillPoints: Number,
          stats: [
            {
              name: String,
              amount: Number,
            },
          ],
          log: {
            wins: Number,
            losses: Number,
            combatTime: Number,
          },
        },
      ],
    },
  ],
}
