require('dotenv').config()

const express = require('express')
const { engine } = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/users/create', (req,res) => {
    res.render ('adduser')
})

app.post('/users/create', async (req, res) =>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter == 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    console.log(req.body)
    await User.create({name, occupation, newsletter})
    res.redirect('/')
})

app.get('/users/:id', async (req,res) =>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id} })

    res.render('userview', {user})
})

app.post('/users/delete/:id', async (req,res) =>{
    
    const id =  req.params.id
    await User.destroy({where: {id: id}})

    res.redirect('/')
})

app.get('/users/edit/:id', async (req,res) =>{
    
    const id =  req.params.id
   try {

     const user = await User.findOne({ include: Address, where: {id: id}})
     

     res.render('useredit', {user: user.get({plain: true })})
    
   } catch (error) {
    console.log(error)
    
   }
})
// Cria uma rota POST para atualizar um usuário existente
// "async" é necessário porque vamos usar "await" dentro da função
app.post('/users/update/', async (req,res) => {
     // Pega os valores enviados pelo formulário (req.body)
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    // "let" porque esse valor vai ser reatribuído logo abaixo
    // (checkbox envia 'on' quando marcado, ou undefined quando desmarcado)
    let newsletter = req.body.newsletter
   // Converte o valor do checkbox para um booleano de verdade (true/false),
    // já que o banco espera um BOOLEAN, não a string 'on'
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    // Monta um objeto com todos os dados já tratados,
    // pronto para ser usado na atualização do banco
    const userData = {
        id,
        name,   
        occupation,
        newsletter
        
    }
    // Usa o método update do Sequelize para atualizar o registro no banco.
    // Primeiro parâmetro: os novos dados (userData)
    // Segundo parâmetro: a condição de qual registro atualizar (where id = id)
    // "await" pausa a execução até o Sequelize confirmar que salvou no banco
    await User.update(userData, { where: {id: id }})

     // Depois de atualizar, redireciona o usuário de volta para a página inicial
    res.redirect('/')
})

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    console.log(users)

    res.render('home', {users: users})
}) 

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId,
        street,
        number,
        city,
    }
    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)

})

app.post('/address/delete/', async (req,res) =>{
    const id = req.body.id
    const UserId = req.body.UserId

    await Address.destroy({
        where: {id: id}
    })
    res.redirect(`/users/edit/${UserId}`)
})
conn
.sync()
//.sync({force: true})
.then(() =>{
    app.listen(3000)
}).catch(err =>{
    console.log(err)
})






// Carrega as variáveis de ambiente do arquivo .env (host, senha, etc.)
require('dotenv').config()

// Importa o framework Express, usado para criar o servidor
const express = require('express')

// Importa o motor de templates Handlebars (desestruturado do pacote)
const { engine } = require('express-handlebars')

// Importa a conexão com o banco já configurada em db/conn.js
const conn = require('./db/conn')

// Importa os Models (representações das tabelas do banco)
const User = require('./models/User')
const Address = require('./models/Address')

// Cria a aplicação Express
const app = express()

// Middleware que permite ler dados enviados por formulários HTML (req.body)
app.use(
    express.urlencoded({
        extended: true
    })
)
// Middleware que permite ler dados enviados em formato JSON
app.use(express.json())


// Registra o motor Handlebars no Express
app.engine('handlebars', engine())
// Define o Handlebars como motor de views padrão
app.set('view engine', 'handlebars')
// Permite servir arquivos estáticos (CSS, imagens) da pasta "public"
app.use(express.static('public'))

// Rota GET que exibe o formulário de cadastro de usuário
app.get('/users/create', (req,res) => {
    res.render ('adduser')
})

// Rota POST que recebe os dados do formulário e cria um novo usuário
app.post('/users/create', async (req, res) =>{
    // Pega os valores enviados pelo formulário
    const name = req.body.name
    const occupation = req.body.occupation
    // "let" porque o valor será reatribuído logo abaixo
    let newsletter = req.body.newsletter

    // Converte o valor do checkbox ('on' ou undefined) para um booleano real
    if(newsletter == 'on'){
        newsletter = true
    }else{
        newsletter: false
      
    }
    // Mostra no terminal os dados recebidos, útil para debug
    console.log(req.body)
    // Cria o usuário no banco com os dados tratados
    await User.create({name, occupation, newsletter})
    // Redireciona de volta para a página inicial
    res.redirect('/')
})

// Rota GET que busca e exibe os detalhes de UM usuário específico
app.get('/users/:id', async (req,res) =>{
    // Pega o "id" que veio na URL (ex: /users/3 → id = "3")
    const id = req.params.id

    // Busca no banco o usuário com esse id
    // "raw: true" faz o Sequelize devolver um objeto JS puro,
    // em vez de uma instância "cheia" do Sequelize
    const user = await User.findOne({raw: true, where: {id: id} })

    // Renderiza a view "userview", passando o usuário encontrado
    res.render('userview', {user})
})

// Rota POST que apaga um usuário pelo id
app.post('/users/delete/:id', async (req,res) =>{
    
    const id =  req.params.id
    // Remove do banco o registro com esse id
    await User.destroy({where: {id: id}})

    // Redireciona de volta para a página inicial
    res.redirect('/')
})

// Rota GET que exibe o formulário de edição de um usuário,
// já trazendo os endereços relacionados a ele
app.get('/users/edit/:id', async (req,res) =>{
    
    const id =  req.params.id
   try {
     // Busca o usuário E também os endereços relacionados (via "include")
     const user = await User.findOne({ include: Address, where: {id: id}})
     
     // Renderiza a view de edição, convertendo o resultado
     // para um objeto JS puro (equivalente ao "raw: true" acima,
     // mas usado quando já se tem uma instância do Sequelize)
     res.render('useredit', {user: user.get({plain: true })})
    
   } catch (error) {
    // Se der erro (ex: usuário não encontrado), mostra no terminal
    console.log(error)
    
   }
})

// Cria uma rota POST para atualizar um usuário existente
// "async" é necessário porque vamos usar "await" dentro da função
app.post('/users/update/', async (req,res) => {
     // Pega os valores enviados pelo formulário (req.body)
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    // "let" porque esse valor vai ser reatribuído logo abaixo
    // (checkbox envia 'on' quando marcado, ou undefined quando desmarcado)
    let newsletter = req.body.newsletter
   // Converte o valor do checkbox para um booleano de verdade (true/false),
    // já que o banco espera um BOOLEAN, não a string 'on'
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    // Monta um objeto com todos os dados já tratados,
    // pronto para ser usado na atualização do banco
    const userData = {
        id,
        name,   
        occupation,
        newsletter
        
    }
    // Usa o método update do Sequelize para atualizar o registro no banco.
    // Primeiro parâmetro: os novos dados (userData)
    // Segundo parâmetro: a condição de qual registro atualizar (where id = id)
    // "await" pausa a execução até o Sequelize confirmar que salvou no banco
    await User.update(userData, { where: {id: id }})

     // Depois de atualizar, redireciona o usuário de volta para a página inicial
    res.redirect('/')
})

// Rota GET que exibe a página inicial, listando todos os usuários
app.get('/', async (req, res) => {

    // Busca todos os usuários cadastrados no banco
    const users = await User.findAll({raw: true})
    // Mostra no terminal, útil para debug
    console.log(users)

    // Renderiza a home, passando a lista de usuários
    res.render('home', {users: users})
}) 

// Rota POST que cadastra um novo endereço, associado a um usuário
app.post('/address/create', async (req, res) => {
    // Pega os valores enviados pelo formulário
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    // Monta o objeto do endereço, incluindo o UserId
    // (chave estrangeira que conecta esse endereço ao usuário dono)
    const address = {
        UserId,
        street,
        number,
        city,
    }
    // Cria o endereço no banco
    await Address.create(address)

    // Redireciona de volta para a página de edição daquele usuário específico
    res.redirect(`/users/edit/${UserId}`)

})

// Rota POST que apaga um endereço específico
app.post('/address/delete/', async (req,res) =>{
    const id = req.body.id
    const UserId = req.body.UserId

    // Remove do banco o endereço com esse id
    await Address.destroy({
        where: {id: id}
    })
    // Redireciona de volta para a página de edição daquele usuário
    res.redirect(`/users/edit/${UserId}`)
})

// Sincroniza o Sequelize com o banco (cria as tabelas se não existirem)
conn
.sync()
//.sync({force: true})  // ← comentado: se ativado, apagaria e recriaria tudo
.then(() =>{
    // Só depois que o banco estiver sincronizado, inicia o servidor na porta 3000
    app.listen(3000)
}).catch(err =>{
    // Se der erro na sincronização, mostra no terminal
    console.log(err)
})