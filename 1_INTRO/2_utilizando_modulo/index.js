const fs = require('fs') // file system // importa o file system

fs.readFile('arquivo.txt', 'utf8', (err, data) => {

    if(err){
        console.log(err)// se der erro, mostra o erro
        return
    }
    console.log(data)// se não der erro, mostra o conteúdo

})