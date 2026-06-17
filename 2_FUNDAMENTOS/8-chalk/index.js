const chalk = require('chalk')

const nota = 5

if(nota >= 7){
    console.log(chalk.green('parabens'))
}else{
    console.log(chalk.bgGreen.black('Reporvado'))
}