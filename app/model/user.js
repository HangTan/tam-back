/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: {
      type: String,
      select: false,
      // 用bcryptjs给密码加密
      set(val) {
        return require('bcryptjs').hashSync(val, 10);
      },
    },
  });

  return mongoose.model('User', UserSchema);
};
