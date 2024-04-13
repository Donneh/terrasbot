import {SlashCommandBuilder} from 'discord.js';
import {currentWeather} from '../../services/meteosource.js';

export const data = new SlashCommandBuilder()
    .setName('terras')
    .setDescription('Is het tijd voor terras??')
    .addStringOption(option =>
        option.setName('city')
            .setDescription('De stad waar je het weer van wilt weten')
            .setRequired(true));

export async function execute(interaction) {
    let weather = await currentWeather(interaction.options.getString('city'));

    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let rn = hours + ":" + minutes;

    let city = interaction.options.getString('city');

    if(hours >= 5 && hours < 12 && weather.temperature < 18) {
        await interaction.reply(`Goeiemorgen! Het is nu ${rn}, en in ${city} is het ${weather.temperature} graden. Dat wordt geen terras vandaag...`);
    } else if(hours >= 5 && hours < 12 && weather.temperature >= 18) {
        await interaction.reply(`Goeiemorgen! Het is nu ${rn}, en in ${city} is het ${weather.temperature} graden. Tijd voor terras!`);
    } else if(hours >= 12 && hours < 18 && weather.temperature < 18) {
        await interaction.reply(`Goeiemiddag! Het is nu ${rn} uur, en in ${city} is het ${weather.temperature} graden. Dat wordt geen terras vandaag...`);
    } else if(hours >= 12 && hours < 18 && weather.temperature >= 18) {
        await interaction.reply(`Goeiemiddag! Het is nu ${rn} uur, en in ${city} is het ${weather.temperature} graden. Tijd voor terras!`);
    } else {
        await interaction.reply(`Moet jij nog niet je bed in? Het is nu ${rn} uur.`);
    }
}
