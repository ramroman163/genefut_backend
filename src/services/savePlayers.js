const { connector } = require('../bd/bd')

async function savePlayers (teams) {
  Object.values(teams).forEach(team => {
    team.forEach(async (player) => {
      const sql = `INSERT INTO jugadores (nombre) VALUES ("${player}")`
      await connector.query(sql, (err, result, filed) => {
        if (err) {
          console.error('Error al almacenar jugador')
        }
        console.log(`Jugador ${player} almacenado!`)
      })
    })
  })
}

module.exports = {
  savePlayers
}
