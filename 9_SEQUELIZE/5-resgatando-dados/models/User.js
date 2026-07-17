//Datatypes é um objeto que vem junto com o pacote do Sequelize, contendo todos os
// tipos de dados disponíveis pra você usar nas colunas dos seus Models — STRING, INTEGER, BOOLEAN, DATE, TEXT
const {DataTypes} = require('sequelize') 

const db = require('../db/conn')

// Cria o Model "User", que representa uma tabela no banco de dados.
// O Sequelize vai gerar automaticamente uma tabela chamada "Users" (plural)
const User = db.define('User', {
     // Campo "name" - guarda o nome do usuário
    name: {
        type: DataTypes.STRING,// tipo texto (equivale a VARCHAR no SQL puro)
        allowNull: false // campo obrigatório, não pode ficar vazio/nulo
    },
      // Campo "ocupation" - guarda a ocupação/profissão do usuário
    occupation: {
        type: DataTypes.STRING,// tipo texto
        allowNull: false // campo obrigatório (usando a sintaxe certa do Sequelize)
    },
    // Campo "newsletter" - guarda se o usuário aceita receber newsletter (true/false)
    newsletter: {
        type: DataTypes.BOOLEAN,// tipo verdadeiro/falso
         // sem allowNull, então esse campo é opcional (pode ficar vazio)
    },
})
// Exporta o Model "User", permitindo que outros arquivos do projeto
// (rotas, index.js, etc.) importem e usem métodos como User.create(), User.findAll()
module.exports = User

