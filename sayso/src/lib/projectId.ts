/**
 * Generate or retrieve a unique project ID for a user
 * In production, this would be stored in a database
 */
export function getOrCreateProjectId(userId: string, userEmail: string): string {
  if (typeof window === 'undefined') {
    // Server-side: generate a deterministic ID based on user
    return generateProjectId(userId, userEmail)
  }

  // Client-side: check localStorage first
  const storageKey = `feedkit_project_${userId}`
  const stored = localStorage.getItem(storageKey)
  
  if (stored) {
    return stored
  }

  // Generate new project ID
  const projectId = generateProjectId(userId, userEmail)
  localStorage.setItem(storageKey, projectId)
  return projectId
}

/**
 * Generate a deterministic project ID from user ID and email
 * This ensures the same user always gets the same project ID
 */
function generateProjectId(userId: string, userEmail: string): string {
  // Create a hash-like string from user ID and email
  const input = `${userId}-${userEmail}`
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Convert to hex and pad to ensure consistent length
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0')
  
  // Add some randomness based on email for uniqueness
  const emailHash = userEmail.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const emailHex = Math.abs(emailHash).toString(16).padStart(8, '0')
  
  // Combine and return 16 character project ID
  return `${hexHash}${emailHex}`
}

/**
 * Get project ID from URL params
 */
export function getProjectIdFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname
  const match = path.match(/\/app\/([^\/]+)/)
  return match ? match[1] : null
}

