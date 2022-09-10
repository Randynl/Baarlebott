const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
	category: "general",
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('maak een ticket aan.')
		.addStringOption(options =>
			options.setName("reden")
				.setDescription("Geef een Reden mee")
				.setRequired(true)),
	async execute(client, interaction) {

		const categoryid = "1000743491200106601";

		var UserName = interaction.user.username;
		var userDiscriminator = interaction.user.discriminator;

		const reason = await interaction.options.getString("reden");

		var ticketbestaat = false;

		interaction.guild.channels.cache.forEach((channel) => {

			if (channel.name === UserName.toLowerCase() + "-" + userDiscriminator) {
				interaction.reply("Je hebt al een ticket aangemaakt");
				ticketbestaat = true;
				return;
			}

		})

		if (ticketbestaat) return;

		interaction.guild.channels.create({ name: UserName.toLowerCase() + "-" + userDiscriminator, type: ChannelType.GuildText, parent: categoryid }).then(
			(createdchan) => {
				// Perms zodat iedereen niets kan lezen.
				// LET OP het is nu PascalCase i.p.v. snake_case ook NIET camelCase.
				createdchan.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "@everyone"), {

					SendMessages: false,
					ViewChannel: false
					// SEND_MESSAGES: false,
					// VIEW_CHANNEL: false

				});

				// Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
				createdchan.permissionOverwrites.edit(interaction.user.id, {
					CreateInstantInvite: false,
					ReadMessageHistory: true,
					SendMessages: true,
					AttachFiles: true,
					Connect: true,
					AddReactions: true,
					ViewChannel: true
				});

				// Perms zodat de gebruikers die een bepaalde rol hebben alles kan zien van zijn ticket.
				createdchan.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "Support Team"), {
					CreateInstantInvite: false,
					ReadMessageHistory: true,
					SendMessages: true,
					AttachFiles: true,
					Connect: true,
					AddReactions: true,
					ViewChannel: true
				});

				var openembed = new EmbedBuilder()
					.setAuthor({ name: UserName })
					.setTitle("Nieuw ticket")
					.addFields(
						{ name: "Reden", value: reason }
					);

				createdchan.send({ embeds: [openembed] });
				interaction.reply("Ticket is aangemaakt")

			}
		).catch(err => {
			interaction.reply({ content: "❌ Er is iets fout gelopen" + err })
		});
	},
};