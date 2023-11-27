'use strict';

/**
 * google-auth-provider.js controller
 *
 * @description: A set of functions called "actions" of the `google-auth-provider` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    console.log("Plugin")
    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  initGoogleLogin: async (ctx) => {
      const url = await strapi
        .plugins['google-auth-provider']
        .services.google
        .createAuthUrl();
      console.log(url)
      ctx.body = url;
  },

  initGoogleLoginCallback: async (ctx) => {
    const code = ctx.request.query.code
    const scope = ctx.request.query.scope
    console.log(code);
    ctx.body = {message: 'ok'}

  }

};
