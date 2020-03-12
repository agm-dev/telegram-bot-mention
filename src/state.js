const fs = require('fs');
const { SAVE_FILE } = require('./vars');
const { log } = require('./utils');

const state = {
  groups: {}
}
exports.state = state;

exports.loadState = () => {
  if (!fs.existsSync(SAVE_FILE)) {
    log.info('No existe el fichero de guardado');
    return;
  }

  const rawData = fs.readFileSync(SAVE_FILE);
  const { groups } = JSON.parse(rawData);
  state.groups = { ...groups };
  log.info('Se han cargado los datos salvados en el estado');
}

exports.saveState = () => {
  const json = JSON.stringify(state);
  fs.writeFile(SAVE_FILE, json, err => {
    if (err) {
      log.error('[ERROR] Error al escribir en el fichero de salvado', err.message);
      return;
    }
    log.info('Datos del estado escritos en el fichero de salvado');
  });
}
