import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user=await currentUser();
    if(courseId){
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('cid', courseId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
else{
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress)
        .order('createdAt','desc');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
}