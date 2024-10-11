import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { reconnectVoiceChannel } from './voiceHandler.js';
import { WebhookClient } from 'discord.js';
import express from 'express';
import dotenv from 'dotenv';
import {
  createWelcomeEmbed,
  createButtons,
  createGFXArtistEmbed,
  createRulesEmbed,
  createAnnouncementsEmbed,
  createPiratedStuffEmbed
} from './embeds.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates // Add this intent for voice state updates
  ],
  partials: [Partials.Channel]
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  reconnectVoiceChannel(client);

  // Array of custom status messages
  const statusMessages = [
    ' BilloXD',
    'Instagram: ig.billo',
    'Giving Server Guide',
    'dsc.gg/billoxd'
  ];

  // Function to set the custom status
  const setCustomStatus = (status) => {
    client.user.setPresence({
      activities: [{ name: status, type: 1 }], // type 0 is "Playing"
      status: 'online'
    });
  };

  // Set an initial status
  setCustomStatus(statusMessages[0]);

  // Change status every 30 seconds (30000 milliseconds)
  let index = 0;
  setInterval(() => {
    index = (index + 1) % statusMessages.length;
    setCustomStatus(statusMessages[index]);
  }, 30000);
});

client.on('guildMemberAdd', async (member) => {
  const serverGuideEmbed = createWelcomeEmbed(member);
  const buttons = createButtons();

  try {
    await member.send({
      content: `<a:welcome:1230458323237867530> **Welcome to the server** <@${member.user.id}> <a:welcome:1230458323237867530>`,
      embeds: [serverGuideEmbed],
      components: [buttons]
    });
    console.log(`Sent welcome message to ${member.user.tag}.`);

    // Send log message to webhook
    if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
      const webhookClient = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN });
      const logEmbed = new EmbedBuilder()
        .setColor('#4c0385')
        .setTitle('Member Joined')
        .setDescription(`Sent a welcome message to <@${member.user.id}>`)
        .addFields({ name: 'Message Content', value: serverGuideEmbed.description });

      await webhookClient.send({
        embeds: [logEmbed]
      });
    }
  } catch (error) {
    console.error(`Failed to send DM to <@${member.user.id}>`, error);
  }
});

// Listen to voice state updates
client.on('voiceStateUpdate', (oldState, newState) => {
  // Check if the bot is disconnected from a voice channel
  if (oldState.channelId && !newState.channelId && oldState.id === client.user.id) {
    console.log('Bot was disconnected from a voice channel, attempting to reconnect...');
    reconnectVoiceChannel(client);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const { customId } = interaction;
  let embed;

  switch (customId) {
    case 'learn_more':
      embed = createGFXArtistEmbed();
      break;

    case 'rules':
      embed = createRulesEmbed();
      break;

    case 'announcements':
      embed = createAnnouncementsEmbed();
      break;

      case 'PiratedStuff':
        embed = createPiratedStuffEmbed();
        break;

    default:
      return;
  }

  await interaction.reply({
    embeds: [embed],
    ephemeral: true // Correctly places 'ephemeral' within the options object
  });

});

client.login(process.env.BOT_TOKEN);
