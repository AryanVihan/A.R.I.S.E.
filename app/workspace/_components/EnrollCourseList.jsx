"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EnrollCourseCard from './EnrollCourseCard'
import './EnrollCourseList.css'
function EnrollCourseList() {
    const [enrolledCourseList,setEnrolledCourseList]=useState([]);

    useEffect(()=>{
        GetEnrolledCourse();
    },[])
    const GetEnrolledCourse = async () => {
        const result=await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrolledCourseList(result.data);
    }
  return enrolledCourseList?.length > 0 && (
    <div className='enrolled-courses-section'>
        <div className='enrolled-courses-header'>
            <h2 className='enrolled-courses-title'>Enrolled Courses</h2>
            <div className='enrolled-courses-accent'></div>
        </div>
        <div className='enrolled-courses-grid'>
            {enrolledCourseList?.map((course,index)=>{
             return <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index}/>
            })}
        </div>
    </div>
  )
}

export default EnrollCourseList