const matchRelevance = 8

const winChance = (elo1, elo2) => (elo1 / (elo1 + elo2))

const DefaultElo = 5000

export default function elo (winner, loser) {
  console.log('Calculating elo:', { winner, loser })
  const elos = [
    winner.elo || DefaultElo,
    loser.elo || DefaultElo,
  ]
  const amount = Math.floor(matchRelevance * (1 - winChance(...elos)))

  console.log('Elo difference amount:', amount)

  return [
    {
      charId: winner.id,
      elo: winner.elo ? amount : DefaultElo + amount,
    },
    {
      charId: loser.id,
      elo: winner.elo ? -amount : DefaultElo - amount,
    },
  ]
}

