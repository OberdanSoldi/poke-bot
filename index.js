const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,

    },
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});

const weightOrHeight = (p) => {
    return p / 10;
};

client.on("message", message => {
    let userMessage = message.content.toLowerCase();
    let prefixo = userMessage.substring(0, 1);

    if(prefixo === "!") {
        let palavras = userMessage.substring(1).split(" ");
            if (palavras[0] === "pokemon" && palavras[1]!== undefined || "poke" && palavras[1]!== undefined) {
                message.channel.send(`Você quer informação do pokémon: ${palavras[1]}\n`);
                axios.get('https://pokeapi.co/api/v2/pokemon/' + palavras[1])
                    .then(response => {
                        let pokemon = response.data;
                        message.channel.send(`Nome: ${pokemon.name}\nId: ${pokemon.id}\nPeso:  ${weightOrHeight(pokemon.weight)} KG\nTamanho:  ${weightOrHeight(pokemon.height)} M`);
                        for (let i = 0; i < pokemon.types.length; i++) {
                            message.channel.send(`Tipo ${i}: ${pokemon.types[i].type.name}`);
                        }
                    })
                    .catch(error => {
                        message.channel.send(`Erro: ${error.response.status}. Pokémon não encontrado!`)
                    })
            };

            if (palavras[0] === "pokemon" && palavras[1]== undefined || palavras[0] === "poke" && palavras[1]== undefined) {
                message.channel.send(`Digite o comando corretamente!\nExemplo: !pokemon <nome do pokémon> ou !poke <nome do pokémon>`);
            };

            if (palavras[0] === "help") {
                message.channel.send(`Comandos:\n !pokemon [nome do pokémon]\n !invite`);
            };

            if (palavras[0] === "invite") {
                message.channel.send("https://bit.ly/pokebot-invite")
            };
    }
});

client.login("Bot key here");