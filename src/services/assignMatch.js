const { connector } = require('../bd/bd')

function assignMatch (idTeam, idMatch, playersId) {
  playersId.forEach((id) => {
    savePlayerAndMatch(idTeam, idMatch, id)
  })
}

function savePlayerAndMatch (idTeam, idMatch, idPlayer) {
  const sql = `INSERT INTO asignacionjugadoresequipos (id_jugador, id_equipo, id_partido) VALUES (${idPlayer}, ${idTeam}, ${idMatch})`

  connector.query(sql, (err, result, filed) => {
    if (err) {
      console.log(err)
    }

    console.log('Partido asignado')
  })
}

module.exports = {
  assignMatch
}
