import { createClient } from "@/lib/supabase/client";

export async function getSmartlinksClient() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('smartlinks')
    .select('id, smartlink_tag, name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching smartlinks:', error);
    throw error;
  }

  return data;
}

export async function deleteSmartlinkClient(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('smartlinks')
    .delete()
    .match({ id });

  if (error) {
    console.error('Error deleting smartlink:', error);
    throw error;
  }
}

// ... (add other client-side functions as needed)