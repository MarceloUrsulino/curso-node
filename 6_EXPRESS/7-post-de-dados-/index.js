const express = require('express')
const app = express()
const port = 3000 //variável ambiente

const path = require('path')
const basePath = path.join(__dirname, 'tamplate')

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`estamo buscando pelo usuario${id}`)
   // res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}.`)
})


app.get('/users/add', (req,res) => {
     res.sendFile(`${basePath}/index.html`)
})
app.post('/users/save', (req,res) => {

})