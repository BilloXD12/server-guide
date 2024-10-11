import { joinVoiceChannel, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import dotenv from 'dotenv';
dotenv.config();

let connection; // Variable to keep track of the voice connection

const reconnectVoiceChannel = async (client) => {
  try {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
      console.error('Guild not found');
      return;
    }

    const voiceChannel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
    if (!voiceChannel) {
      console.error('Voice channel not found');
      return;
    }

    if (connection) {
      console.log('Disconnecting previous connection');
      connection.destroy(); // Destroy the previous connection if it exists
    }

    connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('Bot has connected to the voice channel!');
    });

    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
      console.log('Disconnected from voice channel');

      try {
        if (newState.reason === 'manual' || newState.reason === 'adapter_closed') {
          console.log('Not reconnecting, reason:', newState.reason);
          return;
        }

        console.log('Attempting to reconnect...');

        // Wait for the connection to re-establish
        await entersState(connection, VoiceConnectionStatus.Connecting, 5000);
        console.log('Reconnected successfully');
      } catch (error) {
        console.error('Failed to reconnect:', error);

        // Attempt a full reconnect after a delay
        setTimeout(async () => {
          await reconnectVoiceChannel(client);
        }, 5000); // Delay to avoid spamming reconnection attempts
      }
    });

    connection.on(VoiceConnectionStatus.Signalling, () => {
      console.log('Signalling state, attempting to maintain connection...');
    });

    connection.on(VoiceConnectionStatus.Reconnecting, () => {
      console.log('Reconnecting to the voice channel...');
    });

    connection.on(VoiceConnectionStatus.Idle, () => {
      console.log('Connection is idle, attempting to reconnect...');
      reconnectVoiceChannel(client);
    });

  } catch (error) {
    console.error('Error reconnecting to voice channel:', error);
  }
};

export { reconnectVoiceChannel };
