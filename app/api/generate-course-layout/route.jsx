import {
    GoogleGenAI,
  } from '@google/genai';
import { NextResponse } from 'next/server';
import axios from 'axios';
import {currentUser} from "@clerk/nextjs/server";

  const PROMPT=`Generate Learning Course depends on the following details. In which make sure to add course name, description, course banner image prompt (create a modern, flat-style 2D digital illustration representing user topic. include ui/ux elements such as mockup screens, text blocks, icons, buttons and creative workspace tools. add symbolic elements related to user course, like sticky notes, design components and visual aids. use a vibrant colour palette with a clean, professional look. the illustration should feel creative, tech savvy and educational, ideal for visualizing concepts in user course) for course banner in 3d format chapter name, topic under each chapters, duration for each chapter etc. in JSON format only.
  schema:
  {
  "course":{
  "name":"string",
  "description":"string",
  "category":"string",
  "level":"string",
  "noOfChapters":"number",
  "includeVideo":"boolean",
  "bannerImagePrompt":"string",
  "chapters":[
    {
      "chapterName":"string",
      "topics":["string"],
      "duration":"string",
    }
  ]
  }
  },
  User Input:`

  export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export async function POST(req){
    const {courseId,...formData}=await req.json();
    const user=await currentUser();
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      // thinkingConfig: {
      //   thinkingBudget: -1,
      // },
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-pro';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: PROMPT+JSON.stringify(formData),
          },
        ],
      },
    ];
  
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    
    console.log(response.candidates[0].content.parts[0].text);
    const RawResp=response?.candidates[0]?.content?.parts[0]?.text
    const RawJson=RawResp.replace('```json','').replace('```','');
    const JSONResp=JSON.parse(RawJson);
    const ImagePrompt=JSONResp.course?.bannerImagePrompt;

    // Generate Banner Image
    const bannerImageUrl= await GenerateImage(ImagePrompt);
    // Save to Database
    // const result=await db.insert(coursesTable).values({
    //     ...formData,
    //     courseJson:JSONResp,
    //     userEmail:user?.primaryEmailAddress?.emailAddress,
    //     cid:courseId,
    //     bannerImageUrl:bannerImageUrl
    // })

    return NextResponse.json({courseId:courseId});
}
  
const GenerateImage=async(imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
return result.data.image;
}
