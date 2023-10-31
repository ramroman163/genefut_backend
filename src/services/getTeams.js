const { connector } = require('../bd/bd.js')

async function getTeams (user) {
  return new Promise((resolve, reject) => {
    /* const sql = `SELECT
    J.nombre, E.nombre, P.fecha_partido, P.tipo_partido, E.id AS equipo_id
    FROM usuarios, jugadores AS J
    INNER JOIN asignacionjugadoresequipos AS AJE ON J.id = AJE.id_jugador
    INNER JOIN equipos AS E ON AJE.id_equipo = E.id
    INNER JOIN partidos AS P ON P.id = AJE.id_partido
    WHERE usuarios.id = ${user}` */

    const sql = `SELECT 
    J.nombre,
    P.fecha_partido, 
    P.tipo_partido, 
    E.id AS equipo_id 
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
}

module.exports = {
  getTeams
}
