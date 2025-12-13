"use client"
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { IntegrationCard } from '@/components/IntegrationCard'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { Footer } from '@/components/Footer'
import { BrandLogo } from '@/components/BrandLogo'
import { useAuth } from '@/hooks/useAuth'

function LandingPageContent() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <div className="relative z-10 bg-white">
      <Navbar />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 w-full pt-16 pb-4 sm:pt-24 sm:pb-6 overflow-hidden min-h-[550px] sm:min-h-[650px]">
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
      <section id="product" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Feedkit comes in two flavors.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FlavorCard
            title="Feedkit web app"
            description="Capture, plan and publish ideas on the web."
            cta="Sign up to try"
            href="/dashboard"
            gradient="from-[#2563EB]/10 via-[#2563EB]/5 to-[#818CF8]/10"
            type="webapp"
          />
          <FlavorCard
            title="Feedkit widget"
            description="Capture, plan and publish ideas on your own site."
            cta="Sign up to try"
            href="/dashboard"
            gradient="from-[#F97316]/10 via-[#F97316]/5 to-[#FB923C]/10"
            type="widget"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-gray-50 py-16 sm:py-20">
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
      </section> */}

      {/* Features Grid Section */}
      <section id="features" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
            title="One Dashboard" 
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
            title="Multiple Languages" 
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
      <section id="integrations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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
            <LifetimeDealCard />
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

function AnimatedWidgetDemo() {
  const [state, setState] = useState<'closed' | 'open' | 'form' | 'success'>('closed')
  const [selectedType, setSelectedType] = useState<'issue' | 'idea' | 'other' | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [cursorClicking, setCursorClicking] = useState(false)
  const [zoomedElement, setZoomedElement] = useState<string | null>(null)
  const [cursorVisible, setCursorVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
    let typeInterval: NodeJS.Timeout | undefined
    let cursorTimeout: NodeJS.Timeout | undefined

    switch (state) {
      case 'closed':
        setShowCursor(false)
        setCursorVisible(false)
        setZoomedElement(null)
        timeoutId = setTimeout(() => {
          setShowCursor(true)
          setCursorPos({ x: 50, y: 50 })
          setTimeout(() => setCursorVisible(true), 50)
          cursorTimeout = setTimeout(() => {
            setCursorClicking(true)
            setTimeout(() => {
              setCursorClicking(false)
              setState('open')
            }, 300)
          }, 800)
        }, 1500)
        break
      case 'open':
        // Move cursor to Idea button (middle column, center of the icon)
        // Header is ~56px (17.5% of 320px), content area starts at ~18%, button icon is at ~32% vertically
        setCursorVisible(false)
        cursorTimeout = setTimeout(() => {
          setCursorPos({ x: 50, y: 32 })
          setTimeout(() => setCursorVisible(true), 50)
        }, 500)
        timeoutId = setTimeout(() => {
          setZoomedElement('idea-button')
          setCursorClicking(true)
          setTimeout(() => {
            setCursorClicking(false)
            setZoomedElement(null)
            setSelectedType('idea')
            setState('form')
          }, 300)
        }, 2000)
        break
      case 'form':
        setZoomedElement(null)
        // Move cursor to textarea (left side where text starts, accounting for padding)
        // Header ~56px (17.5%), content padding 16px (5%), textarea padding 16px (5%), so text starts at ~10% from left, vertically at ~45%
        setCursorVisible(false)
        cursorTimeout = setTimeout(() => {
          setCursorPos({ x: 10, y: 45 })
          setTimeout(() => {
            setCursorVisible(true)
            setZoomedElement('textarea')
            setTimeout(() => {
              setZoomedElement(null)
            }, 400)
          }, 50)
        }, 300)
        // Simulate typing
        const text = "I love the new design! Could we add dark mode?"
        let i = 0
        typeInterval = setInterval(() => {
          if (i < text.length) {
            setFeedbackText(text.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeInterval)
            // After typing, move cursor directly to send button
            // Send button is right-aligned, roughly at x: 80%, y: 72%
            setCursorVisible(false)
            cursorTimeout = setTimeout(() => {
              setCursorPos({ x: 80, y: 72 })
              setTimeout(() => setCursorVisible(true), 50)
            }, 500)
            timeoutId = setTimeout(() => {
              setZoomedElement('send-button')
              setCursorClicking(true)
              setTimeout(() => {
                setCursorClicking(false)
                setZoomedElement(null)
                setState('success')
              }, 300)
            }, 1000)
          }
        }, 40)
        break
      case 'success':
        setShowCursor(false)
        setZoomedElement(null)
        timeoutId = setTimeout(() => {
          setState('closed')
          setSelectedType(null)
          setFeedbackText('')
          setHasPhoto(false)
        }, 2500)
        break
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (typeInterval) clearInterval(typeInterval)
      if (cursorTimeout) clearTimeout(cursorTimeout)
    }
  }, [state])

  return (
    <div className="relative max-w-sm mx-auto" style={{ height: '320px' }}>
      {/* Mac-style Cursor */}
      {showCursor && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            transform: `translate(-3px, -3px) ${cursorClicking ? 'scale(0.9)' : 'scale(1)'}`,
            opacity: cursorVisible ? 1 : 0,
            transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1), top 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease-out, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>
      )}

      {state === 'closed' ? (
        // Floating button
        <div className="flex justify-center items-center h-full">
          <button 
            className="w-14 h-14 bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-full shadow-lg transition-all duration-500 flex items-center justify-center hover:scale-110"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            <svg className="w-7 h-7 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8L6 16h12L12 8z" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/60 transition-all duration-700 ease-out" style={{
          animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Widget Header - Sleeker Design */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 flex items-center justify-between border-b border-slate-700/40">
            <div className="flex items-center gap-3">
              {selectedType && (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 backdrop-blur-sm ${
                  selectedType === 'issue' ? 'bg-red-500/15 ring-1 ring-red-500/30' :
                  selectedType === 'idea' ? 'bg-orange-500/15 ring-1 ring-orange-500/30' :
                  'bg-slate-500/15 ring-1 ring-slate-500/30'
                }`}>
                  {selectedType === 'issue' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 0v3.75m0-3.75h3.75m-3.75 0H8.25m6.75-6V3.75m0 6.75h3.75m-9 0H8.25m0 0H3.75m3.75 0v3.75m0-3.75H3.75m9 9h3.75m-3.75 0v-3.75m0 3.75v3.75m0-3.75H8.25" />
                    </svg>
                  )}
                  {selectedType === 'idea' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  )}
                  {selectedType === 'other' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              )}
              <h3 className="text-white font-semibold text-sm transition-all duration-500 tracking-tight">
                {state === 'success' ? 'Thank you!' : 
                 selectedType ? (selectedType === 'issue' ? 'Report an issue' : selectedType === 'idea' ? 'Share an idea' : 'Other feedback') : 
                 "What's on your mind?"}
              </h3>
            </div>
            <button className="text-white/60 hover:text-white/90 hover:bg-white/8 rounded-lg p-1.5 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Widget Content - Compact Height */}
          <div className="p-4" style={{ minHeight: '180px' }}>
            {state === 'open' && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'issue', color: 'red', iconColor: '#EF4444', x: 16.67 },
                  { type: 'idea', color: 'orange', iconColor: '#F97316', x: 50 },
                  { type: 'other', color: 'gray', iconColor: '#6B7280', x: 83.33 }
                ].map(({ type, color, iconColor, x }) => (
                  <div
                    key={type}
                    className={`flex flex-col items-center gap-2.5 p-4 border rounded-xl transition-all duration-500 ease-out bg-white ${
                      type === 'idea' 
                        ? 'border-orange-200/80 shadow-md bg-gradient-to-br from-orange-50/60 to-white' 
                        : 'border-gray-200/60 shadow-sm hover:border-gray-300/80 hover:shadow-md'
                    }`}
                    style={{
                      transform: zoomedElement === 'idea-button' && type === 'idea' 
                        ? 'scale(1.08)' 
                        : type === 'idea' 
                        ? 'scale(1.05)' 
                        : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center relative transition-all duration-500 ${
                        type === 'issue' ? 'bg-red-50/80' :
                        type === 'idea' ? 'bg-orange-50/80' :
                        'bg-gray-50/80'
                      }`}
                      style={{
                        boxShadow: type === 'idea' 
                          ? '0 3px 10px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                          : '0 2px 5px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                        transform: type === 'idea' ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/80 via-transparent to-transparent"></div>
                      {type === 'issue' && (
                        <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="#DC2626" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 0v3.75m0-3.75h3.75m-3.75 0H8.25m6.75-6V3.75m0 6.75h3.75m-9 0H8.25m0 0H3.75m3.75 0v3.75m0-3.75H3.75m9 9h3.75m-3.75 0v-3.75m0 3.75v3.75m0-3.75H8.25" />
                        </svg>
                      )}
                      {type === 'idea' && (
                        <svg className="w-6 h-6 relative z-10 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="#EA580C" strokeWidth={2.5} style={{ transform: 'scale(1.1)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                      )}
                      {type === 'other' && (
                        <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="#64748B" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs font-semibold capitalize transition-colors duration-300 ${
                      type === 'idea' ? 'text-orange-600' : type === 'issue' ? 'text-red-600' : 'text-slate-600'
                    }`}>{type}</span>
                  </div>
                ))}
              </div>
            )}
            
            {state === 'form' && (
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    value={feedbackText}
                    readOnly
                    className="w-full h-24 px-4 py-2.5 border border-gray-200/80 rounded-xl text-sm text-gray-900 resize-none transition-all duration-300 focus:border-gray-300 focus:ring-2 focus:ring-gray-100/50 bg-gray-50/40 placeholder:text-gray-400"
                    placeholder="Tell us more about your feedback..."
                    style={{
                      transform: zoomedElement === 'textarea' ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s',
                    }}
                  />
                  {feedbackText && (
                    <span className="absolute bottom-2.5 right-2.5 text-xs text-gray-400/80 font-medium">{feedbackText.length} characters</span>
                  )}
                </div>
                {hasPhoto && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200/60 bg-gray-50/40" style={{
                    animation: 'fadeInScale 0.4s ease-out',
                  }}>
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75A1.5 1.5 0 0019.5 5.25h-16.5a1.5 1.5 0 00-1.5 1.5v12.75a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <button className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <button 
                    className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      hasPhoto 
                        ? 'bg-gray-50/80 border-gray-200/60 text-gray-600' 
                        : 'bg-white border-gray-200/80 text-gray-700 hover:border-gray-300/80 hover:bg-gray-50/50'
                    }`}
                    style={{
                      transform: zoomedElement === 'photo-button' ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, background-color 0.3s',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span className="text-xs font-semibold">Add photo</span>
                  </button>
                  <button 
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm shadow-md hover:bg-slate-800 hover:shadow-lg transition-all duration-300"
                    style={{
                      transform: zoomedElement === 'send-button' ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    Send feedback
                  </button>
                </div>
              </div>
            )}
            
            {state === 'success' && (
              <div className="text-center py-6 flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 transition-all duration-500" style={{
                  animation: 'zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5 transition-all duration-500">Thank you!</h4>
                <p className="text-xs text-gray-600 transition-all duration-500">Your feedback has been submitted successfully.</p>
              </div>
            )}
          </div>
          
          {state !== 'success' && (
            <div className="px-4 pb-2.5 text-center border-t border-gray-100/60 pt-2.5">
              <p className="text-xs text-gray-400/70 font-medium">Powered by Feedkit</p>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

function FlavorCard({ title, subtitle, description, cta, href, gradient, type }: {
  title: string
  subtitle?: string
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <BrandLogo size={16} />
                <input
                  type="text"
                  defaultValue="feedkit"
                  className="px-2 py-1 border border-gray-300 rounded text-xs flex-1 max-w-[100px]"
                  readOnly
                />
                <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
                  <span>Help</span>
                  <span>Logout</span>
                </div>
              </div>
            </div>
            
            
            {/* Dashboard Content */}
            <div className="p-4">
              <div className="flex gap-3">
                {/* Sidebar */}
                <div className="w-16 flex-shrink-0">
                  <div className="text-[8px] font-semibold text-gray-500 uppercase mb-2">FILTER</div>
                  <div className="space-y-1">
                    {['All', 'Issue', 'Idea', 'Other'].map((label, i) => (
                      <div
                        key={label}
                        className={`px-2 py-1 rounded text-[8px] font-medium ${
                          i === 0 ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'text-gray-600'
                        }`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Feedback Cards */}
                <div className="flex-1 space-y-2">
                  <div className="text-xs font-bold text-gray-900 mb-2">Feedback</div>
                  <div className="bg-white border border-gray-200 rounded p-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[8px] font-medium">Idea</span>
                      <span className="text-[8px] text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-[10px] text-gray-900 mb-2 leading-tight">Add dark mode support for better UX</p>
                    <div className="flex items-center gap-2 text-[8px] text-gray-600 mb-2">
                      <span>USER: user@example.com</span>
                      <span>DEVICE: Desktop</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-2 py-1 text-[8px] text-gray-700 bg-white border border-gray-300 rounded">Archive</button>
                      <button className="px-2 py-1 text-[8px] text-[#2563EB] bg-[#2563EB]/10 rounded">Reply</button>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[8px] font-medium">Issue</span>
                      <span className="text-[8px] text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-[10px] text-gray-900 mb-2 leading-tight">Button not working on mobile</p>
                    <div className="flex items-center gap-2 text-[8px] text-gray-600 mb-2">
                      <span>USER: customer@site.com</span>
                      <span>DEVICE: Mobile</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-2 py-1 text-[8px] text-gray-700 bg-white border border-gray-300 rounded">Archive</button>
                      <button className="px-2 py-1 text-[8px] text-[#2563EB] bg-[#2563EB]/10 rounded">Reply</button>
                    </div>
                  </div>
            </div>
            </div>
            </div>
          </div>
          </div>
      ) : (
        <div className={`bg-gradient-to-br ${gradient} p-8 relative`} style={{ minHeight: '440px' }}>
          <AnimatedWidgetDemo />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mb-1 font-medium">{subtitle}</p>}
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


function LifetimeDealCard() {
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLifetimePurchase = async () => {
    // If user is not signed in, redirect to sign in
    if (!user) {
      window.location.href = '/sign-in'
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch('/api/stripe/checkout-lifetime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }), // Use signed-in user's email
      })
      
      const data = await response.json()
      
      if (data.error) {
        alert(data.error)
        setIsProcessing(false)
        return
      }
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      alert('Failed to start checkout. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative rounded-xl p-6 sm:p-8 border-2 border-[#2563EB] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] text-white shadow-xl transform hover:scale-[1.02] transition-all duration-300">
      {/* Ribbon Badge */}
      <div className="absolute -top-3 right-4 bg-[#F97316] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
        LIMITED TIME
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl sm:text-5xl font-bold">€59</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Single payment</span>
        </div>
      </div>
      
      <p className="text-sm sm:text-base mb-6 text-blue-50">
        Get lifetime access to all Pro features with a one-time payment. Perfect for long-term projects.
      </p>
      
      <button
        onClick={handleLifetimePurchase}
        disabled={isProcessing}
        className="w-full text-center py-3 rounded-lg font-medium transition mb-6 bg-white text-[#2563EB] hover:bg-gray-50 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Claim Lifetime Deal'
        )}
      </button>
      
      <ul className="space-y-3">
        {[
          'Unlimited feedback submissions',
          'All Pro features included',
          'Lifetime updates & support',
          'No account limitations',
        ].map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-blue-50">{f}</span>
          </li>
        ))}
      </ul>
      
      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] rounded-b-xl"></div>
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
      className={`rounded-xl p-6 sm:p-8 border ${
        highlighted
          ? 'bg-gray-50 border-gray-300 shadow-sm'
          : 'bg-white border-gray-200'
      } hover:shadow-md transition`}
    >
      <div className="mb-4">
        <span className="text-4xl sm:text-5xl font-bold text-gray-900">{price}</span>
        {priceSubtext && <span className="text-base sm:text-lg ml-1 text-gray-500">{priceSubtext}</span>}
      </div>
      <p className="text-sm sm:text-base mb-6 text-gray-600">{description}</p>
      <Link
        href={href}
        className={`block text-center py-3 rounded-lg font-medium transition mb-6 ${
          highlighted
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {cta}
      </Link>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
    </div>
    }>
      <LandingPageContent />
    </Suspense>
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
