const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	category: "Information",
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Geeft Info!'),
	async execute(client, interaction) {
		let date = new Date(interaction.member.joinedTimestamp);

		const botEmbed = new EmbedBuilder()
			.setTitle('Geeft Info')
			.setDescription('Beschrijving')
			.setColor("Blue")
			.addFields(
				{ name: "Bot naam:", value: client.user.username },
				{ name: "je bent de server gejoind", value: date.toLocaleDateString() },

				{name: "Members", value: interaction.guild.memberCount.toString() },

			)
			.setTimestamp()
			.setAuthor({ name: interaction.member.user.username });

		await interaction.reply({ embeds: [botEmbed] });
	},
};