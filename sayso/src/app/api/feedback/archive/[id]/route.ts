import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabaseClient'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json().catch(() => ({}))
    const archived = body.archived !== undefined ? body.archived : true
    
    const supabase = createServiceRoleClient()
    
    const { error } = await supabase
      .from('feedback')
      .update({ archived })
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: archived ? 'Failed to archive feedback' : 'Failed to unarchive feedback', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}

