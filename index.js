// Bibliotecas
const Discord = require('discord.js');
const Ytdl = require('ytdl-core');
const streamOption = {seek: 0, volume: 1};
// Iniciando noco Client no Discord
const bot = new Discord.Client();


let iniciar = false;

// Token da aplicação / Bot
const token = 'NzQ1NzIzMjM5MDE1MTIwOTM3.Xz164w.jYnySg__S-mJuygFzobjkMk_NmA';

bot.login(token)


bot.on('ready', () =>{
    bot.user.setActivity('Sendo Feliz!');
    console.log('Estou pronto para ser utilizado! Em teste')
})

let connection;

bot.on('message', async (msg) =>{
    // Mensagem de ajuda do bot
    if(msg.content === '.AllHelp'){
        msg.reply(['no que posso ajudá-lo?',
                   '**Musica:** .AllPlay [link]',
                    '**Chamar o Bot:** .AllJoin',
                    '**Desconectar o Bot:** .AllDesc',
                    '||Bot em desenvolvimento||',
                
                ]);
    }
    // Conectar o bot na sala de voz
    // Você precisa estar conectado em uma sala de voz
    else if(msg.content === '.AllJoin'){
        if(msg.member.voice.channel){
            connection = await msg.member.voice.channel.join();
            iniciar = true;
        }else{
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
        }
    // Desconectar o bot da sala de voz
    // Você precisa estar conectado em uma sala de voz
    }else if(msg.content === '.AllDesc'){
        if(msg.member.voice.channel){
            msg.member.voice.channel.leave();
            iniciar = false;
        }else{
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
        }
    // Comando de musica do Bot
    // Você precisa estar conectado em uma sala de voz
    }else if(msg.content.startsWith('.AllPlay ')){
        if (iniciar){
            let musica = msg.content.replace('.AllPlay ', '');
            if (Ytdl.validateURL(musica)){
                    // Usamos a referência ao join(); aqui, para então dar play em algo.
                connection.playStream(Ytdl(musica)); // e agora temos play() no lugar de playStream()
            } else {
                msg.channel.send('O link não é válido!')
            }
        }
    }
})