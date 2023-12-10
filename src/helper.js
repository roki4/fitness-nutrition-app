module.exports = {
  getChatId(msg) {
    return msg.chat.id;
  },
  getUser(msg) {
    return msg.from.first_name;
  },
};
