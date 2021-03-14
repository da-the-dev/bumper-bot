const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const schedule = require('node-schedule')
// const keepAlive = require('./server.js')
// Constants
const bumpChannelID = "819308510357618708"
// Bumpers
/**@type {Discord.Client} */
var firstClient;
const tokens = [process.env.TOKEN1, process.env.TOKEN2, process.env.TOKEN3, process.env.TOKEN4, process.env.TOKEN5, process.env.TOKEN6]

// keepAlive()
/**@type {Array<>} */
var bumpers = []

const bump = () => {
    var rand = Math.floor(Math.random() * tokens.length)
    if(bumpers[rand][1] == 's.up') {
        var randomTime = Math.random() * (3000 - 1500) + 1500
        setTimeout((bumpers, rand) => {
            var rand = Math.floor(Math.random() * tokens.length)
            console.log(rand)
            bumpers[rand][0].channel.send(bumpers[rand][1])
        }, randomTime, bumpers, rand)
        bumpers = []
        return
    }
    bumpers[rand][0].channel.send(bumpers[rand][1])
}

const checkBumps = () => {
    if(bumpers.length == tokens.length)
        bump()
}

// !like
const likeRule1 = new schedule.RecurrenceRule()
likeRule1.tz = 'Europe/London'
likeRule1.hour = 3
likeRule1.date = 1

const likeRule2 = new schedule.RecurrenceRule()
likeRule2.tz = 'Europe/London'
likeRule2.hour = 3
likeRule2.date = 15
schedule.scheduleJob(likeRule1, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('!like')
})
schedule.scheduleJob(likeRule2, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('!like')
})

// !bump
const bumpRule1 = new schedule.RecurrenceRule()
bumpRule1.tz = 'America/New_York'
bumpRule1.hour = 7
bumpRule1.date = 1
const bumpRule2 = new schedule.RecurrenceRule()
bumpRule2.tz = 'America/New_York'
bumpRule2.hour = 7
bumpRule2.date = 15
schedule.scheduleJob(bumpRule1, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('!bump')
})
schedule.scheduleJob(bumpRule2, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('!bump')
})

// s.up
const supRule1 = new schedule.RecurrenceRule()
supRule1.tz = 'Europe/Moscow'
supRule1.hour = 12
supRule1.date = 1
const supRule2 = new schedule.RecurrenceRule()
supRule2.tz = 'Europe/Moscow'
supRule2.hour = 12
supRule2.date = 15
schedule.scheduleJob(supRule1, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('s.up')
})
schedule.scheduleJob(supRule2, () => {
    firstClient.guilds.first().channels.get(bumpChannelID).send('s.up')
})

for(var i = 0; i < 6; i++) {
    var b = new Discord.Client()

    b.login(tokens[i])
        .then(c => {
            firstClient = b
        })
    b.on('ready', () => {
        console.log(`Bot bumper${i} ready`)
    })

    b.on('message', msg => {
        if(msg.content.startsWith('書 ・') && (msg.author.id == process.env.PINGERID || msg.author.id == process.env.MYID)) {
            var index = msg.content.indexOf('・') + 3
            var command = msg.content.slice(index, msg.content.length - 1)
            if(command) {
                bumpers.push([msg, command])
                console.log(bumpers)
                checkBumps()
            }
        }
    })
}