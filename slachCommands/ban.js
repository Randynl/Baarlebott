const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: "Moderation",
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban een Gebruiker')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(Option =>
            Option.setName("user")
                .setDescription("Geef een gebruiker mee")
                .setRequired(true))
        .addStringOption(Option =>
            Option.setName("reden")
                .setDescription("Geef een Reden mee")
                .setRequired(true)),
    async execute(client, interaction) {

        let member = interaction.options.getMember("user");

        let reason = await interaction.options.getString("reden");
        Alles

        await member.send(`**Baarle Roleplay**\n Je bent verbannen van onze server. \n\n **Reden:** ${reason}`).catch(() => {
            interaction.channel.send("Deze persoon heeft zijn privé berichten niet aanstaan.")
        });

        
        var UserName = interaction.user.username;

        await member.ban({ days: 0, reason: reason });

        var banembed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`**Gebruiker:** ${member.user.tag} (${member.user.id})\n**Actie:** Ban \n **Reden:** ${reason}\n Verbannen door ${UserName}`)
            .setTimestamp();

        interaction.reply(`${member.user.tag} is Verbannen.`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "logs").send({embeds: [banembed] })

    },
};