"use client"
import { useState } from 'react'

// Map integration names to their domains for logo fetching
function getIntegrationDomain(name: string): string {
  const domainMap: Record<string, string> = {
    'Slack': 'slack.com',
    'Jira': 'atlassian.com',
    'Trello': 'trello.com',
    'Zendesk': 'zendesk.com',
    'Intercom': 'intercom.com',
    'Help Scout': 'helpscout.com',
    'Zapier': 'zapier.com',
    'Google Docs': 'google.com',
    'Google Sheets': 'google.com',
    'Monday.com': 'monday.com',
    'Miro': 'miro.com',
    'Azure': 'microsoft.com',
    'Linear': 'linear.app',
    'Asana': 'asana.com',
    'Basecamp': 'basecamp.com',
    'Airtable': 'airtable.com',
  }
  return domainMap[name] || name.toLowerCase().replace(/\s+/g, '') + '.com'
}

// Get logo URLs with fallbacks - using multiple reliable sources
function getIntegrationLogos(name: string): string[] {
  const domain = getIntegrationDomain(name)
  
  // Map specific names to their Simple Icons slug
  const simpleIconsMap: Record<string, string> = {
    'Slack': 'slack',
    'Jira': 'jira',
    'Trello': 'trello',
    'Zendesk': 'zendesk',
    'Intercom': 'intercom',
    'Help Scout': 'helpscout',
    'Zapier': 'zapier',
    'Google Docs': 'googledocs',
    'Google Sheets': 'googlesheets',
    'Monday.com': 'monday',
    'Miro': 'miro',
    'Azure': 'microsoftazure',
    'Linear': 'linear',
    'Asana': 'asana',
    'Basecamp': 'basecamp',
    'Airtable': 'airtable',
  }
  
  const simpleIconSlug = simpleIconsMap[name] || name.toLowerCase().replace(/\s+/g, '').replace('.com', '')
  
  // Return multiple fallback options
  return [
    `https://unavatar.io/${domain}?fallback=false`,
    `https://logo.clearbit.com/${domain}`,
    `https://cdn.simpleicons.org/${simpleIconSlug}`,
  ]
}

export function IntegrationCard({ name, description }: { name: string; description: string }) {
  const logoUrls = getIntegrationLogos(name)
  const [logoError, setLogoError] = useState(false)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  
  const handleError = () => {
    // Try next fallback logo
    if (currentLogoIndex < logoUrls.length - 1) {
      setCurrentLogoIndex(currentLogoIndex + 1)
    } else {
      // All logos failed, show fallback
      setLogoError(true)
    }
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition cursor-pointer">
      <div className="w-10 h-10 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {logoError ? (
          <span className="text-gray-500 text-xs font-semibold">{name.charAt(0)}</span>
        ) : (
          <img
            src={logoUrls[currentLogoIndex]}
            alt={name}
            className="w-full h-full object-contain p-1.5"
            onError={handleError}
            loading="lazy"
            crossOrigin="anonymous"
          />
        )}
      </div>
      <h4 className="font-medium text-sm text-gray-900 mb-1">{name}</h4>
      {description && <p className="text-xs text-gray-500 leading-relaxed">{description}</p>}
    </div>
  )
}

