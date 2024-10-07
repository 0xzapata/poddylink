import { NextResponse } from 'next/server';
import { deleteSmartlinkServer, getSmartlink, createSmartlink, updateSmartlink } from "@/lib/db/smartlinks";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  
  try {
    await deleteSmartlinkServer(id, userId);
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
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.json();

  try {
    const smartlink = await createSmartlink(formData, userId);
    return NextResponse.json({ id: smartlink.id });
  } catch (error) {
    console.error('Error creating smartlink:', error);
    return NextResponse.json({ error: 'Failed to create smartlink' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, ...formData } = await request.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const smartlink = await updateSmartlink(id, formData, userId);
    return NextResponse.json(smartlink);
  } catch (error) {
    console.error('Error updating smartlink:', error);
    return NextResponse.json({ error: 'Failed to update smartlink' }, { status: 500 });
  }
}