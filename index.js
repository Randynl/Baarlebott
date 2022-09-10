const { Client, GatewayIntentBits, Routes, Collection, AuditLogEvent, EmbedBuilder } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("node:fs");
const { REST } = require('@discordjs/rest');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const slachCommands = [];

client.once("ready", () => {
	console.log(`${client.user.username} is now connected`);

	let guildid = botConfig.guildId;
	let clientid = botConfig.clientId;
	let token = botConfig.token;


	const rest = new REST({ version: 10 }).setToken(token);

	rest.put(Routes.applicationGuildCommands(clientid, guildid), { body: slachCommands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

});



const commandsPath = path.join(__dirname, 'slachCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);

	slachCommands.push(command.data.toJSON());
	console.log(`De file ${command.data.name}.js is Geladen ✔️`)
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.token)