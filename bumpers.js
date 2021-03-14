const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const keepAlive = require('./server.js')
// Bumbers
var bumpers = Array()
const tokens = [process.env.TOKEN1, process.env.TOKEN2, process.env.TOKEN3, process.env.TOKEN4, process.env.TOKEN5, process.env.TOKEN6]

// keepAlive()
/**@type {Array<>} */
const bumpers = []

const bump = () => {
    var rand = Math.floor(Math.random() * tokens.length - 1) + 0
    bumpers[rand][0].send(bumpers[rand][1])
    bumpers = []
}

const checkBumps = () => {
    if(bumpers.length = tokens.length)
        bump()
}

for(i = 0; i < 6; i++) {
    /**@type {Discord.Client} */
    var b = bumpers[i]
    b = new Discord.Client()

    b.login(tokens[i])
    b.on('ready', () => {
        console.log(`Bot bumper${i} ready`)
    })

    b.on('message', msg => {
        if(msg.content.startsWith('書 ・') && (msg.author.id == process.env.PINGERID || msg.author.id == process.env.MYID)) {
            var index = msg.content.indexOf('・') + 3
            var command = msg.content.slice(index, msg.content.length - 1)
            if(command) {
                bumpers.push([msg, command])
                checkBumps()
            }
        }
    })
}