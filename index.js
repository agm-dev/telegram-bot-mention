const bot = require('./src/bot');
const { loadState } = require('./src/state');

loadState();
bot.launch();
console.log('launched bot');
