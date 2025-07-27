import React from 'react'
import { PlayCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EnrollCourseCard({course,enrollCourse}) {
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress=()=>{
        return ((enrollCourse?.completedChapters?.length??0)/course?.courseContent?.length)*100;
    }
  return (
    <div className='p-5 flex flex-col gap-5 border rounded-3xl shadow-lg transition-all cursor-pointer m-5 mb-10 hover:bg-gray-100 hover:border-gray-200 hover:scale-105 hover:z-10 hover:shadow-2xl w-[350px]'>
            <div>
                <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-500 m-2 text-sm'>{courseJson?.description}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex text-sm justify-between gap-2'>Progress <span>{CalculatePerProgress()}%</span></h2>
                    <Progress value={CalculatePerProgress()}/>
                    <Link href={'/workspace/view-course/'+course?.cid}><Button className={'w-full mt-3'}><PlayCircle/>Continue Learning</Button></Link>
                </div>
            </div>
        </div>
  )
}

export default EnrollCourseCard