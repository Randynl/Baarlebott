const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	category: "Information",
	data: new SlashCommandBuilder()
		.setName('bug')
		.setDescription('Geef een bug mee')
        .addStringOption(Option =>
            Option.setName("bug")
                .setDescription("Geef een bug mee")
                .setRequired(true)),
	async execute(client, interaction) {
        
        var bug = interaction.options.getString("bug")
        var UserName = interaction.user.username;


        var Suggestieembed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`Bug: ${bug} \n \n Verzonden door: ${UserName}`)
        .setTimestamp();

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "❗bug’s").send({ embeds: [Suggestieembed] })

		await interaction.reply({ content: 'Jouw Bug is verzonden', ephemeral: true });

	},
};