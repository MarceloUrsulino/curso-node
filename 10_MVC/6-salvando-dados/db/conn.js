const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-03:00' //horario do brasil 
})

async function conectar() {
    

     try {
        await sequelize.authenticate()
        console.log('Conectamos com sucesso com sequelize!')
            
    } catch (error) {
        console.log(`Não foi possível conectar: ${error}`)
    }
}
conectar()

module.exports= sequelize