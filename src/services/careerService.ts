import { supabase } from "@/lib/supabase";

interface JobApplication {
  position: string;
  fullName: string;
  email: string;
  phone?: string;
  resume: File;
  coverLetter?: string;
  portfolio?: string;
}

export async function submitJobApplication(data: JobApplication) {
  try {
    // Upload resume to Supabase storage
    const fileExt = data.resume.name.split('.').pop();
    const fileName = `${Date.now()}-${data.fullName.replace(/\s+/g, '-')}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('job-applications')
      .upload(fileName, data.resume);

    if (uploadError) {
      console.error('Error uploading resume:', uploadError);
      return { success: false, error: 'Failed to upload resume' };
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('job-applications')
      .getPublicUrl(fileName);

    // Insert application data into the database
    const { error: insertError } = await supabase
      .from('job_applications')
      .insert({
        position: data.position,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        resume_url: publicUrl,
        cover_letter: data.coverLetter,
        portfolio: data.portfolio,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error inserting application:', insertError);
      // Try to delete the uploaded file if database insertion fails
      await supabase.storage
        .from('job-applications')
        .remove([fileName]);
      return { success: false, error: 'Failed to submit application' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitJobApplication:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getJobApplications() {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Applications retrieved successfully!"
    };
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch applications"
    };
  }
};
