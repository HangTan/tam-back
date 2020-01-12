/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578742102297_778';

  // add your middleware config here
  config.middleware = [ 'jwt' ];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.jwt = {
    secret: 'egg-api-jwt',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/tam',
        options: {},
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
