const {
  getVarsFromContext,
  getGroupId,
  isGroup,
  existsGroupSavedData,
  stillNoSavedMembers,
  getGroupData,
} = require('./utils');
const { state, saveState } = require('./state');

exports.catchErrors = fn => (...params) => {
  try {
    fn(...params)
  } catch(err) {
    console.error('ERROR: ', err)
  }
}

exports.initGroup = async ctx => {
  const { chatId, type } = getVarsFromContext(ctx);
  const groupKey = getGroupId(chatId);
  console.log('initGroup()', chatId);

  if (!isGroup(type) || existsGroupSavedData(groupKey, state)) {
    const msg = 'Este grupo ya ha sido inicializado';
    console.log(msg, chatId);
    ctx.reply(msg);
    return
  }

  const totalMembers = await ctx.telegram.getChatMembersCount(chatId);

  state.groups[groupKey] = { totalMembers, members: [] };
  console.log(`Inicializado nuevo grupo con id ${chatId} y ${totalMembers} usuarios`);

  saveState();
  ctx.reply('El grupo ha sido inicializado');
}

exports.messageHandler = ctx => {
  const { chatId, type, userId, username } = getVarsFromContext(ctx);
  const groupKey = getGroupId(chatId);
  console.log(`messageHandler() on chat ${chatId} from user ${userId}`);

  if (!isGroup(type)) {
    console.log('Este comando sólo funciona en grupos', type);
    return;
  }

  if (!existsGroupSavedData(groupKey, state)) {
    console.log('El grupo no ha sido inicializado', chatId);
    return;
  }

  if (!username) {
    console.log(`El usuario ${userId} no tiene establecido un nick`, username);
    return;
  }

  const { totalMembers, members } = getGroupData(groupKey, state);
  if (members.length >= totalMembers) {
    console.log('Ya tengo todos los datos sobre usuarios del chat', chatId);
    return;
  }

  if (members.includes(username)) {
    console.log(`El usuario ${username} ya está almacenado en el chat ${chatId}`);
    return;
  }

  state.groups[groupKey].members.push(username);
  console.log(`El usuario ${username} ha sido añadido al chat ${chatId}`);

  saveState();
}

exports.mentionAllHandler = (ctx) => {
  const { chatId, type } = getVarsFromContext(ctx);
  const groupKey = getGroupId(chatId);
  console.log('mentionAllHandler()', chatId);

  if (!isGroup(type)) {
    const msg = 'Este comando sólo funciona en grupos';
    console.log(msg, type);
    ctx.reply(msg);
    return;
  }

  if (!existsGroupSavedData(groupKey, state)) {
    const msg = 'El grupo no ha sido inicializado';
    console.log(msg, chatId);
    ctx.reply(msg);
    return;
  }

  if (stillNoSavedMembers(groupKey, state)) {
    const msg = 'No hay información almacenada sobre los miembros de este grupo';
    console.log(msg, chatId);
    ctx.reply(msg);
    return;
  }

  const msg = getGroupData(groupKey, state).members
    .map(m => `@${m}`)
    .join(' ');

  ctx.reply(`Habéis sido convocados! ${msg}`);
}
