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

  list: async (ctx) => {
    const code = ctx.request.query.code

    const googleClassroomClient = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getGoogleClassroomClient(code);
    
    const courses = await strapi
    .plugins['google-classroom-api']
    .services.classroom
    .getCourses(googleClassroomClient);

    ctx.send({
      message: 'ok',
      courses: courses.data.courses
    });
  },

  get: async (ctx) => {
    const code = ctx.request.query.code;
    const id = ctx.params.id;

    const googleClassroomClient = await strapi
    .plugins['google-classroom-api']
    .services.classroom
    .getGoogleClassroomClient(code);

    const course = await googleClassroomClient.courses.get({
      id
    })

    ctx.send({
      message: 'ok',
      course: course.data
    })
  },

  create: async (ctx) => {
    console.log(ctx.request.body)
    const { name, school, grade } = ctx.request.body;
    
    const classroom = await strapi.services.classroom.create(ctx.request.body);
    return sanitizeEntity(classroom, { model: strapi.models.classroom });  }

};
