"use client"

import { useMemo, useState } from 'react'

const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const

export default function WidgetBuilderPage() {
  const [projectId, setProjectId] = useState('demo-project')
  const [position, setPosition] = useState<(typeof positions)[number]>('bottom-right')

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams()
    if (projectId) params.set('projectId', projectId)
    if (position) params.set('pos', position)
    return `/widget?${params.toString()}`
  }, [projectId, position])

  const embedCode = `<iframe src="${iframeSrc}" style="width:400px;height:520px;border:0;" allow="clipboard-read; clipboard-write"></iframe>`

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Widget builder</h1>
          <p className="text-gray-600">Adjust settings and see the widget update live. Changes here update the preview immediately.</p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="space-y-6 rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
              <input
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                placeholder="demo-project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <div className="grid grid-cols-2 gap-2">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`rounded-lg border px-3 py-2 text-sm capitalize transition ${
                      pos === position
                        ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#1D4ED8]'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Embed code</label>
              <textarea
                readOnly
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono text-gray-700 bg-gray-50 h-20"
                value={embedCode}
              />
              <p className="text-xs text-gray-500 mt-1">Copy this iframe into your site to embed the widget.</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 shadow-sm bg-gray-50/50 p-4">
            <div className="text-sm text-gray-600 mb-2">Live preview</div>
            <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden max-w-md">
              <iframe
                key={iframeSrc}
                src={iframeSrc}
                title="Widget preview"
                className="w-full"
                style={{ height: 520 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




