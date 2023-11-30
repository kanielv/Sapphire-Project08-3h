'use strict';

/**
 * google-classroom-api.js controller
 *
 * @description: A set of functions called "actions" of the `google-classroom-api` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  getCourseList: async (ctx) => {
    const code = ctx.request.query.code
    console.log(`Code: ${code}`);

    const token = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getAccessToken(code);

    
    // const courses = await strapi
    // .plugins['google-classroom-api']
    // .services.classroom
    // .getCourses(token);

    console.log(token);
    ctx.send({
      message: 'ok'
    });
  }
};
