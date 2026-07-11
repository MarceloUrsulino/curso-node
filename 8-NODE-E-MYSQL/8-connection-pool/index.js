require('dotenv').config()

const express = require('express')
const { engine } = require('express-handlebars')
const pool = require('./db/conn')

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

app.get('/', (req, res) => {
    res.render('home')
}) 


app.post('/books/insertbooks', (req,res) =>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql =` INSERT INTO books (title, pageqty) VALUES (?, ?)`

    pool.query(sql, [title, pageqty], function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.get('/books', (req,res) =>{
    
    const sql =' SELECT * FROM books'

    pool.query(sql, function(err, data) {
        if(err){
            return
        }
        const books = data
        console.log(books)

        res.render('books', {books})
    })
})


 app.listen(3000)