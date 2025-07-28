import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            async accessToken() {
                try {
                    const authObject = await auth();
                    
                    // Check if user is authenticated
                    if (!authObject.userId) {
                        console.warn('User not authenticated');
                        return null;
                    }

                    // Get fresh token with template to ensure it's valid for Supabase
                    const token = await authObject.getToken({
                        template: 'supabase'
                    });
                    
                    if (!token) {
                        console.warn('No token received from Clerk');
                        return null;
                    }
                    
                    return token;
                } catch (error) {
                    console.error('Failed to get access token:', error);
                    
                    // If it's a JWT expired error, try to get a fresh token
                    if (error instanceof Error && error.message.includes('expired')) {
                        try {
                            console.log('Attempting to refresh expired token...');
                            const authObject = await auth();
                            const freshToken = await authObject.getToken({
                                template: 'supabase',
                                skipCache: true // Force fresh token
                            });
                            return freshToken;
                        } catch (refreshError) {
                            console.error('Failed to refresh token:', refreshError);
                            return null;
                        }
                    }
                    
                    return null;
                }
            }
        }
    );
}
