require('dotenv').config()
const { Sync } = require('./lib/sync')

const bootstrap = async () => {
    const sync = new Sync()
    await sync.execute()
}

bootstrap().then(result => {
    console.log('Data updated', result)
    process.exit(0)
}).catch(error => {
    console.error('Data not updated', error)
    process.exit(1)
})