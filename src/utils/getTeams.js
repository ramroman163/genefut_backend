import { connector } from '../bd/bd.js'
import pc from 'picocolors'

// No la uso
/*
export async function getTeams (user) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT
    J.nombre,
    P.fecha_partido,
    P.tipo_partido,
    E.id AS equipo_id,
    AJE.id_partido AS partido_id
    FROM usuarios, jugadores AS J
    INNER JOIN asignacionjugadoresequipos AS AJE ON J.id = AJE.id_jugador
    INNER JOIN equipos AS E ON AJE.id_equipo = E.id
    INNER JOIN partidos AS P ON P.id = AJE.id_partido WHERE usuarios.id = ${user}`

    connector.query(sql, (err, result, filed) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
} */

export async function getTeam (idTeam, idMatch) {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT J.nombre 
    FROM jugadores AS J
    INNER JOIN asignacionjugadoresequipos AS AJE ON J.id = AJE.id_jugador
    WHERE AJE.id_equipo = ${idTeam} AND AJE.id_partido = ${idMatch}; 
    `

    connector.query(sql, (error, result, filed) => {
      if (error) {
        console.error(pc.red('Error al obtener nombre de los jugadores'))
        reject(error)
      }

      const names = result.map(player => player.nombre)

      resolve(names)
    })
  })
}
