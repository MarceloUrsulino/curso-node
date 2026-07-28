const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.get('/', (re,res) =>{
    res.json({message: 'Primeira rota criada!'})
})

app.use(express.json())

app.listen(3000)