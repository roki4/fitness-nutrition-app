module.exports = {
  getChatId(msg) {
    return msg.chat.id;
  },
  getUser(msg) {
    return msg.from.first_name;
  },
  convertCountToTime(count) {
    count *= 30;
    let m;
    if (count % 60 === 30) {
      m = '30';
    } else {
      m = '0';
    }
    let h = String(Math.floor(count / 60));
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`
  },
};