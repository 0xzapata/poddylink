import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getSmartlinksServer() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('smartlinks')
    .select('id, smartlink_tag, name, visits')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching smartlinks:', error);
    throw error;
  }

  return data;
}

export async function deleteSmartlinkServer(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { error } = await supabase
    .from('smartlinks')
    .delete()
    .match({ id });

  if (error) {
    console.error('Error deleting smartlink:', error);
    throw error;
  }

  revalidatePath('/');
}

export async function createSmartlink(formData: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('smartlinks')
    .insert({
      smartlink_tag: formData.smartlinkTag,
      name: formData.name,
      cover_photo: formData.coverPhoto,
      logo: formData.logo,
      description: formData.description
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating smartlink:', error);
    throw error;
  }

  return data;
}

export async function getSmartlink(id: string) {
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

export async function updateSmartlink(id: string, formData: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('smartlinks')
    .update({
      smartlink_tag: formData.smartlinkTag,
      name: formData.name,
      cover_photo: formData.coverPhoto,
      logo: formData.logo,
      description: formData.description
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating smartlink:', error);
    throw error;
  }

  revalidatePath('/');
  return data;
}