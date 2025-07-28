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
<div className='group relative p-4 flex flex-col gap-4 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-xl backdrop-blur-lg transition-all duration-500 cursor-pointer w-full h-[320px] hover:bg-gradient-to-br hover:from-gray-800/95 hover:via-gray-700/95 hover:to-gray-800/95 hover:border-gray-600/70 hover:scale-[1.02] hover:z-10 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up overflow-hidden'>
            {/* Glass effect overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
            
            {/* Subtle glow on hover */}
            <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none'></div>
            
            <div className='relative z-10'>
                <h2 className='font-bold text-xl text-white group-hover:text-gray-100 transition-colors duration-300 tracking-tight text-shadow-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-300 group-hover:text-gray-200 m-2 text-sm leading-relaxed transition-colors duration-300 text-shadow-sm'>{courseJson?.description}</p>
<div className='flex items-center justify-between mt-auto'>
                    <h2 className='flex items-center gap-2 text-gray-200 group-hover:text-white transition-colors duration-300'>
                        <Book className='text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-lg' size={18} />
                        <span className='font-medium text-sm text-shadow-sm'>{courseJson?.noOfChapters} Chapters</span>
                    </h2>
                    {course?.courseContent?.length ? 
                        <Button 
                            onClick={onEnrollCourse} 
                            disabled={loading}
                            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                        >
                            {loading ? 
                                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' /> : 
                                <PlayCircle className='mr-2 h-4 w-4' />
                            } 
                            Start Learning
                        </Button> :
                        <Link href={'/workspace/edit-course/' + course?.cid}>
                            <Button className='bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                                <Settings className='mr-2 h-4 w-4' />
                                Generate Course
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard