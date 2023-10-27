const { connector } = require('../bd/bd')

function saveMatch (date, score, category, firstTeamId, secondTeamId) {
  const sql = `INSERT INTO partidos (fecha_partido, resultado, tipo_partido, id_equipo_1, id_equipo_2) VALUES ("${date}", "${score}", "${category}", ${firstTeamId}, ${secondTeamId})`

  connector.query(sql, (err, result, filed) => {
    if (err) {
      console.error('Error almacenando el partido')
    }

    console.log('Partido almacenado')
  })
}

module.exports = {
  saveMatch
}
