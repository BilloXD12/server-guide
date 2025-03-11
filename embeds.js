import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

export const createWelcomeEmbed = (member) => {
  return new EmbedBuilder()
    .setColor('#4c0385')
    .setTitle('Welcome to Our Server!')
    .setDescription('*We are glad to have you here. Below are some useful links and Server guide to help you get started.*\n **Make Sure you have ticked on *__Show All Channels__* from server Settings**')
    .addFields(
      { name: '<a:speaker1:1222699233245925386> Server Announcement', value: '*Make sure to check out <#1260682416398270465> for server announcement.*' },
      { name: '💬 General Chat', value: '*Feel free to join the general chat <#1260682277256691793> and introduce yourself!*' },
      { name: '<:cryingcat:1279519928696832000> Special Role', value: '*We have special roles which you can apply for according to your requirement <#1319632659303104624>*' },
      { name: '<a:utility:1241028673797099520> **Server Guide**', value: '*__Below are some buttons click on your desired button to get to know more about server__*' }
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setImage('https://media.discordapp.net/attachments/1260518295363260466/1260972790337769523/standard_4.gif?ex=66ad9c2c&is=66ac4aac&hm=1958a3a57338f1e149416716e9da5fdb5ad0e6127b23b8577354dee2e75a0dc8&=')
    .setFooter({ text: 'We hope you have a great time!' });
};

export const createButtons = () => {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rules')
      .setLabel('Editing Stuff')
      .setEmoji('<a:verify:1225740922382319666>')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('learn_more')
      .setLabel('GFX Artist')
      .setEmoji('<:Photoshop:1268915647555960872>')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('announcements')
      .setLabel('3D/VFX Assets')
      .setEmoji('<:blenderlogo:1268943806594682891>')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('PiratedStuff')  // Set your custom ID here
      .setLabel('Pirated Stuff')     // Set the label for the new button
      .setEmoji('<a:games:1277312861131116565>')
      .setStyle(ButtonStyle.Secondary) // Choose the button style
  );
};

export const createGFXArtistEmbed = () => {
  return new EmbedBuilder()
    .setColor('#4c0385')
    .setTitle('**GFX Artist?**')
    .setDescription('*Here’s more information about our server related to GFX Artist*')
    .addFields(
      { name: '<a:bullet:1255787106857648189> **GFX Packs**', value: '*Check out our* **__GFX Packs__** *in <#1260682307547697223> to get started with your GFX Artist journey.*' },
      { name: '<a:bullet:1255787106857648189> **Photoshop Brushes**', value: '*Check out Photoshop Brushed in <#1262688067601301504>, We have* **__100+ Photoshop Brushes__** *to choose from.*' },
       { name: '<a:bullet:1255787106857648189> **Mockups**', value: '*We got mockups to showcase your design on it <#1285594856839974942>*' },
      { name: '<a:bullet:1255787106857648189> **More items**', value: '*Thumbnails packs coming soon.*' }
    )
    .setFooter({ text: 'We hope you have a great time doing GFX!' });
};

export const createRulesEmbed = () => {
  return new EmbedBuilder()
    .setColor('#4c0385')
    .setTitle('**Wants Free Editing Stuff?**')
    .setDescription('*We have a lot of free stuff that could help you in your editing journey*')
    .addFields(
      { name: '<a:bullet:1255787106857648189> **Softwares**', value: '*We have all basic* **ADOBE** *softwares for **__MAC__** and **__WINDOWS__** both, including other editing softwares and their latest versions in <#1287456490575237250>*' },
      { name: '<a:bullet:1255787106857648189> **Plugins**', value: '*We have almost all the plugins for* **_Adobe_** *softwares in <#1287457718638219409>, you can also request the plugins*' },
      { name: '<a:bullet:1255787106857648189> **Mega Editing Packs**', value: '*We have a lot of* **__MEGA EDITING PACKS__** *by famous YouTubers in <#1262629123969384520>*' },
      { name: '<a:bullet:1255787106857648189> **Overlays**', value: '*We have* **__WIDE COLLECTION OF OVERLAYS__** *for your editing, these are applicable in any editing softwares in <#1260682322877878332>*' },
      { name: '<a:bullet:1255787106857648189> **After Effects PROJECT FILES**', value: '*We have a WIDE COLLECTION OF After Effects Project files. For example: Transition Ideas in <#1260682210906738708>*' },
      { name: '<a:bullet:1255787106857648189> **FONTS PACKS**', value: '*We have the best **__FONTS PACK__** collection in <#1260682099891900510>*' }
    )
    .setFooter({ text: 'Have a great time with your editing!' });
};

export const createAnnouncementsEmbed = () => {
  return new EmbedBuilder()
    .setColor('#4c0385')
    .setTitle('3D/VFX Packs')
    .setDescription('Here’s more information about our server related to 3D/VFX Assets')
    .addFields(
      { name: '<a:bullet:1255787106857648189> **Blender Plugins**', value: 'Check out our **__Blender Plugins__** in <#1287457718638219409>' },
      { name: '<a:bullet:1255787106857648189> **Sketchfab Models for Free**', value: 'Check out or request any **Sketchfab** models in <#1268213234092212326>' },
      { name: '<a:bullet:1255787106857648189> **Pubg Mobile 3D models**', value: 'Check out **__Pubg Mobile 3D models__** in <#1273552873237647443>' },
      { name: '<a:bullet:1255787106857648189> **Valorant 3D Models**', value: 'Check out **__Valorant 3D Models__** in <#1273553086782377984>' },
      { name: '<a:bullet:1255787106857648189> **Freefire 3D Models**', value: 'Check out **__Freefire 3D Models__** in <#1273553218491645975>' },
      { name: '<a:bullet:1255787106857648189> **COD 3D Models**', value: 'Check out **__COD 3D Models__** in <#1273553013721796649>' }
    )
    .setFooter({ text: 'More Games and More 3D assets coming soon...' });
};

export const createPiratedStuffEmbed = () => {
  return new EmbedBuilder()
    .setColor('#4c0385')
    .setTitle('**Wants Free Games?**')
    .setDescription('*We have a lot of free & Pirated games for free*')
    .addFields(
      { name: '<a:bullet:1255787106857648189> **Free Games**', value: '*we have many paid games Cr4cked in our server in <#1260681944715493451>*' }
    )
    .setFooter({ text: 'Have a great time with your gaming!' });
};
