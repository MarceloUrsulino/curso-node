const express = require('express')
const app = express()

app.request(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.listen(3000)