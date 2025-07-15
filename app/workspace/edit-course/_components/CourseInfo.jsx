import React from 'react'
import { Book, Clock, TrendingUp } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

function CourseInfo({course}) {
    const courseLayout=course?.courseJson?.course;
    const [loading,setLoading]=useState(false);
    const GenerateCourseContent= async ()=>{

        setLoading(true);
        try{
        const result = await axios.post('/api/generate-course-content',{
            courseJson:courseLayout,
            courseTitle:course?.name,
            courseId:course?.cid
        });
        console.log(result.data);
        setLoading(false);
    }
    catch(e)
    {
        console.log(e);
        setLoading(false);
    }
    }
  return (
    <div className='md:flex p-5 gap-5 justify-between rounded-2xl shadow-lg'>
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>{courseLayout?.name}</h2>
            <p className='line-clamp-3 text-gray-500'>{courseLayout?.description}</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='flex items-center gap-2 shadow p-2 rounded-lg'>
                    <Clock className='text-blue-500'/>
                    <section>
                        <h2 className='font-bold'>Duration</h2>
                        <p>{courseLayout?.duration}</p>
                    </section>
                </div>
                <div className='flex items-center gap-2 shadow p-2 rounded-lg'>
                    <Book className='text-green-500'/>
                    <section>
                        <h2 className='font-bold'>Chapters</h2>
                        <p>{courseLayout?.chapters?.length}</p>
                    </section>
                </div>
                <div className='flex items-center gap-2 shadow p-2 rounded-lg'>
                    <TrendingUp className='text-red-500'/>
                    <section>
                        <h2 className='font-bold'>Difficulty Level</h2>
                        <p>{courseLayout?.level}</p>
                    </section>
                </div>
            </div>
            <Button className={'max-w-sm'}> <Settings/>Generate Content</Button>
        </div>
    </div>
  )
}

export default CourseInfo