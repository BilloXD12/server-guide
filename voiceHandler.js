import { joinVoiceChannel, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import dotenv from 'dotenv';
dotenv.config();

let connection; // Keep track of the voice connection

const reconnectVoiceChannel = async (client) => {
  try {
    // Fetch the guild instead of getting it from the cache
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    if (!guild) return console.error('Guild not found');

    const voiceChannel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);
    if (!voiceChannel) return console.error('Voice channel not found');

    if (!guild.voiceAdapterCreator) {
      console.error('Voice adapter creator is undefined. Cannot join voice channel.');
      return;
    }

    // Ensure proper cleanup before reconnecting
    if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
      console.log('Disconnecting previous connection');
      connection.destroy();
    }

    // Join the voice channel
    connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('✅ Bot has connected to the voice channel!');
    });

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      console.log('⚠️ Disconnected from voice channel. Attempting to reconnect...');
      try {
        await entersState(connection, VoiceConnectionStatus.Connecting, 5000);
        console.log('✅ Reconnected successfully');
      } catch (error) {
        console.error('❌ Failed to reconnect, retrying in 5 seconds:', error);
        setTimeout(() => reconnectVoiceChannel(client), 5000);
      }
    });

    connection.on(VoiceConnectionStatus.Reconnecting, () => {
      console.log('🔄 Reconnecting to the voice channel...');
    });

    connection.on(VoiceConnectionStatus.Idle, () => {
      console.log('🕛 Connection is idle, attempting to reconnect...');
      reconnectVoiceChannel(client);
    });

  } catch (error) {
    console.error('❌ Error reconnecting to voice channel:', error);
  }
};

export { reconnectVoiceChannel };
