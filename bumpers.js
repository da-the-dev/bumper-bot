const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const keepAlive = require('./server.js')
// Bumbers
var bumpers = Array()
const tokens = [process.env.TOKEN1, process.env.TOKEN2, process.env.TOKEN3, process.env.TOKEN4, process.env.TOKEN5, process.env.TOKEN6]

keepAlive()

for (i = 0; i < 6; i++) {
  /**@type {Discord.Client} */
  var b = bumpers[i]
  b = new Discord.Client()

  b.login(tokens[i])
  b.on('ready', () => {
    console.log(`Bot bumper${i} ready`)
  })

  b.on('message', msg => {
    if (msg.content.startsWith('書 ・') && (msg.author.id == process.env.PINGERID || msg.author.id == process.env.MYID)) {
      var index = msg.content.indexOf('・') + 3
      var command = msg.content.slice(index, msg.content.length - 1)
      if (command)
        msg.channel.send(command)
    }
  })
}