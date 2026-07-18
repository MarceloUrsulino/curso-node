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
        newsletter: false
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
    const user = await User.findOne({ raw: true, where: {id: id}})

    res.render('useredit', {user})
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

conn
//.sync()
.sync({force: true})
.then(() =>{
    app.listen(3000)
}).catch(err =>{
    console.log(err)
})