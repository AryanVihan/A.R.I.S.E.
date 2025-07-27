import React from 'react'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function CourseCard({ course }) {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/enroll-course', { courseId: course?.cid });
            console.log(result.data);
            if(result.data?.resp){
                toast.warning("You are already enrolled in this course!");
                setLoading(false);
                return;
            }
            toast.success("Course Enrolled Successfully!");
            setLoading(false);
        }
        catch (e) {
            toast.error("Server Side Error");
            setLoading(false);
        }
    }

    return (
        <div className='p-5 flex flex-col gap-5 border rounded-3xl shadow-lg transition-all cursor-pointer m-5 mb-10 hover:bg-gray-100 hover:border-gray-200 hover:scale-105 hover:z-10 hover:shadow-2xl w-[350px]'>
            <div>
                <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-500 m-2 text-sm'>{courseJson?.description}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex items-center gap-2'><Book className='text-green-500' />{courseJson?.noOfChapters} Chapters</h2>
                    {course?.courseContent?.length ? <Button onClick={onEnrollCourse} disabled={loading}>
                        {loading ? <LoaderCircle className='mr-2 h-4 w-4 animate-spin' /> : <PlayCircle />} Start Learning</Button> :
                        <Link href={'/workspace/edit-course/' + course?.cid}><Button><Settings />Generate Course</Button></Link>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard