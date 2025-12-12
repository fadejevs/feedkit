import { NextRequest, NextResponse } from 'next/server'

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
        { status: 400 }
      )
    }

    // Handle image if provided
    let imageUrl = null
    if (image && image.size > 0) {
      // TODO: Upload image to storage (Supabase Storage, S3, etc.)
      // For now, just log that an image was received
      console.log('Image received:', {
        name: image.name,
        size: image.size,
        type: image.type,
      })
      // In production, you would upload the image and get a URL
      // imageUrl = await uploadImageToStorage(image)
    }

    // TODO: Save to database (Supabase or your preferred database)
    // For now, just log it
    console.log('Feedback received:', {
      type,
      message,
      projectId,
      url,
      hasImage: !!image,
      imageUrl,
      timestamp: new Date().toISOString(),
    })

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

