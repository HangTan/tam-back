'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async addUser() {
    await this.service.user.addUser();
    this.ctx.body = 'hi, eggggggg';
  }

  async userList() {
    const res = await this.service.user.userList();
    this.ctx.body = res;
  }

  async userLogin() {
    const { ctx } = this;
    const loginMsg = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.user.login(loginMsg);
    console.log('result' + result);
    // ctx.status = result.code;
    // // ctx.message = result.message;
    // ctx.body = result.data;
    ctx.body = {
      status: result.status,
      statusText: result.message,
      data: result.data,
    };
  }

  // async login() {
  //   const { ctx } = this;
  //   const loginMsg = ctx.request.body;
  //   loginMsg.password = ctx.
  // }
}

module.exports = UserController;
