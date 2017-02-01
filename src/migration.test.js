import { ObjectId } from 'mongodb'

const oldPlayer = {
	"_id" : ObjectId("586c2276248404000fb39ff4"),
	"gems" : {
		"Rock" : 1,
		"Earth" : 5,
		"Water" : 0,
		"Ice" : 0,
		"Wind" : 2,
		"Shock" : 0,
		"Fire" : 0,
		"Metal" : 0
	},
	"telegramId" : 311445781,
	"first_name" : "John",
	"character" : {
		"className" : "Ranger",
		"name" : "John",
		"str" : 5,
		"vit" : 5,
		"agi" : 5,
		"luk" : 5,
		"int" : 5,
		"dex" : 5,
		"stance" : "Sniper"
	}
}

const newOldPlayer = (player) => ({
  language: 'en',
  providers: {
    telegram: {
      id: player.telegramId,
    },
  },
  titles: ['Alpha Tester'],
})

test('migration', () => {
  expect(newOldPlayer(oldPlayer)).toMatchObject({
    language: 'en',
    providers: {
      telegram: {
        id: 311445781,
      },
    },
    titles: ['Alpha Tester'],
  })
})
