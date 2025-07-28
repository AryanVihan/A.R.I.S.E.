import React from 'react'
import { PlayCircle, Book } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EnrollCourseCard({course,enrollCourse}) {
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress=()=>{
        return ((enrollCourse?.completedChapters?.length??0)/course?.courseContent?.length)*100;
    }
    return (
        <div className='group relative p-6 flex flex-col gap-5 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 border border-blue-200/40 rounded-3xl shadow-lg transition-all duration-500 cursor-pointer m-5 mb-10 hover:bg-gradient-to-br hover:from-blue-50/40 hover:via-white hover:to-indigo-50/40 hover:border-blue-300/60 hover:scale-[1.02] hover:z-10 hover:shadow-2xl hover:shadow-blue-200/30 w-[350px] backdrop-blur-sm animate-fade-in-up'>
            {/* Glass effect overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
            
            {/* Enrolled badge glow */}
            <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-400/25 via-indigo-400/25 to-purple-400/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none'></div>
            
            {/* Enrolled indicator */}
            <div className='absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md animate-pulse-soft'>
                Enrolled
            </div>
            
            <div className='relative z-10'>
                <h2 className='font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300 tracking-tight pr-16'>{course?.courseJson?.course?.name}</h2>
                <p className='line-clamp-3 text-gray-600 group-hover:text-gray-700 m-2 text-sm leading-relaxed transition-colors duration-300'>{course?.courseJson?.course?.description}</p>
                <div className='flex items-center justify-between mt-4'>
                    <h2 className='flex items-center gap-2 text-gray-700 group-hover:text-gray-800 transition-colors duration-300'>
                        <Book className='text-blue-500 group-hover:text-blue-600 transition-colors duration-300 drop-shadow-sm' size={18} />
                        <span className='font-medium text-sm'>{course?.courseJson?.course?.noOfChapters} Chapters</span>
                    </h2>
                    <Link href={'/workspace/course/' + course?.cid}>
                        <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                            <PlayCircle className='mr-2 h-4 w-4' />
                            Continue
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard