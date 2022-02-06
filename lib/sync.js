const { Loggable } = require('./log')
const { SqlController } = require('./sql')
const { REFORMA_GKH_SETTINGS } = require('./constants')
const {
    createReadStream,
    unlinkSync,
    lstatSync,
    readdirSync,
} = require('fs')
const { resolve } = require('path')
const { Extract } = require('unzipper')
const download = require('download');

class Sync extends Loggable {

    constructor() {
        super({ name: 'sync', level: 'info' })
        this.client = new SqlController()
        this.downloadDir = resolve(__dirname, '../', process.env.DOWNLOAD_DIRRECTORY)
        this.pgPath = process.env.POSTGRES_PATH
        this.info('downloadDir', { downloadDir: this.downloadDir })
    }

    resolve (fileName) {
        return resolve(this.downloadDir, fileName)
    }

    async unzipFile (fileName) {
        const pathToFile = this.resolve(fileName)
        return new Promise((resolve, reject) => {
            createReadStream(pathToFile).pipe(Extract({ path: this.downloadDir }))
                .on('close', () => {
                    this.info('Extract complete', { fileName })
                    unlinkSync(pathToFile)
                    this.info('Remove zip file', { pathToFile })
                    resolve()
                })
                .on('error', (error) => {
                    this.error('Extract failed', { fileName, error })
                    reject(error)
                })
        })
    }

    async importFromCsv (type) {
        const [csv] = readdirSync(this.downloadDir)
            .filter(file => lstatSync(this.resolve(file)).isFile())
        const { [type]: { headers }} = REFORMA_GKH_SETTINGS
        const sqlDump = ` COPY ${type} (${headers.join(', ')}) FROM '${resolve(this.pgPath, csv)}' DELIMITERS ';' CSV HEADER encoding 'utf-8';`
        await this.client.executeSql(sqlDump)
        unlinkSync(this.resolve(csv))
    }

    async syncProperties () {
        const truncate = 'TRUNCATE TABLE "property";'
        await this.client.executeSql(truncate)
        const { baseUrl, property: { links } }  = REFORMA_GKH_SETTINGS
        for (const urlAdd of links) {
            await download(`${baseUrl}${urlAdd}`, this.downloadDir, { filename: `${urlAdd}.zip` })
            await this.unzipFile(`${urlAdd}.zip`)
            await this.importFromCsv('property')
        }
    }

    async syncOrganizations () {
        const truncate = 'TRUNCATE TABLE "organization";'
        await this.client.executeSql(truncate)
        const { baseUrl, organization: { links } }  = REFORMA_GKH_SETTINGS
        for (const urlAdd of links) {
            await download(`${baseUrl}${urlAdd}`, this.downloadDir, { filename: `${urlAdd}.zip` })
            await this.unzipFile(`${urlAdd}.zip`)
            await this.importFromCsv('organization')
        }
    }

    async execute () {
        await this.client.connect()
        await this.syncOrganizations()
        await this.syncProperties()
    }


}

module.exports = {
    Sync,
}