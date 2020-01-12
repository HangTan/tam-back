
'use strict';

const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function(ctx, next) {
    // 拿到传回数据的header 中的token值
    const token = String(ctx.request.header.authorization || '').split(' ').pop();
    const method = ctx.method.toLowerCase();

    if (method === 'get') {
      await next();
    } else if (!token) {
      if (ctx.path === '/admin/register' || ctx.path === '/admin/login') {
        await next();
      } else {
        ctx.throw(401, '未登录， 请先登录');
      }
    } else {
      let decode;
      try {
        decode = JWT.verify(token, options.secret);
        if (!decode || !decode.username) {
          ctx.throw(401, '没有权限，请登录');
        }
        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        const user = await ctx.model.User.find({
          username: decode.username,
        });
        if (user) {
          await next();
        } else {
          ctx.throw('401', '用户信息验证失败');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};
