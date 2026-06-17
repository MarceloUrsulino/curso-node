// Importa o inquirer - biblioteca para fazer perguntas no terminal
const inquirer = require('inquirer')
// Importa o chalk - biblioteca para colorir texto no terminal
const chalk = require('chalk')

// Inicia as perguntas - prompt recebe um array de objetos
// cada objeto é uma pergunta
inquirer.prompt([
    // Pergunta 1 - name é o identificador, message é o que aparece no terminal
    {name: 'nome', message: 'Qual seu nome?'},

    // Pergunta 2
    {name: 'idade', message: 'Qual sua idade?'},

    // .then() executa quando o usuário responder tudo
]).then((answers) => {

    // answers é um objeto com as respostas do usuário
    // answers.nome → resposta da pergunta 'nome'
    // answers.idade → resposta da pergunta 'idade'
    const response = `O nome do usuário é: ${answers.nome} e ele tem ${answers.idade} anos!`

     // Imprime a resposta com fundo amarelo e texto preto
    console.log(chalk.bgYellow.black(response))
})
// .catch() captura qualquer erro que acontecer e mostra no terminal
.catch((err) => console.log(err))
