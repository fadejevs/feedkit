import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabaseClient'

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// GET widget settings
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params
    const supabase = createServiceRoleClient()
    
    const { data, error } = await supabase
      .from('widget_settings')
      .select('*')
      .eq('project_id', projectId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch widget settings', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Return default settings if none exist
    const defaultSettings = {
      accent_color: '#F97316',
      custom_logo: null,
      position: 'bottom-right',
    }

    return NextResponse.json(
      { settings: data || defaultSettings },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching widget settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch widget settings' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

// POST/PUT widget settings
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params
    const body = await request.json()
    const { accent_color, custom_logo, position } = body

    const supabase = createServiceRoleClient()
    
    // Upsert settings
    const { data, error } = await supabase
      .from('widget_settings')
      .upsert({
        project_id: projectId,
        accent_color: accent_color || '#F97316',
        custom_logo: custom_logo || null,
        position: position || 'bottom-right',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'project_id',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save widget settings', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    return NextResponse.json(
      { settings: data, success: true },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error saving widget settings:', error)
    return NextResponse.json(
      { error: 'Failed to save widget settings' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

