const getDateMark = () => `[${(new Date()).toISOString()}]`

exports.log = {
  info: (t, ...params) => console.log(`${getDateMark()}[INFO] ${t}`, ...params),
  error: (t, ...params) => console.error(`${getDateMark()}[ERROR] ${t}`, ...params)
}

exports.getVarsFromContext = ctx => {
  const { chat, from, message } = ctx;
  return {
    chatId: chat.id,
    type: chat.type,
    userId: from.id,
    username: from.username,
    message: message.text,
  };
}

exports.getGroupId = chatId => `g_${chatId}`;

exports.isGroup = type => type === 'group';

exports.existsGroupSavedData = (key, state) => typeof state.groups[key] !== 'undefined';

exports.stillNoSavedMembers = (key, state) => !state.groups[key].members.length

exports.getGroupData = (key, state) => state.groups[key];

exports.getUserText = (command, text) => text
  .replace(new RegExp(`\/${command}`, 'img'), '')
  .trim()
