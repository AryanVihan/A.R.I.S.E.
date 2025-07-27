import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { createSupabaseClient } from "@/lib/supabase";

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
        const RawJson = RawResp.replace('```json', '').replace('```', '');
        const JSONResp = JSON.parse(RawJson);

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
    console.log("Updating courseContent for cid:", courseId);
    console.log("CourseContent being saved:", CourseContent);

    // Save to DB (Supabase)
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('courses')
        .update({ courseContent: CourseContent })
        .eq('id', courseId);

    // Debug: Log after update
    console.log("Supabase update result:", data, "error:", error);

    if (error) {
        console.error("Supabase Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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
        maxResult: 4,
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
