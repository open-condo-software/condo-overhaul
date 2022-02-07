require('dotenv').config()
const { baseLogger } = require('./lib/log')
const express = require('express')
const app = express()
const { SqlController } = require('./lib/sql')
const PORT = process.env.PORT

const sqlController = new SqlController()


app.get('/api/organization/:inn', async (req, res, next) => {
    const result = await sqlController.getOrganizationByInn(req.params['inn'])
    res.json(result)
})

app.get('/api/property/:fiasId', async (req, res, next) => {
    const result = await sqlController.getPropertyByFiasId(req.params['fiasId'])
    res.json(result)
})


const startServer = async () => {
    await sqlController.connect()
    app.set('port', PORT)
    app.listen(PORT)
}

startServer().then(result => {
    baseLogger.info({ message: 'server started', PORT }, )
}).catch(error => {
    baseLogger.error({ message: 'server start failed', PORT, error })
})
