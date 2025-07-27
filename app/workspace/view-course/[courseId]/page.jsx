import React from 'react'
// import { useParams } from 'next/navigation'
import EditCourse from '../edit-course/[courseId]'

function ViewCourse() {
  // const {courseId}=useParams();
  return (
    <div>
      <EditCourse viewCourse={true}/>
    </div>
  )
}

export default ViewCourse