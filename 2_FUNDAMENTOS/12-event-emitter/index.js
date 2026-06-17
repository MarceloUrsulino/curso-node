const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('Start', () => {
    console.log('Durante')
})

console.log('Antes')
eventEmitter.emit('Start')
console.log('Depois')