import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SmartlinkData, SmartlinkFormData } from '@/app/smartlink/types';

export async function getSmartlinksServer(userId: string): Promise<Partial<SmartlinkData>[]> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('smartlinks')
    .select('id, smartlink_tag, name, visits')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching smartlinks:', error);
    throw error;
  }

  return data;
}

export async function deleteSmartlinkServer(id: string, userId: string): Promise<void> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { error } = await supabase
    .from('smartlinks')
    .delete()
    .match({ id, user_id: userId });

  if (error) {
    console.error('Error deleting smartlink:', error);
    throw error;
  }

  revalidatePath('/');
}

export async function createSmartlink(formData: SmartlinkFormData, userId: string): Promise<SmartlinkData> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('smartlinks')
    .insert({
      smartlink_tag: formData.smartlinkTag,
      name: formData.name,
      cover_photo: formData.coverPhoto,
      logo: formData.logo,
      description: formData.description,
      main_links: formData.mainLinks,
      links: formData.links,
      user_id: userId
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating smartlink:', error);
    throw error;
  }

  return data;
}

export async function getSmartlink(id: string): Promise<SmartlinkData> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('smartlinks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching smartlink:', error);
    throw error;
  }

  return data;
}

export async function updateSmartlink(id: string, data: Partial<SmartlinkData>, userId: string): Promise<SmartlinkData> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log('Updating smartlink:', { id, data, userId });

  // First, check if the smartlink exists and belongs to the user
  const { data: existingSmartlink, error: fetchError } = await supabase
    .from('smartlinks')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (fetchError || !existingSmartlink) {
    console.error('Smartlink not found or unauthorized:', fetchError);
    throw new Error('Smartlink not found or unauthorized');
  }

  // Update the smartlink
  const { data: updatedSmartlink, error: updateError } = await supabase
    .from('smartlinks')
    .update({
      name: data.name,
      description: data.description,
      cover_photo: data.coverPhoto,
      logo: data.logo,
      main_links: data.mainLinks,
      links: data.links,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating smartlink:', updateError);
    throw updateError;
  }

  console.log('Smartlink updated successfully:', updatedSmartlink);

  revalidatePath('/');
  return updatedSmartlink;
}