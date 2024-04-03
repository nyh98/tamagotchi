const sqlStrTemplate = Object.freeze({
  getUser:
    'SELECT id, nick_name AS nickName FROM users WHERE uid = ? AND pwd = ?',
});

export default sqlStrTemplate;
