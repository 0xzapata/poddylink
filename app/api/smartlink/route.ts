import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const supabase = createClient(cookies());
  const formData = await req.json();

  const { data: smartlinkData, error: smartlinkError } = await supabase
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
    .single();

  if (smartlinkError) {
    return NextResponse.json({ error: smartlinkError.message }, { status: 400 });
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
