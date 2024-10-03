import { NextResponse } from 'next/server';
import { deleteSmartlinkServer, getSmartlink, createSmartlink, updateSmartlink } from "@/lib/db/smartlinks";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  
  try {
    await deleteSmartlinkServer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting smartlink:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const smartlink = await getSmartlink(id);
    return NextResponse.json(smartlink);
  } catch (error) {
    console.error('Error fetching smartlink:', error);
    return NextResponse.json({ error: 'Failed to fetch smartlink' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const smartlink = await createSmartlink(formData);
    return NextResponse.json({ id: smartlink.id });
  } catch (error) {
    console.error('Error creating smartlink:', error);
    return NextResponse.json({ error: 'Failed to create smartlink' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, ...formData } = await request.json();

  try {
    const smartlink = await updateSmartlink(id, formData);
    return NextResponse.json(smartlink);
  } catch (error) {
    console.error('Error updating smartlink:', error);
    return NextResponse.json({ error: 'Failed to update smartlink' }, { status: 500 });
  }
}