const bot = require('./src/bot');
const { loadState } = require('./src/state');
const { log } = require('./src/utils');

loadState();
bot.launch();
log.info('launched bot');
