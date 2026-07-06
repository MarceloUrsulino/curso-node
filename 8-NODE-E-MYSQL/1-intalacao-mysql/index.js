require('dotenv').config()

const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
}) 

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})