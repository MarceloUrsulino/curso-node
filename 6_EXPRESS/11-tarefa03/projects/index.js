const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../tamplates')

router.get('/', (req, res) => {
   res.sendFile(path.join(basePath, 'projects.html'))
})

module.exports = router