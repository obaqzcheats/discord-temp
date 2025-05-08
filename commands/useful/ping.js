const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('sends bot latency'),
  async execute(interaction, client, /*user*/) { // how you would pass the objects to the command
    const sent = await interaction.reply({ content: 'pinging...', fetchReply: true });    // not the best way to do this, but it works for now
    await interaction.editReply(`latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`)
  }
}
