require('dotenv').config()
const { SqlController } = require('./lib/sql')

const bootstrap = async () => {
    const sql = new SqlController()
    await sql.createTables()
}

bootstrap().then(result => {
    console.log('Tables created', result)
    process.exit(0)
}).catch(error => {
    console.error('Tables not created', error)
    process.exit(1)
})