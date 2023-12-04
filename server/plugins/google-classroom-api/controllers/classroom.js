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

    const googleClassroomClient = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getGoogleClassroomClient(code);
    
    const courses = await strapi
    .plugins['google-classroom-api']
    .services.classroom
    .getCourses(googleClassroomClient);

    console.log(courses)

    ctx.send({
      message: 'ok',
      courses: courses.data.courses
    });
  },

  updateStudentGrade: async (ctx) => {
    const code = ctx.request.query.code

    const googleClassroomClient = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getGoogleClassroomClient(code);

    const { courseId, courseWorkId, studentId } = ctx.params;
    const { draftGrade, assignedGrade } = ctx.request.body;

    const updatedSubmissionData = {
      draftGrade,
      assignedGrade,
      // Add other fields as needed
    };

    try {
      
      const updatedSubmission = await strapi
        .plugins['google-classroom-api']
        .services.classroom
        .updateGrade(googleClassroomClient, courseId, courseWorkId, studentId, updatedSubmissionData);

      ctx.send(updatedSubmission);
    } catch (error) {
      ctx.throw(500, 'Error updating submission', { error });
    }
  },

};
