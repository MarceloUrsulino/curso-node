// Importa o Model 'Task' (que representa a tabela de tarefas no banco).
// Ainda não é usado nesse trecho, mas vai servir pra criar/buscar tarefas
// em outras funções desse mesmo Controller (ex: salvar no banco, listar tudo)
const Task = require('../models/Task')


// Cria uma CLASSE chamada TaskController, e já exporta ela nesse mesmo momento.
// Uma classe funciona como uma "caixa" que agrupa várias funções relacionadas
// — nesse caso, tudo que tem a ver com o controle de tarefas (criar, editar, listar...)
module.exports = class Taskcontroller{

     // Método ESTÁTICO chamado 'createTask'.
    // 'static' permite chamar TaskController.createTask(...) diretamente,
    // sem precisar fazer "new TaskController()" antes
    // 'req' = o que o navegador/usuário está pedindo (requisição)
    // 'res' = o que você vai devolver pro navegador (resposta)
    static createTask(req,res){

        // Renderiza (mostra na tela) o arquivo views/tasks/create.handlebars
        // Ou seja: quando essa função for chamada, o usuário vai ver
        // a página com o formulário de criação de tarefa
        res.render('tasks/create')

       
    
    }
       static showTasks(req,res){
        res.render('tasks/all')

    }
}