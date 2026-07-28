const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


app.get('/', (re,res) =>{
    res.json({message: 'Primeira rota criada!'})
})

app.post('/createproduct', (req,res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    res.json({message: `O produto ${name} foi cadastrado com sucesso.`})

})



app.listen(3000)