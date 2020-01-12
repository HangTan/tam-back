'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const checkToken = app.middleware.jwt();
  const { router, controller } = app;
  router.get('/', checkToken, controller.home.index);

  router.get('/admin/addUser', checkToken, controller.user.addUser);

  router.get('/admin/userList', checkToken, controller.user.userList);

  router.post('/admin/login', checkToken, controller.user.userLogin);
};
