const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const client = new Discord.Client();

const request = require('request');

let apiKey = '31bc47c930630c91ede11b31c1ae4eed';
let city = 'hulst';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame("Typ 'terras'");

  var channel = client.channels.get('485148863733170186' && '277030352868999168');
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var rn = hours + ":" + minutes;

  request(url, function (err, response, body) {
    let weather = JSON.parse(body)

    if (hours >= 5 && hours < 12 && weather.main.temp < 20) {
      channel.sendMessage("Goeiemorgen! Het is nu " + rn + ", en buiten is het " + `${weather.main.temp}` + " graden. Dat word geen terras vandaag...");
    } 
    else if(hours >= 5 && hours < 12 && weather.main.temp >= 20) {
      channel.sendMessage("Goeiemorgen! Het is nu " + rn + ", en buiten is het " + `${weather.main.temp}` + " graden. Tijd voor terras!");
    }
    else if(hours >= 12 && hours < 18 && weather.main.temp < 20) {
      channel.sendMessage("Goeiemiddag! Het is nu " + rn + " uur, en buiten is het " + `${weather.main.temp}` + " graden. Dat word geen terras vandaag...");
    }
    else if(hours >= 12 && hours < 18 && weather.main.temp >= 20) {
      channel.sendMessage("Goeiemiddag! Het is nu " + rn + " uur, en buiten is het " + `${weather.main.temp}` + " graden. Tijd voor terras!");
    }
    else {
      channel.sendMessage("Moet jij nog niet je bed in? Het is nu " + rn + " uur.");
    }
  });

});

client.on('message', msg => {
  if (!msg.author.bot) { 

    if (msg.content.toLowerCase().includes('piep')) {
      msg.reply('mis me niet te veel! ```david, terras, tijd, plaatje.```');
    }

    else if (msg.content.toLowerCase().includes('plaatje')) {    
      function generateURL() {
        var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var link = "http://i.imgur.com/";
        for (var i = 0; i < 5; i++) {
            link = link.concat(alpha[Math.floor(Math.random() * alpha.length)]);
        }
        return link.concat('.jpg');
      }

      msg.reply(generateURL());
    }

    else if (msg.content.toLowerCase().includes('david')) {
      const rando_imgs = [
        'http://ultimateclassicrock.com/files/2014/10/David-Gilmour1.jpg?w=980&q=75',
        'https://static1.squarespace.com/static/57a9dcfd46c3c496d8299f87/t/59cc25decab339fb541cd69a/1506564637911/davidgilmour2015-770.jpg',
        'https://ichef.bbci.co.uk/images/ic/960x540/p01bqf42.jpg',
        'https://pbs.twimg.com/profile_images/930402038336417793/G5t4U8pd_400x400.jpg',
        'http://sketchoholic.com/uploads/userfiles/14581/980091279e_David_Gilmour.jpg',
        'https://cdn.images.express.co.uk/img/dynamic/79/590x/David-Gilmour-562009.jpg',
        'https://images1.persgroep.net/rcs/7MW-kKQxGScYz6fSiGKPS2MjIng/diocontent/58845958/_crop/0/36/2895/1636/_fill/642/386/?appId=f215d2ebdcdad4aa3dc78550c5970d02&quality=0.80',
        'http://digitalspyuk.cdnds.net/15/34/1600x800/landscape-music-david-gilmour-pink-floyd.jpg',
        'https://mediamass.net/jdd/public/documents/celebrities/1240.jpg'
        ]

      const i = rando_imgs[Math.floor(Math.random() * rando_imgs.length)];
      msg.reply("oh David. Wat ben je toch werelds..." + i);
    }
    
    else if (msg.content.toLowerCase() === 'tijd') {
      var today = new Date().getHours();
      if (today >= 5 && today < 12) {
        msg.reply("goeiemorgen! Het is nu " + today + " uur.");
      } 
      else if(today >= 12 && today <= 18) {
        msg.reply("goeiemiddag! Het is nu " + today + " uur.");
      }
      else {
        msg.reply("moet jij nog niet je bed in? Het is nu " + today + " uur.");
      }
    }
    
    else if (msg.content.toLowerCase().includes('terras')) {
      request(url, function (err, response, body) {
        let weather = JSON.parse(body)

        if(err){
          console.log('error:', error);
        } else {
          if(weather.main.temp < 20) {
            msg.reply(`het is maar ${weather.main.temp} graden. Geen terras weer vrees ik...`);
          } else {
            msg.reply(`het is ${weather.main.temp} graden. Op naar het terras!`);
          }
        }
      });
    }

    else if (msg.isMentioned(client.user)) {
      var today = new Date().getHours();
      if (today >= 5 && today < 12) {
        msg.reply("goeiemorgen! Benieuwd naar wat ik allemaal kan? Typ 'piep'!");
      } 
      else if(today >= 12 && today <= 18) {
        msg.reply("goeiemiddag! Benieuwd naar wat ik allemaal kan? Typ 'piep'!");
      }
      else {
        msg.reply("moet jij nog niet je bed in? Benieuwd naar wat ik allemaal kan? Typ 'piep'!");
      }
    }

  }
  
});

client.login(botconfig.token);