import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabaseClient'

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params
    const { searchParams } = new URL(request.url)
    const archived = searchParams.get('archived') === 'true'
    const type = searchParams.get('type')

    const supabase = createServiceRoleClient()
    
    let query = supabase
      .from('feedback')
      .select('*')
      .eq('project_id', projectId)
      .eq('archived', archived)
      .order('created_at', { ascending: false })

    if (type && type !== 'all') {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch feedback', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Transform Supabase data to match frontend interface
    const feedback = (data || []).map((item: any) => ({
      id: item.id,
      type: item.type,
      message: item.message,
      imageUrl: item.image_url,
      userEmail: item.user_email,
      device: item.device,
      page: item.page,
      createdAt: new Date(item.created_at).getTime(),
      archived: item.archived,
      projectId: item.project_id,
    }))

    return NextResponse.json(
      { feedback },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

