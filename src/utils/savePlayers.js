import { connector } from '../bd/bd.js'
import { getPlayerFromDB } from './getPlayers.js'
import pc from 'picocolors'

export async function savePlayers (teams) {
  const arrayTeams = Object.values(teams)

  await Promise.all(arrayTeams.map(async (team) => {
    console.log(team)
    await Promise.all(team.map(async (player) => {
      console.log(pc.blue(player))
      const exists = await getPlayerFromDB(player)
      if (exists.length === 0) {
        console.log(pc.cyan('Entro acá'))
        const sql = `INSERT INTO jugadores (nombre) VALUES ("${player}")`
        connector.query(sql, (err, result, filed) => {
          if (err) {
            console.error('Error al almacenar jugador')
          }
          console.log(`Jugador ${player} almacenado!`)
        })
      }
    }))
  }))
}
