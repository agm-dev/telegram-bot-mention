const Telegraf = require('telegraf');

const { BOT_TOKEN } = require('./vars');
const {
  catchErrors,
  initGroup,
  messageHandler,
  mentionAllHandler,
} = require('./handlers');

const bot = new Telegraf(BOT_TOKEN);

bot.start(catchErrors(initGroup));
bot.command('all', catchErrors(mentionAllHandler));
bot.on('message', catchErrors(messageHandler));

module.exports = bot;
