import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { auth } from "@clerk/nextjs/server";
import { updateSmartlink } from '@/lib/db/smartlinks';
import { SmartlinkData, Link, MainLink } from '@/app/smartlink/types';

export async function POST(req: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(cookies());
  const formData = await req.json();

  const { data: smartlinkData, error: smartlinkError } = await supabase
    .from('smartlinks')
    .insert({
      smartlink_tag: formData.smartlinkTag,
      name: formData.name,
      cover_photo: formData.coverPhoto,
      logo: formData.logo,
      description: formData.description,
      user_id: userId
    })
    .select()
    .single();

  if (smartlinkError) {
    return NextResponse.json({ error: smartlinkError.message }, { status: 400 });
  }

  const smartlinkId = smartlinkData.id;

  if (formData.mainLinks.length > 0) {
    const { error: mainLinksError } = await supabase
      .from('main_links')
      .insert(formData.mainLinks.map(link => ({
        smartlink_id: smartlinkId,
        url: link.url,
        type: link.type
      })));

    if (mainLinksError) {
      return NextResponse.json({ error: mainLinksError.message }, { status: 400 });
    }
  }

  if (formData.links.length > 0) {
    const { error: episodeLinksError } = await supabase
      .from('episode_links')
      .insert(formData.links.map(link => ({
        smartlink_id: smartlinkId,
        episode_name: link.episodeName,
        url: link.url,
        icon: link.icon
      })));

    if (episodeLinksError) {
      return NextResponse.json({ error: episodeLinksError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ id: smartlinkId });
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(cookies());
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const { data: smartlink, error: smartlinkError } = await supabase
    .from('smartlinks')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (smartlinkError) {
    return NextResponse.json({ error: smartlinkError.message }, { status: 400 });
  }

  if (!smartlink) {
    return NextResponse.json({ error: 'Smartlink not found or unauthorized' }, { status: 404 });
  }

  const { data: mainLinks, error: mainLinksError } = await supabase
    .from('main_links')
    .select('*')
    .eq('smartlink_id', id);

  if (mainLinksError) {
    return NextResponse.json({ error: mainLinksError.message }, { status: 400 });
  }

  const { data: episodeLinks, error: episodeLinksError } = await supabase
    .from('episode_links')
    .select('*')
    .eq('smartlink_id', id);

  if (episodeLinksError) {
    return NextResponse.json({ error: episodeLinksError.message }, { status: 400 });
  }

  return NextResponse.json({
    ...smartlink,
    mainLinks,
    links: episodeLinks
  });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const id = params.id;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const coverPhoto = formData.get('coverPhoto') as File | null;
    const logo = formData.get('logo') as File | null;
    const mainLinksJson = formData.get('mainLinks') as string;
    const linksJson = formData.get('links') as string;

    console.log('Received data:', { id, name, description, coverPhoto, logo, mainLinksJson, linksJson });

    // Handle file uploads
    const coverPhotoUrl = coverPhoto ? await uploadFile(coverPhoto) : undefined;
    const logoUrl = logo ? await uploadFile(logo) : undefined;

    const mainLinks: MainLink[] = mainLinksJson ? JSON.parse(mainLinksJson) : [];
    const links: Link[] = linksJson ? JSON.parse(linksJson) : [];

    const updatedData: Partial<SmartlinkData> = {
      name,
      description,
      coverPhoto: coverPhotoUrl,
      logo: logoUrl,
      mainLinks,
      links,
    };

    console.log('Updating with data:', updatedData);

    const updatedSmartlink = await updateSmartlink(id, updatedData, userId);
    console.log('Updated smartlink:', updatedSmartlink);

    return NextResponse.json(updatedSmartlink);
  } catch (error) {
    console.error('Error updating smartlink:', error);
    return NextResponse.json({ error: 'Failed to update smartlink' }, { status: 500 });
  }
}

async function uploadFile(file: File): Promise<string> {
  // Implement file upload logic here (e.g., using Supabase storage)
  // For now, just return a placeholder URL
  console.log('Uploading file:', file.name);
  return `https://placeholder.com/${file.name}`;
}