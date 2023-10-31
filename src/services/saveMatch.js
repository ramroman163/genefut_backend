const { connector } = require('../bd/bd')

function saveMatch (date, score, category, firstTeamId, secondTeamId, user) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO partidos (fecha_partido, resultado, tipo_partido, id_equipo_1, id_equipo_2, id_usuario) VALUES ("${date}", "${score}", "${category}", ${firstTeamId}, ${secondTeamId}, ${user})`

    connector.query(sql, (err, result, filed) => {
      if (err) {
        console.error('Error almacenando el partido')
        reject(err)
      }

      console.log('Partido almacenado')
      resolve(result.insertId)
    })
  })
}

module.exports = {
  saveMatch
}
