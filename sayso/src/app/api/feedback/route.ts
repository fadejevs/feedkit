import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabaseClient'

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get('type') as string
    const message = formData.get('message') as string
    const projectId = formData.get('projectId') as string | null
    const url = formData.get('url') as string
    const image = formData.get('image') as File | null

    if (!type || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Handle image if provided (convert to base64 for now)
    let imageUrl = null
    if (image && image.size > 0) {
      // Convert image to base64 data URL
      const arrayBuffer = await image.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      imageUrl = `data:${image.type};base64,${base64}`
    }

    // Get device info from headers
    const userAgent = request.headers.get('user-agent') || ''
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+\.\d+)/)
    const browser = browserMatch ? browserMatch[0] : ''
    const device = `${browser}, ${userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`

    // Save to Supabase
    let supabase
    try {
      supabase = createServiceRoleClient()
    } catch (supabaseError: any) {
      console.error('Failed to create Supabase client:', supabaseError)
      return NextResponse.json(
        { error: 'Database connection failed', details: supabaseError.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    const insertData = {
      type,
      message,
      project_id: projectId || null,
      page: url || null,
      image_url: imageUrl,
      device: device || null,
      user_email: null, // Can be added later if you collect email
      archived: false,
    }

    console.log('Inserting feedback:', { ...insertData, image_url: imageUrl ? '[has image]' : null })

    const { data, error } = await supabase
      .from('feedback')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to save feedback', details: error.message, code: error.code },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully', id: data.id },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error: any) {
    console.error('Error submitting feedback:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { error: 'Failed to submit feedback', details: error.message || 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

