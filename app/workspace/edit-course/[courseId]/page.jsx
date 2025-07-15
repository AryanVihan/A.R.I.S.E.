"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import CourseInfo from '../_components/CourseInfo'
import { useEffect } from 'react'
import axios from 'axios'
import ChapterTopicList from '../_components/ChapterTopicList'

function EditCourse() {
    const { courseId } = useParams();
    const [loading,setLoading]=useState(false);
    const [course,setCourse]=useState();

    useEffect(()=>{
        GetCourseInfo();
    },[])

    const GetCourseInfo=async()=>{
        setLoading(true);
        const result=await axios.get('/api/courses?courseId='+courseId);
        console.log(result.data);
        setLoading(false);
        setCourse(result.data);
    }
  return (
    <div>
        <CourseInfo course={course}/>
        <ChapterTopicList course={course}/>
    </div>
  )
}

export default EditCourse