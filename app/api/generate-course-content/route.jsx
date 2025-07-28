import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import axios from "axios";
import { createSupabaseClient } from "@/lib/supabase";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const PROMPT = `Depends on Chapter name and topic, generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,
{
topic:<>,
content:<>
}
}
: User Input:
`

export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json()

    const promises = courseJson?.chapters?.map(async (chapter) => {
        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.5-pro';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });
        // console.log(response.candidates[0].content.parts[0].text);
        const RawResp=response.candidates[0].content.parts[0].text;
        let RawJson = RawResp.replace('```json', '').replace('```', '').trim();
        
        // Clean up potential control characters and invalid JSON formatting
        RawJson = RawJson.replace(/[\x00-\x1F\x7F]/g, '')  // Remove control characters
                        .replace(/\\n/g, '\\n')     // Escape newlines properly
                        .replace(/\\t/g, '\\t')     // Escape tabs properly
                        .replace(/\\r/g, '\\r');    // Escape carriage returns properly
        
        let JSONResp;
        try {
            JSONResp = JSON.parse(RawJson);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Raw JSON:', RawJson);
            // Return a fallback structure
            JSONResp = {
                chapterName: chapter?.chapterName || 'Unknown Chapter',
                topics: chapter?.topics?.map(topic => ({
                    topic: topic,
                    content: 'Content generation failed. Please try again.'
                })) || []
            };
        }

        // Get Youtube Videos
        const YoutubeData=await GetYoutubeVideo(chapter?.chapterName);
        console.log({
            youtubeVideo: YoutubeData,
            courseData: JSONResp
        })
        return {
            youtubeVideo:YoutubeData,
            courseData:JSONResp
        };
    })

    const CourseContent = await Promise.all(promises);

    // Debug: Log before update
    console.log("Updating courseContent for cid:", courseId, "Type:", typeof courseId);
    console.log("CourseContent being saved:", CourseContent);

    // Save to DB (Supabase)
    const supabase = createSupabaseClient();
    
    // First, check if the course exists
    const { data: existingCourse, error: fetchError } = await supabase
        .from('courses')
        .select('id, title')
        .eq('id', courseId)
        .single();
    
    console.log("Existing course check:", existingCourse, "fetch error:", fetchError);
    
    if (fetchError) {
        console.error("Failed to fetch course:", fetchError);
        return NextResponse.json({ error: `Course with ID ${courseId} not found: ${fetchError.message}` }, { status: 404 });
    }
    
    if (!existingCourse) {
        console.error("No course found with ID:", courseId);
        return NextResponse.json({ error: `Course with ID ${courseId} does not exist` }, { status: 404 });
    }
    
    console.log("Course found, proceeding with update:", existingCourse.title);
    
    // Now perform the update
    const { data, error } = await supabase
        .from('courses')
        .update({ courseContent: CourseContent })
        .eq('id', courseId)
        .select(); // Return updated data

    // Debug: Log after update
    console.log("Supabase update result:", data, "error:", error);

    if (error) {
        console.error("Supabase Update Error:", error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
        if (error.code === 'PGRST116') {
            return NextResponse.json({ error: 'Course not found or access denied.' }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Verify update was successful
    if (!data || data.length === 0) {
        console.error("Update failed: No data returned from Supabase");
        return NextResponse.json({ error: 'Failed to update course content' }, { status: 500 });
    }

    return NextResponse.json({
        courseName: courseTitle,
        courseContent: CourseContent
    });
}

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo=async(topic)=>{
    const params = {
        part: 'snippet',
        q: topic,
        maxResults: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
    }
    const resp=await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp=resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item=>{
        const data={
            videoId:item.id?.videoId,
            title:item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList",youtubeVideoList);
    return youtubeVideoList;
}
