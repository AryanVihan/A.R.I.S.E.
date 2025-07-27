"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EnrollCourseCard from './EnrollCourseCard'
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
    <div className='mt-10 items-center'>
        <h2 className='text-2xl font-bold'>Enrolled Courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {enrolledCourseList?.map((course,index)=>{
             return <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index}/>
            })}
        </div>
    </div>
  )
}

export default EnrollCourseList