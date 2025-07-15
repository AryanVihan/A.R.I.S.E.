"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddNewCourseDialog from './AddNewCourseDialog'
function CourseList() {
    const [courseList,setCourseList]=useState([]);
  return (
    <div className='mt-10 items-center'>
        <h2 className='text-2xl font-bold'>Course List</h2>
        {courseList?.length==0? <div className='flex p-7 items-center justify-center flex-col border rounded-3xl mt-2 bg-gray-200'>
            <h2 className='my-2 text-xl font-bold'>Looks like you have not created any courses yet</h2>
            <AddNewCourseDialog>
            <Button>+ Create your first course</Button>
            </AddNewCourseDialog>
        </div> :
        <div>
            List of Courses
        </div> }
    </div>
  )
}

export default CourseList