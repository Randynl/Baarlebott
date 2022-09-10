const { SlashCommandBuilder, EmbedBuilder, discordSort, GuildMessageReactions, messageLink } = require('discord.js');

module.exports = {
    category: "Information",
    data: new SlashCommandBuilder()
        .setName('suggestie')
        .setDescription('Geef een suggestie')
        .addStringOption(Option =>
            Option.setName("suggestie")
                .setDescription("Geef een suggestie mee")
                .setRequired(true)),
    async execute(client, interaction) {
        
        var suggestie = interaction.options.getString("suggestie")
        var UserName = interaction.user.username;


        var Suggestieembed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`Suggestie ${suggestie} \n \n Verzonden door: ${UserName}`)
        .setTimestamp();

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "❓suggestie’s").send({ embeds: [Suggestieembed] })
       
        await interaction.reply({ content: 'Jouw suggestie is verzonden', ephemeral: true });


        // interaction.reply("⚠️ Commando niet uitproberen");




    },
};