const { connector } = require('../bd/bd')

async function saveTeams (name, date, user) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO equipos (nombre, fecha_creacion, id_usuario) VALUES ("${name}", "${date}", ${user})`

    connector.query(sql, (err, result, filed) => {
      if (err) {
        console.error('Error almacenando el equipo')
        reject(err)
      }
      console.log(result)
      console.log(`Equipo ${name} almacenado`)

      resolve(result.insertId)
    })
  })
}

module.exports = {
  saveTeams
}
