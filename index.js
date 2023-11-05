import express, { json } from 'express'
import pc from 'picocolors'
import cors from 'cors'

import { connection } from './src/bd/bd.js'
import { savePlayers } from './src/utils/savePlayers.js'
import { saveTeams } from './src/utils/saveTeams.js'
import { saveMatch } from './src/utils/saveMatch.js'
import { getPlayers } from './src/utils/getPlayers.js'
import { assignMatch } from './src/utils/assignMatch.js'
import { getTeamsByMatch } from './src/utils/getMatch.js'

const app = express()

app.use(json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bienvenido al backend de Genefut')
})

app.post('/teams', async (req, res) => {
  console.log(pc.green('POST Recibido'))
  console.log(req.body)
  const { teams, category } = req.body

  await savePlayers(teams)

  const playersIdTeam1 = await getPlayers(teams.firstTeam)
  const playersIdTeam2 = await getPlayers(teams.secondTeam)

  const date = new Date()

  const actualDate = date.toISOString().split('T')[0]

  const idTeam1 = await saveTeams('Equipo 1', actualDate, 1)
  const idTeam2 = await saveTeams('Equipo 2', actualDate, 1)

  const idMatch = await saveMatch(actualDate, '0-0', category, idTeam1, idTeam2, 1)

  assignMatch(idTeam1, idMatch, playersIdTeam1)
  assignMatch(idTeam2, idMatch, playersIdTeam2)

  res.json({
    message: 'Jugadores almacenados',
    status: true
  })
})

app.get('/teams', async (req, res) => {
  console.log(pc.green('GET Recibido'))
  const teams = await getTeamsByMatch(1)

  res.json(teams)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  connection() // Conectamos con BD
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
})
