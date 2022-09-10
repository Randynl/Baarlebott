const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: "Moderation",
    data: new SlashCommandBuilder()
        .setName('training')
        .setDescription('Maak een training aan')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(Option =>
            Option.setName("host")
                .setDescription("Geef een host mee")
                .setRequired(true))
        .addUserOption(Option =>
            Option.setName("cohost")
                .setDescription("Geef een cohost mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("eenheid")
                .setDescription("Geef een eenheid mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("type")
                .setDescription("Geef het type mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("datum")
                .setDescription("Geef De datum mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("tijd")
                .setDescription("Geef een tijd mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("opmerking")
                .setDescription("Geef informatie mee")
                .setRequired(true)),

    async execute(client, interaction) {

        let host = interaction.options.getMember("host");

        let eeneheid = interaction.options.getString("eenheid")

        let cohost = interaction.options.getMember("cohost");

        let type = await interaction.options.getString("type");
        
        let datum = await interaction.options.getString("datum");


        let tijd = await interaction.options.getString("tijd");

        let opmerking = await interaction.options.getString("opmerking");




        var trainingembed = new EmbedBuilder()
            .setColor("Aqua")
            .setDescription(`**Training ${eeneheid} ** \n \n**Host:** ${host} \n \n **Cohost:** ${cohost} \n \n  **Type:** ${type} \n \n **Tijd:** ${tijd} \n \n **Datum:** ${datum} \n \n  **Opmerking:** ${opmerking}`)
            .setTimestamp();

        interaction.reply(`Jouw training is sucsessvol verzonden`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "training").send({ embeds: [trainingembed] })

    },
};