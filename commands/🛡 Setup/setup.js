const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'setup',
    aliases: ['musicsetup'],
    cooldown: 10,
    usage: "setup",
    description: "Creates an unique Music Setup for Requesting Songs!",
    memberpermissions: ["ADMINISTRATOR"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // code here
        message.guild.channels.create("Pro Music✨ - Requests", {
            type: 'category',
            permissionOverwrites: [{
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            },],
        }).then((channel1) => {
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            message.guild.channels.create(`🎧｜ Music Bot `, {
                type: 'voice', //voice Channel
                bitrate: maxbitrate, //set the bitrate to the maximum possible
                userLimit: 30, //set the limit for voice users
                parent: channel1.id, //ADMINISTRATOR
                permissionOverwrites: [{
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL', "CONNECT"],
                },],
            }).then((channel2) => {
                message.guild.channels.create(`🎵｜Just Music bot`, {
                    type: 'text', // text channel
                    rateLimitPerUser: 6, //set chat delay
                    topic: `*play music Thanks Setup Guys Me Invite Server (Pro Music ✨)!`,
                    parent: channel1.id,
                    permissionOverwrites: [{
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                    },
                    { //giving the Bot himself permissions
                        id: client.user.id,
                        allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                    }
                    ],
                }).then((channel3) => {
                    message.reply(`Setting up in <#${channel3.id}>`)  

                    let dusra = new MessageEmbed()
                        .setColor(config.colors.yes)
                        .setThumbnail(client.user.displayAvatarURL()) 
                        .setTitle(" Music Bot - Best Free Music Bot of 2021")
                        .setDescription(`.\n[Invite  Pro Music✨](https://discord.com/api/oauth2/authorize?client_id=894294802265411674&permissions=8&scope=bot) | [Support](https://discord.gg/ZQhTvGhaH8) | [Top.gg](https://discord.gg/gq8h4EGX)`)
                        .setImage('https://images-ext-2.discordapp.net/external/K3Jl1Ik8eX7APTB26bYmMIFHGExA7aEHuIvb1rH8y-g/https/media.discordapp.net/attachments/837692611590094868/889686815022403724/20210921_043700.jpg')
                        .setFooter("Prefix = setup 》help ")

                    //send a temp message
                    channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then(msg => {
                        //edit the message again
                        msg.edit(pehla)
                        //save it in the database
                        // client.setups.set(message.guild.id, msg.id, "message_queue_info");

                    })


                    //send a temp message
                    channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then(msg => {
                        //edit the message again
                        msg.edit(dusra)
                        //save it in the database
                        // client.setups.set(message.guild.id, msg.id, "message_queue_info");

                        // // send a reaction message 
                        // channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then( async msg => {
                        //     msg.edit(dusra)
                        //     //react with all reactions
                        //     await msg.react("⏭") // skip song
                        //     await msg.react("⏹") // stop song
                        //     await msg.react("🔉") // down volume
                        //     await msg.react("🔊") // up volume
                        //     await msg.react("⬅️") // forward 10s 
                        //     await msg.react("➡️") // backward 10s

                        // })

            
                    })
                })
            })
        })
    }
}
