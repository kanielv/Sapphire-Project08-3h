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

  get: async (ctx) => {
    const code = ctx.request.query.code;
    const id = ctx.params.courseId;

    const googleClassroomClient = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getGoogleClassroomClient(code);

    const course = await googleClassroomClient.courses.get({
      id
    })
    console.log(course)
    ctx.send({
      message: 'ok',
      course: course.data
    })
  },

  courseWork: async (ctx) => {
    const code = ctx.request.query.code;
    const id = ctx.params.courseId;
    console.log(id)

    const googleClassroomClient = await strapi
      .plugins['google-classroom-api']
      .services.classroom
      .getGoogleClassroomClient(code);

    const course = await googleClassroomClient.courses.courseWork.list({
      courseId: id
    })
    console.log(course)
    ctx.send({
      message: 'ok',
      course: course.data
    })
  },

  getStudentId: async (ctx) => {
    try {
      const code = ctx.request.query.code;
      const courseId = ctx.params.courseId;
      const courseWorkId = ctx.params.courseWorkId;
      console.log(courseId);
      console.log(courseWorkId)

      const googleClassroomClient = await strapi
        .plugins['google-classroom-api']
        .services.classroom
        .getGoogleClassroomClient(code);

      const students = await googleClassroomClient.courses.courseWork.studentSubmissions.list({
        courseId: courseId,
        courseWorkId: courseWorkId,
      })

      console.log(students);
      ctx.send({
        message: 'ok',
        course: students.data
      })
    }
    catch (error) {
        console.error('Error getting student submissions:', error);
        ctx.throw(500, 'Error getting student submissions', { error });
      }
  },

  create: async (ctx) => {
    const { name, school, grade, enrollmentCode, mentorObj } = ctx.request.body;
    ctx.request.body.code = enrollmentCode;

    // Set mentor body
    ctx.request.body.first_name = mentorObj.firstName;
    ctx.request.body.last_name = mentorObj.lastName;
    ctx.request.body.user = mentorObj.user;
    console.log(ctx.request.body)

    try {
      // Check if classroom exists
      let classroom = await strapi.query('classroom').findOne({name: name})
      const classroomExists = classroom !== null;
      if(classroomExists) {
      }
      classroom = await strapi.services.classroom.create(ctx.request.body)

      ctx.request.body.classrooms = [classroom]


      // Assign user as mentor
      let mentor = await strapi.query('mentor').findOne({ user: mentorObj.user });
      const mentorExist = mentor !== null;
      if (!mentorExist) {
        mentor = await strapi.services.mentor.create(ctx.request.body)
      }
      else {
        const mentorClassrooms = mentor.classrooms;
        mentorClassrooms.push(classroom);
        console.log(mentorClassrooms)
        await strapi.query('mentor').update({id: mentor.id}, {classrooms: mentorClassrooms});
      }




      ctx.send({
        message: 'ok',
        // body: sanitizeEntity(classroom, { model: strapi.models.classroom })
      })
    }
    catch (err) {
      console.log(err)
    }
    // return sanitizeEntity(classroom, { model: strapi.models.classroom });

  }

};
