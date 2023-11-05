import mysql from 'mysql'

export const connector = mysql.createConnection(
  // {
  //   host: 'localhost',
  //   port: 3307,
  //   user: 'admin',
  //   password: 'admin',
  //   database: 'genefut_backend'
  // }

  {
    host: 'bugblegx1uvdegpxsknj-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'u7tbbx2msbtij777',
    password: 'Lom36tYgYIsNkjtOtvId',
    database: 'bugblegx1uvdegpxsknj'
  }
)

export const connection = () => {
  connector.connect(err => {
    if (err) {
      console.error('Error al conectar con la base de datos')
      process.exit(1)
    }
    console.log('La aplicación se conectó con la base de datos correctamente')
  })
}
