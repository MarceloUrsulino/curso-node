// Importa DataTypes (os tipos de dados que o Sequelize entende: STRING, INTEGER, BOOLEAN, etc.)
const { DataTypes } = require('sequelize')

// Importa a conexão com o banco (o Sequelize já configurado no conn.js)
const db = require('../db/conn')

// Define o Model 'Task', que vai virar a tabela 'tasks' no MySQL
const Task = db.define('Task', {
    
    // Coluna 'title' — armazena texto (string), pode ficar vazia (null)
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Coluna 'description' — também texto, também pode ficar vazia
     description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Coluna 'done' — pra indicar se a tarefa foi concluída ou não
     done: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

// Exporta o Model, pra poder usar (criar, buscar, editar tarefas) em outros arquivos
module.exports = Task