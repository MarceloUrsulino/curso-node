const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation()
function operation(){
    inquirer.prompt([
        {   
            type: 'list',
            name:'action',
            message:'O que você deseja fazer ?',
            choices: ['Adicionar', 'Listar pendentes', 'Marcar como visto', 'Remover', 'Sair']
        }
    ]).then((answer) => {
        const action = answer['action']

        if(action === 'Adicionar'){
            add()

        }else if(action === 'Listar pendentes'){
            pending()

        }else if(action === 'Marcar como visto'){
            visa()

        }else if(action === 'Remover'){
            remove()

        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Até mais!'))
            process.exit()
        }
    })
    .catch((err) => console.log(err))
}

// creating add

function add(){
    inquirer.prompt([
        {
            name:'movieName',
            message:'Qual filme você deseja adicionar?',
        }
    ]).then((answer) => {
        const movieName = answer['movieName']

        if(!fs.existsSync('movies')){
            fs.mkdirSync('movies')
        }
        if(fs.existsSync(`movies/${movieName}.json`)){
            console.log(chalk.bgRed.black('Esse filme já está na lista!'))
            return add()
        }
        fs.writeFileSync(`movies/${movieName}.json`, '{"watched": false}', )
        
        console.log(chalk.bgBlue(`Seu filme ${movieName}, foi adicionado na sua lista.`))
        operation()

    })
    .catch((err) => console.log(err))

}

// creating pending

function pending(){
    const files = fs.readdirSync('movies')

    files.forEach((file) => {
        const movieJSON = fs.readFileSync(`movies/${file}`, {
            encoding: 'utf-8',
            flag:'r'
        })
         const movieData = JSON.parse(movieJSON)

         if(movieData.watched === false){
            console.log(file.replace('.json', ''))
         }
   })
    operation()
} 

//check visa 

function visa(){
    inquirer.prompt([
        {
            name: 'movieName',
            message:'Qual filme você deseja marcar como visto?',
        }
    ]).then((answer) => {
        const movieName = answer['movieName']
       
        if(!checkmovie(movieName)){
             return visa()
        }

        const movieData = getMovie(movieName)
        movieData.watched = true
        fs.writeFileSync(`movies/${movieName}.json`, JSON.stringify(movieData))
        console.log(chalk.green(`O filme ${movieName} foi marcado como visto!`))
        operation()

        })
        .catch(err => console.log(err))
}
//verify exists
function checkmovie(movieName){
    if(!fs.existsSync(`movies/${movieName}.json`)){
        console.log(chalk.bgRed.black('Esse filme não existe na sua lista!'))
        return false
    }
    return true
}


function getMovie(movieName){
    const movieJSON = fs.readFileSync(`movies/${movieName}.json`,{
        encoding:'utf-8',
        flag:'r'
    })
    return JSON.parse(movieJSON)
}

// function remove

function remove(){
    inquirer.prompt([
        {
            name:'movieRemove',
            message:'Qual filme você deseja remover?',
        }
    ]).then((answer) =>{

        const movieRemove = answer['movieRemove']

        if(!checkmovie(movieRemove)){
             return remove()
        }
        fs.unlinkSync(`movies/${movieRemove}.json`)
            console.log(chalk.bgBlue(`O filme ${movieRemove} foi removido da sua lista.`))
        
        operation()
    })
    .catch(err => console.log(err))
}








