const inquirer = require("inquirer")

inquirer.prompt([{
    name: 'p1', 
    message: 'qual a nota?'
}, {
    name: 'p2',
    message: 'qual a segunda nota?',
   }
]).then((answers => {
    console.log(answers)
}
)).catch(err => console.log(err))