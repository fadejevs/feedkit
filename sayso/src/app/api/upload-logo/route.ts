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
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    if (!projectId) {
      return NextResponse.json(
        { error: 'No project ID provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 2MB' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    const supabase = createServiceRoleClient()
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${projectId}/${Date.now()}.${fileExt}`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('widget-logos')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Supabase storage error:', error)
      // Check if bucket doesn't exist
      if (error.message?.includes('Bucket not found') || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Storage bucket not configured. Please create a "widget-logos" bucket in Supabase Storage.', details: error.message },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
      }
      return NextResponse.json(
        { error: 'Failed to upload file', details: error.message },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('widget-logos')
      .getPublicUrl(fileName)

    return NextResponse.json(
      { url: urlData.publicUrl, success: true },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error: any) {
    console.error('Error uploading logo:', error)
    return NextResponse.json(
      { error: 'Failed to upload logo', details: error.message },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

