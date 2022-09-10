const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: "Moderation",
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unban een Gebruiker')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(Option =>
            Option.setName('id')
                .setDescription("Geef een id mee")
                .setRequired(true)),
    async execute(client, interaction) {

        let id = await interaction.options.getString("id")

        let member;

        let bans = await interaction.guild.bans.fetch();

        if(bans.has(id)) member = bans.get(id);
        else return interaction.reply("Deze gebruiker is niet verbannen.");

        await interaction.guild.members.unban(id);


        var banembed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`**Gebruiker:** ${member.user.tag} (${member.user.id})\n**Actie:** Unban`)
            .setTimestamp();

        interaction.reply(`${member.user.tag} is niet meer verbannen.`);

        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "logs").send({embeds: [banembed] })

    },
};