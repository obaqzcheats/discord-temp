const { EmbedBuilder, ChannelType } = require('discord.js');

const { log } = require('../../functions/util');
const config = require('../../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    log('info', `logged in as ${client.user.username} / ${client.user.id} - ${client.guilds.cache.size} guilds`);
  }
}
