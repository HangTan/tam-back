'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');

class UserService extends Service {
  async addUser() {
    const user = new this.ctx.model.User({
      username: 'admin',
      password: '123456',
    });
    user.save();
  }

  async userList() {
    const res = await this.ctx.model.User.find();
    return res;
  }

  async login(loginMsg) {
    const { ctx } = this;
    const res = {};
    // 1.根据用户名找用户
    const user = await ctx.model.User.findOne({
      username: loginMsg.username,
    }).select('+password');
    console.log(user);
    if (!user) {
      ctx.throw(422, '用户不存在，请前去注册');
      // res.message = '用户不存在，请前去注册';
      // res.data = {};
      // res.status = 422;
    } else {
      // 2.校验密码
      const isValid = require('bcryptjs').compareSync(loginMsg.password, user.password);
      if (!isValid) {
        ctx.throw(422, '密码错误');
        // res.status = 422;
        // res.message = '密码错误';
        // res.data = {};
      } else {
        // 3.返回token
        const token = JWT.sign({ id: user._id }, this.config.jwt.secret);
        res.status = 200;
        res.message = '登录成功';
        res.data = { token };
      }
    }
    return res;
  }
}

module.exports = UserService;
