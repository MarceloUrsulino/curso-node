const http = require('http')// Importa o módulo http - já vem com o Node, não precisa instalar

// Define a porta onde o servidor vai rodar
// 3000 é uma convenção para desenvolvimento local
const port = 3000

// Cria o servidor
// Toda vez que alguém acessar, essa função é executada
// req = requisição (o que o navegador manda pro servidor)
// res = resposta (o que o servidor manda de volta pro navegador)
const server = http.createServer((req, res) => {


     // Escreve o conteúdo da resposta
    // É isso que aparece no navegador quando você acessa localhost:3000
    res.write('oi http')

    // Finaliza a resposta e manda pro navegador
    // Sem isso o navegador fica esperando para sempre
    res.end()

} )
// Liga o servidor na porta 3000
// Fica "escutando" esperando alguém acessar
server.listen(port, () => {

    // Avisa no terminal que o servidor tá rodando
    console.log(`Servidor rodando na porta: ${port}.`)
})