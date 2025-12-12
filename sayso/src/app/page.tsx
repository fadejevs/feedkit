"use client"
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { IntegrationCard } from '@/components/IntegrationCard'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth'

export default function LandingPage() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <div className="relative z-10 bg-white">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-16 pb-4 sm:pt-24 sm:pb-6 overflow-hidden min-h-[550px] sm:min-h-[650px]">
        {/* Animated Background - covers entire hero section */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatedBackground />
        </div>
        
        {/* Background decorative circle */}
        <div className="absolute top-0 left-0 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 rounded-full -translate-x-[30%] -translate-y-[30%] opacity-30 blur-3xl z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 leading-[1.1]">
            Build more of what<br />
            customers want
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Capture, organize, and announce product feedback in one place.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 rounded-lg bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition text-base inline-flex items-center gap-2"
            >
              Start for free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition text-base inline-flex items-center gap-3 h-[48px]">
              <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Watch the demo</span>
              <span className="text-gray-500 text-sm">15s</span>
            </button>
          </div>
          <p className="text-sm text-gray-500">
            14-day free trial. No credit card required.
          </p>
        </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <FeatureCard title="Feedback Boards" active />
          <FeatureCard title="Public Roadmaps" />
          <FeatureCard title="Announcements" />
          <FeatureCard title="Surveys" />
        </div>
      </section>

      {/* Demo Section - Coming Soon */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex items-center justify-center py-24 sm:py-32">
            <div className="text-center">
              <p className="text-xl sm:text-2xl text-gray-500 font-medium">Demo coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
          <CompanyLogo name="orange" />
          <CompanyLogo name="Canary Mail" />
          <CompanyLogo name="Landbook" />
          <CompanyLogo name="Dash" />
          <CompanyLogo name="Zion Builder" />
          <CompanyLogo name="Superlist" />
        </div>
        <div className="flex items-center justify-center gap-8 mt-8">
          <TrustBadge name="Trustpilot" rating="4.6" />
          <TrustBadge name="Capterra" rating="4.8" />
          <TrustBadge name="G2 CROWD" rating="4.8" />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* Two Flavors Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Feedkit comes in two flavors.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FlavorCard
            title="Feedkit web app"
            subtitle="Web App"
            description="Capture, plan and publish ideas on the web."
            cta="Sign up to try"
            href="/dashboard"
            gradient="from-[#2563EB]/10 via-[#2563EB]/5 to-[#818CF8]/10"
            type="webapp"
          />
          <FlavorCard
            title="Feedkit widget"
            subtitle="Widget"
            description="Capture, plan and publish ideas on your own site."
            cta="Sign up to try"
            href="/dashboard"
            gradient="from-[#F97316]/10 via-[#F97316]/5 to-[#FB923C]/10"
            type="widget"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="I've tried all the competitor products before and Feedkit has by far the best UI/UX. The team seem to be smashing out new features every week at an impressive speed."
              author="Nizamudheen Valliyattu"
              role="Founder, Acadle"
              avatar="N"
            />
            <TestimonialCard
              quote="I tried two other tools like Feedkit, both of which were good enough, but what set Feedkit above the rest was its simple and elegant design. It was quick to set up, the widget was installed in 10 minutes on my website. I'm happy I went with Feedkit!"
              author="Eric Lonegan"
              role="Founder"
              avatar="E"
            />
            <TestimonialCard
              quote="We recently moved from User Voice to Feedkit after evaluating 16 other options. Right from the start, Feedkit has been helpful and responsive and I highly recommend checking them out. I couldn't ask for better service."
              author="Annika Hubert"
              role="Product Ops, Agrimaster"
              avatar="A"
            />
            <TestimonialCard
              quote="Minimalistic UI, great UX, very easy to use. After spending 5 minutes in the app you can feel the quality build. Has SSO feature which was the reason I switched over to Feedkit. Highly recommended."
              author="Andrey Kholkin"
              role="CEO, Weberlo"
              avatar="A"
            />
            <TestimonialCard
              quote="Feedkit is thoughtfully designed and simple to use while offering a complex and powerful level of customizability. It integrates seamlessly into our web app and has become a crucial part of the feedback loop with our customers."
              author="Sam Hulick"
              role="Co-Founder, ReelCrafter"
              avatar="S"
            />
            <TestimonialCard
              quote="I love Feedkit. Absolutely changed the way we interact with our customers. Saved ourselves ALOT of money and time in guesses for next features and let our customer tell us what they want."
              author="Vaibhav Namburi"
              role="Founder, Remote Workly"
              avatar="V"
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Background gradient with complementary colors */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 via-indigo-50 to-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl" />
        
        <div className="relative text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Built for teams that want to ship better products, faster.
          </h2>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureItem 
            icon={<InlineAdminIcon />} 
            title="Inline Admin" 
            description="Manage your entire board from within the same view"
            color="#2563EB"
          />
          <FeatureItem 
            icon={<SSOIcon />} 
            title="SSO Authentication" 
            description="Integrate directly with your platform for a seamless user experience"
            color="#818CF8"
          />
          <FeatureItem 
            icon={<WidgetIcon />} 
            title="Unlimited Widgets" 
            description="Create as many widget as you like on all plans."
            color="#F97316"
          />
          <FeatureItem 
            icon={<TranslationIcon />} 
            title="Full Translations" 
            description="Every word is translatable into your own language"
            color="#FB923C"
          />
          <FeatureItem 
            icon={<ThemeIcon />} 
            title="Themes" 
            description="Update Feedkit with your own brand colours."
            color="#2563EB"
          />
          <FeatureItem 
            icon={<StatusIcon />} 
            title="Automatic Status Updates" 
            description="Keep customers updated with automated emails."
            color="#818CF8"
          />
        </div>
      </section>

      {/* Product Showcase Sections */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductShowcase
            title="Capture Ideas"
            description="Customer feedback is the lifeblood of your product. Capture ideas from your customers and let the most voted and commented on ideas surface to the top."
            linkText="Learn about capturing Ideas"
            imageSide="right"
            gradient="from-[#2563EB]/10 via-[#818CF8]/5 to-[#2563EB]/10"
          />
          <ProductShowcase
            title="Build a public roadmap"
            description="Turn customer ideas into a stunning product roadmap and let users know what's up next."
            linkText="Learn about Roadmaps"
            imageSide="left"
            gradient="from-[#F97316]/10 via-[#FB923C]/5 to-[#F97316]/10"
          />
          <ProductShowcase
            title="Prioritize and plan ahead"
            description="Fully customise Benefit and Cost scores according to your business priorities. Easily identify Quick Wins and Major Projects."
            linkText="Learn about Prioritization"
            imageSide="right"
            gradient="from-[#2563EB]/10 via-[#818CF8]/5 to-[#2563EB]/10"
          />
          <ProductShowcase
            title="Announcements"
            description="Keep your customers informed as you ship new features. Announcements is our version of Changelog. And we think you'll love it."
            linkText="Learn about Announcements"
            imageSide="left"
            gradient="from-[#F97316]/10 via-[#FB923C]/5 to-[#F97316]/10"
          />
        </div>
      </section>

      {/* Integrations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">Integrations</h2>
          <p className="text-lg text-gray-600">
            Connect Feedkit to the tools that you already use.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {integrations.slice(0, 12).map((integration) => (
            <IntegrationCard key={integration.name} name={integration.name} description={integration.description} />
          ))}
        </div>
        <div className="text-center">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-[#2563EB] font-medium hover:from-blue-100 hover:to-indigo-100 transition">
            Show more
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">Pricing</h2>
          </div>

          <div className="grid gap-6 sm:gap-8 max-w-5xl mx-auto sm:grid-cols-3">
            <PricingCard
              name="Free"
              price="Free"
              description="Perfect to start collecting feedback for your app"
              features={['25 total feedback submissions']}
              cta="Get started"
              href="/dashboard"
            />
            <PricingCard
              name="Pro"
              price="$19"
              priceSubtext="/month"
              description="Suitable for production applications and websites of all sizes"
              features={['Unlimited feedback submissions']}
              cta="Get started"
              href="/dashboard"
              highlighted
            />
            <PricingCard
              name="Enterprise"
              price="Enterprise"
              description="Talk to us about your custom needs"
              features={['Whitelabeling', 'Service-level agreements', 'Live chat support']}
              cta="Contact us"
              href="mailto:hello@feedkit.co"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight text-gray-900">
            Start managing customer<br />
            feedback — today.
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 rounded-lg bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition text-base"
            >
              Get Started
            </Link>
            <Link 
              href="#" 
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition text-base"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}

function FeatureCard({ title, active }: { title: string; active?: boolean }) {
  const accentColors = ['#2563EB', '#818CF8', '#F97316', '#FB923C']
  const accentColor = accentColors[title.length % accentColors.length]
  
  return (
    <div className={`bg-white border rounded-lg p-4 sm:p-6 transition cursor-pointer text-center ${
      active 
        ? 'border-[#2563EB] border-2 shadow-sm' 
        : 'border-gray-200 hover:border-opacity-60 hover:shadow-sm'
    }`} style={!active ? { 
      borderColor: `${accentColor}40`,
      transition: 'all 0.3s ease'
    } : {}}>
      <h3 className={`font-semibold text-sm sm:text-base ${
        active ? 'text-[#2563EB]' : 'text-gray-900'
      }`}>{title}</h3>
    </div>
  )
}

function CompanyLogo({ name }: { name: string }) {
  return (
    <div className="text-gray-400 font-medium text-sm sm:text-base uppercase">
      {name}
    </div>
  )
}

function TrustBadge({ name, rating }: { name: string; rating: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-gray-500 text-sm">{name}</div>
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">★★★★★</span>
        <span className="text-gray-600 text-sm">{rating}/5</span>
      </div>
    </div>
  )
}

function IdeaCard({ votes, title, description, author, date, tags, badges }: {
  votes: number
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  badges: string[]
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-[#2563EB] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-900 mt-1">{votes}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
            <span>{author} • {date}</span>
            {tags.map((tag, i) => (
              <span key={i} className="text-[#2563EB]">#{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {badges.map((badge, i) => (
              <span key={i} className="px-2 py-1 border border-[#2563EB] rounded text-xs text-[#2563EB]">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FlavorCard({ title, subtitle, description, cta, href, gradient, type }: {
  title: string
  subtitle: string
  description: string
  cta: string
  href: string
  gradient: string
  type: 'webapp' | 'widget'
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition">
      {type === 'webapp' ? (
        <div className={`bg-gradient-to-r ${gradient} p-4`}>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#2563EB] rounded text-white flex items-center justify-center text-xs font-bold">A</div>
              <span className="text-sm font-medium text-gray-900">Acme</span>
              <div className="flex items-center gap-2 ml-auto text-xs text-gray-600">
                <span>Ideas</span>
                <span>Roadmap</span>
                <span>Announcements</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-4">Admin only</div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Feature requests</div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-50 rounded border border-gray-200"></div>
              <div className="h-16 bg-gray-50 rounded border border-gray-200"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`bg-gradient-to-br ${gradient} p-8 relative`}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Announcements</h3>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Launched a new feature!</h4>
                  <span className="text-xs text-gray-500">1 DAY AGO</span>
                </div>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs mb-2">New feature</span>
                <div className="h-24 bg-gray-100 rounded mb-2"></div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👍 12</span>
                  <span>🔥 5</span>
                </div>
              </div>
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Announcement payments</h4>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>👍 8</span>
                  <span>🔥 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mb-1 font-medium">{subtitle}</p>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <Link href={href} className="text-[#2563EB] font-medium hover:text-[#059669] text-sm inline-flex items-center gap-1">
          {cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar: string }) {
  const accentColors = ['#2563EB', '#818CF8', '#F97316', '#FB923C']
  const accentColor = accentColors[author.length % accentColors.length]
  
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition" style={{
      borderTopColor: `${accentColor}40`,
      borderTopWidth: '3px'
    }}>
      <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-medium" style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`
        }}>
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-opacity-60 hover:shadow-md transition" style={{
      borderColor: color ? `${color}30` : undefined
    }}>
      <div className="mb-3" style={{ color: color || '#10B981' }}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  )
}

function InlineAdminIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth={1.5} fill="none" />
      <rect x="6" y="8" width="8" height="4" rx="1" strokeWidth={1.5} fill="none" />
    </svg>
  )
}

function SSOIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function WidgetIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

function TranslationIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  )
}

function ThemeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  )
}

function StatusIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}

function ProductShowcase({ title, description, linkText, imageSide, gradient }: {
  title: string
  description: string
  linkText: string
  imageSide: 'left' | 'right'
  gradient: string
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center mb-16 sm:mb-20`}>
      {imageSide === 'left' && (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-8 h-96 flex items-center justify-center relative overflow-hidden shadow-xl`}>
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl m-4 border border-gray-200 shadow-lg"></div>
          <div className="relative z-10 text-gray-400 text-sm font-medium">Feedkit—{title}</div>
        </div>
      )}
      <div className={imageSide === 'left' ? 'md:order-2' : ''}>
        <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">{description}</p>
              <Link href="#" className="text-[#2563EB] font-medium hover:text-[#1D4ED8] inline-flex items-center gap-1 transition">
                {linkText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
      </div>
      {imageSide === 'right' && (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-8 h-96 flex items-center justify-center relative overflow-hidden shadow-xl`}>
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl m-4 border border-gray-200 shadow-lg"></div>
          <div className="relative z-10 text-gray-400 text-sm font-medium">Feedkit—{title}</div>
        </div>
      )}
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
      className={`rounded-xl p-6 sm:p-8 border-2 ${
        highlighted
          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="mb-4">
        <span className="text-4xl sm:text-5xl font-bold">{price}</span>
        {priceSubtext && <span className={`text-base sm:text-lg ml-1 ${highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{priceSubtext}</span>}
      </div>
      <p className={`text-sm sm:text-base mb-6 ${highlighted ? 'text-blue-50' : 'text-gray-600'}`}>{description}</p>
      <Link
        href={href}
        className={`block text-center py-3 rounded-lg font-medium transition mb-6 ${
          highlighted
            ? 'bg-white text-[#2563EB] hover:bg-gray-50'
            : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
        }`}
      >
        {cta}
      </Link>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-blue-200' : 'text-[#2563EB]'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const integrations = [
  { name: 'Slack', description: 'Message Slack when new Ideas are created.' },
  { name: 'Jira', description: 'Send new Ideas from Feedkit straight to Jira.' },
  { name: 'Trello', description: 'Send new Ideas from Feedkit straight to Trello.' },
  { name: 'Zendesk', description: 'Create & manage Ideas inside of Zendesk.' },
  { name: 'Intercom', description: 'Create & manage Ideas inside of Intercom.' },
  { name: 'Help Scout', description: 'Create & manage Ideas inside of Help Scout.' },
  { name: 'Zapier', description: 'Automate your Feedkit workflows with Zapier.' },
  { name: 'Google Docs', description: 'Send new Ideas directly to a Google Doc.' },
  { name: 'Google Sheets', description: 'Send new Ideas directly to a Google Sheet.' },
  { name: 'Monday.com', description: 'Send new Ideas from Feedkit straight to Monday.com.' },
  { name: 'Miro', description: 'Send Ideas from Feedkit straight to Miro.' },
  { name: 'Azure', description: 'Send new Ideas from Feedkit straight to Azure.' },
  { name: 'Linear', description: 'Send new Ideas from Feedkit straight to Linear.' },
  { name: 'Asana', description: 'Send new Ideas from Feedkit straight to Asana.' },
  { name: 'Basecamp', description: 'Send new Ideas from Feedkit straight to Basecamp.' },
  { name: 'Airtable', description: 'Send new Ideas from Feedkit straight to Airtable.' },
]
