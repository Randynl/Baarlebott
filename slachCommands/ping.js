const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: "Information",
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Antwoord met Pong!'),
	async execute(client, interaction) {
		await interaction.reply('Pong!');
	},
};