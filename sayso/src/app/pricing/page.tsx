import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#2563EB]" style={{ fontFamily: 'var(--font-handwritten), cursive', fontWeight: 700 }}>
              feedkit
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-neutral-700 hover:text-black">Features</Link>
            <Link href="/pricing" className="text-sm text-neutral-700 hover:text-black font-medium">Pricing</Link>
            <Link href="/dashboard/transcribe" className="text-sm px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition">
              Start for free
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/dashboard/transcribe" className="text-sm px-3 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1d4ed8]">Start for free</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Pricing</h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 sm:gap-8 max-w-5xl mx-auto sm:grid-cols-3 mb-12 sm:mb-20">
          <PricingCard
            name="Free"
            price="Free"
            description="Perfect to start collecting feedback for your app"
            features={[
              '25 total feedback submissions',
            ]}
            cta="Get started"
            href="/dashboard/transcribe"
          />
          <PricingCard
            name="Pro"
            price="$19"
            priceSubtext="/month"
            description="Suitable for production applications and websites of all sizes"
            features={[
              'Unlimited feedback submissions',
            ]}
            cta="Get started"
            href="/dashboard/transcribe"
            highlighted
          />
          <PricingCard
            name="Enterprise"
            price="Enterprise"
            description="Talk to us about your custom needs"
            features={[
              'Whitelabeling',
              'Service-level agreements',
              'Live chat support',
            ]}
            cta="Contact us"
            href="mailto:hello@feedkit.co"
          />
        </div>

      </div>
    </div>
  )
}

function PricingCard({
  name,
  price,
  priceSubtext,
  description,
  features,
  cta,
  href,
  highlighted = false,
}: {
  name: string
  price: string
  priceSubtext?: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-8 ${
        highlighted
          ? 'bg-[#2563EB] text-white border-2 border-[#2563EB] shadow-2xl scale-105'
          : 'bg-white border-2 border-neutral-200'
      }`}
    >
      <div className="mb-4">
        <span className="text-5xl font-bold">{price}</span>
        {priceSubtext && <span className={`text-lg ${highlighted ? 'text-neutral-400' : 'text-neutral-500'}`}>{priceSubtext}</span>}
      </div>
      <p className={`text-sm mb-6 ${highlighted ? 'text-neutral-300' : 'text-neutral-600'}`}>{description}</p>
      <Link
        href={href}
        className={`block text-center py-3 rounded-lg font-medium transition mb-8 ${
          highlighted
            ? 'bg-white text-[#2563EB] hover:bg-gray-50'
            : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
        }`}
      >
        {cta}
      </Link>
      <ul className="space-y-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <svg
              className={`w-5 h-5 flex-shrink-0 ${highlighted ? 'text-blue-400' : 'text-blue-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{answer}</p>
    </div>
  )
}

