import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms } from '../../../Utils/requests';
import { message } from 'antd';
import './AddGoogleClassroomForm.less';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate, useLocation } from 'react-router-dom';

// Google Api Imports
import { googleAddClassroom, googleGetClassroom, googleGetClassrooms } from '../../../Utils/googleRequests';
import { googleGetGapiToken } from '../../../Utils/GoogleAuthRequests';

export default function AddGoogleClassroomForm() {
  const [value] = useGlobalState('currUser');
  const location = useLocation();
  const { id, name, enrollmentCode } = location.state;
  const navigate = useNavigate();

  // For debugging change these fields
  const grade = 4;
  const school = 1;
  const firstName = 'Kaniel'
  const lastName = 'Vicencio'

  const handleAddClassroom = () => {
    const classroomObj = {
      name,
      school,
      grade,
      enrollmentCode,
      mentorObj: {
        firstName,
        lastName,
        school,
        user: 18
      }
    }

    googleAddClassroom(id, classroomObj).then(res => {
      console.log(res);
      // navigate('/dashboard')
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome {value.name}</div>
      <MentorSubHeader title={'Add Google Classroom'}></MentorSubHeader>
      <div id='classrooms-container'>
        <button onClick={() => handleAddClassroom()}>Add Classroom</button>
      </div>
    </div>
  )

}

