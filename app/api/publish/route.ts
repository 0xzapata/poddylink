import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// This would be replaced with a database in a real application
const publishedSmartlinks: Record<string, unknown> = {}

export async function POST(request: Request) {
  const smartlinkData = await request.json()
  const id = uuidv4()
  publishedSmartlinks[id] = smartlinkData

  return NextResponse.json({ id })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id || !publishedSmartlinks[id]) {
    return NextResponse.json({ error: "Smartlink not found" }, { status: 404 })
  }

  return NextResponse.json(publishedSmartlinks[id])
}
