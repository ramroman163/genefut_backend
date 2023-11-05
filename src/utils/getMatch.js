import { connector } from '../bd/bd.js'
import { getTeam } from './getTeams.js'
import pc from 'picocolors'

export async function getTeamsByMatch (sessionUserId) {
  const matchs = await getMatchAndTeamsId(sessionUserId)

  const teamsProcessed = []

  await Promise.all(
    matchs.map(async (match) => {
      const formatedDate = (new Date(match.fecha_creacion)).toISOString().split('T')[0]

      teamsProcessed.push({
        fecha_creacion: formatedDate,
        primer_equipo: await getTeam(match.id_equipo_1, match.id),
        segundo_equipo: await getTeam(match.id_equipo_2, match.id),
        tipo_partido: match.tipo_partido
      })
    })
  )

  return teamsProcessed
}

function getMatchAndTeamsId (sessionUserId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, id_equipo_1, id_equipo_2, fecha_partido as fecha_creacion, tipo_partido FROM partidos WHERE id_usuario = ${sessionUserId} ORDER BY fecha_creacion DESC LIMIT 10`

    connector.query(sql, (error, result, filed) => {
      if (error) {
        console.error(pc.red('Error al procesar id en getMatch'))
        reject(error)
      }

      resolve(result)
    })
  })
}
