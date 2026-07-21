// Carrega as variáveis de ambiente do arquivo .env (DB_NAME, DB_USER, etc.)
// Precisa vir ANTES de qualquer código que use process.env
require('dotenv').config()

// Importa a biblioteca Express (framework pra criar o servidor web)
const express = require('express')

// Importa a biblioteca express-handlebars (template engine)
const exphbs = require('express-handlebars')

// Cria a aplicação Express de fato 
const app = (express)

// Importa a conexão com o banco de dados (arquivo /db/conn.js)
const conn = require('/db/conn')

// Registra o Handlebars como motor de views, usando a config padrão do exphbs()
app.engine('handlebars', exphbs())

// Define 'handlebars' como o motor de views padrão da aplicação
// (assim, res.render('nome') já sabe procurar um arquivo .handlebars)
app.set('view engine', 'handlebars') 

// Middleware que permite ler dados enviados por formulários HTML (POST)
// extended:true permite enviar objetos/arrays mais complexos no formulário
app.use(
    express.urlencoded({
        extended:true
    })
)
// Middleware que permite ler dados enviados no formato JSON
// (necessário pra receber JSON no corpo de requisições, ex: de uma API)
app.use(express.json())

// Middleware que libera acesso público a arquivos da pasta 'public'
// (CSS, imagens, JS do front-end ficam acessíveis direto pelo navegador)
app.use(express.static('public'))

// Inicia o servidor, deixando ele "escutando" requisições na porta 3000
app.listen(3000)