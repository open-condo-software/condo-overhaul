const pino = require('pino')
const baseLogger = pino({ name: 'condo-overhaul', enabled: true })

class Loggable {

    constructor ({ name = '', level = 'info' }) {
        this.logger = baseLogger.child({ module: name })
        this.logger.level = level
    }

    error (message, params = {}) {
        this.logger.error({ message, ...params })
        throw new Error(message)
    }

    info (message, params = {}) {
        this.logger.info({ message, ...params })
    }
}

module.exports = {
    baseLogger,
    Loggable,
}