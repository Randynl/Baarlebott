const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: "Moderation",
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Sluit een ticket')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(client, interaction) {

        const categoryid = "1000743491200106601";

        if (interaction.channel.parentId == categoryid) {
            interaction.channel.delete();
        } else {
            await interaction.reply("Dit kan enkel in een ticket sukkel.")
            return
        }

        var embed = new EmbedBuilder()
            .setTitle("Ticket " + interaction.channel.name + " gesloten")
            .setDescription("Het ticket is gesloten")
            .setTimestamp();

        var ticketChannel = interaction.member.guild.channels.cache.find(channel => channel.name === "logs");
        if (!ticketChannel) interaction.reply({ content: "Kanaal bestaat niet!" });

        ticketChannel.send({ embeds: [embed] });

    },
};