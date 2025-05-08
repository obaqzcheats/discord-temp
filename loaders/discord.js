const fs = require('fs')
const path = require('path')
const { REST, Routes } = require('discord.js')

const { log } = require('../functions/util')
const config = require('../config.json')


module.exports = async client => {
  const commands = []
  const load = async (dir, cb) => {
    for (const folder of fs.readdirSync(path.join(__dirname, dir))) {
      const files = fs.readdirSync(path.join(__dirname, dir, folder)).filter(f => f.endsWith('.js'))
      for (const file of files) cb(require(path.join(__dirname, dir, folder, file)), client)
    }
  }

  load('../commands', (cmd, c) => {
    if (!cmd.data || !cmd.data.name || !cmd.execute || !cmd.data.description) return log('error', `invalid command ${cmd?.data?.name ? cmd.data.name : 'undefined'}`)
    c.commands.set(cmd.data.name, cmd)
    commands.push(cmd.data.toJSON())
    log('info', `loaded command ${cmd.data.name}`)
  })

  load('../events', (evt, c) => c[evt.once ? 'once' : 'on'](evt.name, (...args) => { evt.execute(...args, c); if (evt.log || evt.log === undefined) { log('info', `executed event ${evt.name}`) } else; }))

  const rest = new REST({ version: '10' }).setToken(config.token)
 if (config.debug) { await rest.put(Routes.applicationGuildCommands(config.id, config.guild), { body: commands }).then(() => log('info', `${commands.length} commands registered in guild`)).catch(console.error) }
  else { await rest.put(Routes.applicationCommands(config.id), { body: commands }).then(() => log('info', `${commands.length} commands registered globally`)).catch(error => { log('error', error) }) }
}