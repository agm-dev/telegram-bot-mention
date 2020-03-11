exports.getVarsFromContext = ctx => {
  const { chat, from } = ctx;
  return {
    chatId: chat.id,
    type: chat.type,
    userId: from.id,
    username: from.username,
  };
}

exports.getGroupId = chatId => `g_${chatId}`;

exports.isGroup = type => type === 'group';

exports.existsGroupSavedData = (key, state) => typeof state.groups[key] !== 'undefined';

exports.stillNoSavedMembers = (key, state) => !state.groups[key].members.length

exports.getGroupData = (key, state) => state.groups[key];
