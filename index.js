const { Client, GatewayIntentBits, Events, REST, Collection, Routes, IntentsBitField, ActivityType } = require('discord.js');

const config = require('./config.json')
const { log } = require('./functions/util')

console.clear()
console.log(`
        \x1b[1;35mdiscord.gg/\x1b[1;37m discord \x1b[1;35m| \x1b[1;37m name of project 
`)

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences,       // you dont need all of these intents, but i added them just in case for other stuff i wanted to do
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildInvites
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
    presence: { activities: [{ name: '/crashing ot', type: ActivityType.Watching }], status: 'online' }, // status can be 'online', 'idle', 'dnd', 'invisible'
    failIfNotExists: true,
    http: { api: 'https://discord.com/api/v10', version: 'v10' },
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
    closeTimeout: 30000
});

client.commands = new Collection()

require('./loaders/discord')(client)
// require('./loaders/database') // no mongo db connection applyed


client.login(config.token).catch(error => {switch (true) { case error.message.includes("An invalid token was provided"): case error.message.includes("Expected token to be set for this request, but none was present."): log('error', 'invalid token'); break; }})
