const express = require('express')
const { connection } = require('./src/bd/bd.js')
const { savePlayers } = require('./src/services/savePlayers.js')
const { saveTeams } = require('./src/services/saveTeams.js')
const { saveMatch } = require('./src/services/saveMatch.js')
const { getPlayers } = require('./src/services/getPlayers.js')
const pc = require('picocolors')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  console.log('Hola mundo')
})

app.post('/teams', async (req, res) => {
  const { teams } = req.body

  await savePlayers(teams)

  const ids1 = await getPlayers(teams.firstTeam)
  const ids2 = await getPlayers(teams.secondTeam)
  console.log(pc.bgGreen(ids1))
  console.log(pc.bgGreen(ids2))

  const date = new Date()
  const actualDate = date.toISOString().split('T')[0]

  const idTeam1 = await saveTeams('Equipo 1', actualDate, 1)
  const idTeam2 = await saveTeams('Equipo 2', actualDate, 1)

  await saveMatch(actualDate, '0-0', 'Futbol 5', idTeam1, idTeam2)

  res.send('Jugadores almacenados')
})

const PORT = 3000

app.listen(PORT, () => {
  connection()
  console.log(`Servidor iniciado en ${PORT}`)
})
