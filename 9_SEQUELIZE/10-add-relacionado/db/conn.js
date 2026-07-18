
// Importa a classe Sequelize do pacote instalado (usando desestruturação,
// já que o pacote exporta várias coisas e queremos só essa)

const { Sequelize } = require('sequelize')

// Cria uma instância do Sequelize, conectando com as configs do banco.
// Parâmetros na ordem: nome do banco, usuário, senha, e um objeto com
// configs extras (host onde o banco está, e dialect = tipo de banco usado)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-03:00' //horario do brasil 
})

// Função assíncrona (async) responsável por testar a conexão com o banco.
// Precisa ser "async" porque vamos usar "await" lá dentro
//async function conectar() {
    //try {
         // "await" pausa a execução dessa função até o Sequelize confirmar
        // (ou falhar) a autenticação com o banco de dados
       // await sequelize.authenticate()
       // console.log('Conectamos com sucesso com sequelize.')
   // }catch(err) {
         // Se der erro na conexão (senha errada, banco fora do ar, etc.),
        // cai aqui e mostra a mensagem de erro no terminal
       // console.log('Não foi possível conectar: ', err)
        
    //}
//}
// Chama a função pra ela realmente executar e testar a conexão
//conectar()

// Exporta a conexão "sequelize" pra que outros arquivos do projeto
// (ex: os Models) possam importar e usar essa mesma conexão
module.exports = sequelize
