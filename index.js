const express = require('express')
const pc = require('picocolors')
const cors = require('cors')
const { connection } = require('./src/bd/bd.js')
const { savePlayers } = require('./src/services/savePlayers.js')
const { saveTeams } = require('./src/services/saveTeams.js')
const { saveMatch } = require('./src/services/saveMatch.js')
const { getPlayers } = require('./src/services/getPlayers.js')
const { assignMatch } = require('./src/services/assignMatch.js')
const { getTeams } = require('./src/services/getTeams.js')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log('Hola mundo')
})

app.post('/teams', async (req, res) => {
  console.log(pc.bgGreen('POST Recibido'))
  const { teams, category } = req.body

  await savePlayers(teams)

  const playersIdTeam1 = await getPlayers(teams.firstTeam)
  const playersIdTeam2 = await getPlayers(teams.secondTeam)
  console.log(pc.bgGreen(playersIdTeam1))
  console.log(pc.bgGreen(playersIdTeam2))

  const date = new Date()
  const actualDate = date.toISOString().split('T')[0]

  const idTeam1 = await saveTeams('Equipo 1', actualDate, 1)
  const idTeam2 = await saveTeams('Equipo 2', actualDate, 1)

  const idMatch = await saveMatch(actualDate, '0-0', category, idTeam1, idTeam2, 1)

  assignMatch(idTeam1, idMatch, playersIdTeam1)
  assignMatch(idTeam2, idMatch, playersIdTeam2)

  res.send('Jugadores almacenados')
})

app.get('/teams', async (req, res) => {
  const teams = await getTeams(1)

  console.log(teams)

  res.send('Equipos')
})

const PORT = 3000

app.listen(PORT, () => {
  connection()
  console.log(`Servidor iniciado en puerto ${PORT}`)
})
