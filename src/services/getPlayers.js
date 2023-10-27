const { connector } = require('../bd/bd')

async function getPlayers (team) {
  const idsTeam = []

  await Promise.all(
    team.map(async (player) => {
      const id = await getPlayerFromDB(player)
      console.log(id[0].id)
      idsTeam.push(id[0].id)
    })
  )

  console.log(idsTeam)

  return idsTeam
}

async function getPlayerFromDB (player) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM jugadores WHERE nombre LIKE "${player}"`
    connector.query(sql, (err, result, filed) => {
      if (err) {
        console.error('Error al obtener jugador de la BD')
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getPlayers
}
