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

  const handleAddClassroom = () => {
    googleAddClassroom(id, {id, name, enrollmentCode}).then(res => {
      console.log(res)
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

