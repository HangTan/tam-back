'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 后台管理页面接口
  require('./router/admin')(app);
};
