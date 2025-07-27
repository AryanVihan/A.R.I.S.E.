"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddNewCourseDialog from './AddNewCourseDialog'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import CourseCard from './CourseCard'

function CourseList() {
    const [courseList,setCourseList]=useState([]);
    const {user}=useUser();
    useEffect(()=>{
      user &&GetCourseList();
    },[user])
    const GetCourseList=async()=>{
      const result=await axios.get('/api/courses');
      console.log(result.data);
      setCourseList(result.data);
    }
  return (
    <div className='mt-10 items-center'>
        <h2 className='text-2xl font-bold'>Course List</h2>
        {courseList?.length==0? <div className='flex p-7 items-center justify-center flex-col border rounded-3xl mt-2 bg-gray-200'>
            <h2 className='my-2 text-xl font-bold'>Looks like you have not created any courses yet</h2>
            <AddNewCourseDialog>
            <Button>+ Create your first course</Button>
            </AddNewCourseDialog>
        </div> :
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {courseList?.map((course,index)=>{
             return <CourseCard course={course} key={index}/>
            })}
        </div> }
    </div>
  )
}

export default CourseList