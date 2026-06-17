const readline = require('readline').createInterface({
    input: process.stdin, //Define de onde vem a entrada de dados → o teclado do usuário.
    output: process.stdout,  //Define onde vai a saída de dados → a tela do terminal.
})

readline.question('Qual sua linguagem favorita? ', (language) =>{
    if(language === 'Python') {
        console.log('Isso nem é linguagem')
    }else{
    console.log(`A minha linguagem favorita é: ${language}`)
   
    }
    readline.close()
})