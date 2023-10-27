const mysql = require('mysql')

const connector = mysql.createConnection(
  {
    host: 'localhost',
    port: 3307,
    user: 'admin',
    password: 'admin',
    database: 'genefut_backend'
  }
)

const connection = () => {
  connector.connect(err => {
    if (err) {
      console.error('Error al conectar con la base de datos')
      process.exit(1)
    }
    console.log('La aplicación se conectó con la base de datos correctamente')
  })
}

module.exports = {
  connection,
  connector
}
