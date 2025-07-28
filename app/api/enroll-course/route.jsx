import {currentUser} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import {NextResponse} from "next/server";

export async function POST(req) {
    const {courseId}=await req.json();
    const user=await currentUser();

    // if user is enrolled in course
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('enrollCourse')
        .select('*')
        .eq('cid', courseId)
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress)
        .single();
    if (!data) {
        const { data, error } = await supabase
            .from('enrollCourse')
            .insert([
                {
                    cid: courseId,
                    userEmail: user?.primaryEmailAddress?.emailAddress
                }
            ]);
        return NextResponse.json(data);
    }
    if (error) {
        console.error('Supabase error in enroll-course API:', error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({'resp':'Already Enrolled'});
}

export async function GET(req){
    const user=await currentUser();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    if(courseId){
        const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('enrollCourse')
        .select(`*, courses:cid(*)`)
        .order('created_at', { ascending: false })
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress)
        .eq('cid',courseId);
    if (error) {
        console.error('Supabase error in enroll-course GET API:', error);
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
        .from('enrollCourse')
        .select(`*, courses:cid(*)`)
        .order('created_at', { ascending: false })
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress);
    if (error) {
        console.error('Supabase error in enroll-course GET API (else case):', error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}
}

export async function PUT(req) {
    const {completedChapter,courseId}=await req.json();
    const user=await currentUser();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('enrollCourse')
        .update({completedChapter})
        .eq('cid', courseId)
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress);
    if (error) {
        console.error('Supabase error in enroll-course PUT API:', error);
        if (error.code === 'PGRST301') {
            return NextResponse.json({ error: 'Authentication session expired. Please sign in again.' }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}