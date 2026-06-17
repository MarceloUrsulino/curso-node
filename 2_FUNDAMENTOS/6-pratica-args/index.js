


//Módulo externo
const minimist = require('minimist') //Importa o minimist pra ler os argumentos do terminal

//Módulo interno

const soma = require('./soma').soma // Importa a função soma do arquivo soma.js

const args = minimist(process.argv.slice(2)) //Lê os argumentos do terminal de forma fácil

// Pega os valores a e b que você digitar no terminal e converte pra número inteiro
const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma (a, b) //Chama a função com os dois valores
