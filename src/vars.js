const { join } = require('path');

require('dotenv-safe').config({
  example: join(__dirname, '..', '.env.example'),
  path: join(__dirname, '..', '.env'),
});

const { BOT_TOKEN } = process.env;

const SAVE_FILE = join(__dirname, '..', 'saved_data.json');

module.exports = {
  BOT_TOKEN,
  SAVE_FILE,
};
