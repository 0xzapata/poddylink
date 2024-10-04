import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { id } = await request.json()
  const supabase = createClient(cookies())

  try {
    const { data, error } = await supabase.rpc('increment_smartlink_visits', { smartlink_id: id })

    if (error) throw error

    return NextResponse.json({ visits: data })
  } catch (error) {
    console.error('Error updating visit count:', error)
    return NextResponse.json({ error: 'Failed to update visit count' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const supabase = createClient(cookies())

  if (!id) {
    return NextResponse.json({ error: 'Missing smartlink ID' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('smartlinks')
      .select('visits')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: 'Smartlink not found' }, { status: 404 })
    }

    return NextResponse.json({ visits: data.visits })
  } catch (error) {
    console.error('Error fetching visit count:', error)
    return NextResponse.json({ error: 'Failed to fetch visit count' }, { status: 500 })
  }
}