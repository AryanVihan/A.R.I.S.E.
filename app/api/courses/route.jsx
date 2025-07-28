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
        console.error('Supabase error in courses API:', error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
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
        .order('created_at','desc');

    if (error) {
        console.error('Supabase error in courses API:', error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
}