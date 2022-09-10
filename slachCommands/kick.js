const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: "Moderation",
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick een Gebruiker')
        .setDefaultMemberPermissions(PermissionFlagsBits.kickMembers)
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

        await member.send(`**Baarle Roleplay**\n Je bent Gekickd van onze server. \n\n **Reden:** ${reason}`).catch(() => {
            interaction.channel.send("Deze persoon heeft zijn privé berichten niet aanstaan.")
        });

        var UserName = interaction.user.username;

        
        await member.kick()

        var kickembed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`**Gebruiker:** ${member.user.tag} (${member.user.id})\n**Actie:** kick \n **Reden:** ${reason}\n Gekickd door ${UserName}`)
            .setTimestamp();

        interaction.reply(`${member.user.tag} is Gekickd.`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "logs").send({embeds: [kickembed] })

    },
};