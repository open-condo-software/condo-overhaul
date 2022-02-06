const { Loggable } = require('./log')
const { Client } = require('pg')
const { REFORMA_GKH_SETTINGS } = require('./constants')

class SqlController extends Loggable {

    constructor () {
        super({ name: 'sql', level: 'info' })
        this.client = new Client(process.env.DATABASE_URL)
    }

    async connect () {
        await this.client.connect()
    }

    async executeSql (sql, values) {
        return new Promise((resolve, reject) => {
            this.client.query(sql, values, (err, result) => {
                if (err) {
                    this.error(err.toString(), { sql })
                    reject(err)
                } else {
                    this.info('execute sql', { sql })
                    resolve(result)
                }
            })
        })
    }

    async createTables () {
        await this.connect()
        await this.createPropertyTable()
        await this.createOrganizationTable()
    }

    async createPropertyTable () {
        const { property: { headers, indexes } } = REFORMA_GKH_SETTINGS
        await this.executeSql(`CREATE TABLE "property" ( ${headers.map(column => column + ' text').join(', ') } );`)
        for (const index of indexes) {
            await this.executeSql(`CREATE INDEX CONCURRENTLY property_${index}_index ON property (${index})`)
        }
    }

    async createOrganizationTable () {
        const { organization: { headers, indexes } } = REFORMA_GKH_SETTINGS
        await this.executeSql(`CREATE TABLE "organization" ( ${headers.map(column => column + ' text').join(', ') } );`)
        for (const index of indexes) {
            await this.executeSql(`CREATE INDEX CONCURRENTLY organization_${index}_index ON organization (${index})`)
        }

    }

    async getOrganizationByInn (inn) {
        const { rows: [organization] } = await this.executeSql('SELECT * FROM "organization" WHERE inn = $1', [inn])
        if (!organization) {
            return {}
        }
        const { rows: properties } =  await this.executeSql('SELECT * FROM "property" WHERE management_organization_id = $1', [organization.id])
        return {
            ...organization,
            properties,
        }
    }

}

module.exports = {
    SqlController,
}