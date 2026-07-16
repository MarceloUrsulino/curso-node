require('dotenv').config()

const express = require('express')
const { engine } = require('express-handlebars')
const mysql = require('mysql2')

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

    conn.query(sql, [title, pageqty], function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.get('/books', (req,res) =>{
    
    const sql =' SELECT * FROM books'

    conn.query(sql, function(err, data) {
        if(err){
            return
        }
        const books = data
        console.log(books)

        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ?`

    conn.query(sql, [id], function(err, data) {
          if(err){
            return
        }
        const book = data[0]
        res.render('book', { book })
    })
})

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('Conectou ao Mysql.')

    app.listen(3000)
})