const fs = require('fs');

const SAVE_FILE = 'saved_data.json';

const state = {
  groups: {}
}
exports.state = state;

exports.loadState = () => {
  if (!fs.existsSync(SAVE_FILE)) {
    console.log('No existe el fichero de guardado');
    return;
  }

  const rawData = fs.readFileSync(SAVE_FILE);
  const { groups } = JSON.parse(rawData);
  state.groups = { ...groups };
  console.log('Se han cargado los datos salvados en el estado');
}

exports.saveState = () => {
  const json = JSON.stringify(state);
  fs.writeFile(SAVE_FILE, json, err => {
    if (err) {
      console.error('[ERROR] Error al escribir en el fichero de salvado', err.message);
      return;
    }
    console.log('Datos del estado escritos en el fichero de salvado');
  });
}
