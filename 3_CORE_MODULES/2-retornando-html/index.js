const http = require('http')// Importa o módulo http - já vem com o Node, não precisa instalar


const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1> Olá este é meu primeiro server html<h1/>')

} )

server.listen(port, () => {

   
    console.log(`Servidor rodando na porta: ${port}.`)
})