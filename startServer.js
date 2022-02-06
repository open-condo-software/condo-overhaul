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


app.set('port', PORT)

const startServer = async () => {
    await sqlController.connect()
    app.listen(app.get('port'))
}

startServer().then(result => {
    baseLogger.info('server started', { PORT })
}).catch(error => {
    baseLogger.error('server start failed', { PORT, error })
})
