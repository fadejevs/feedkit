"use client"
import { Suspense, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { IntegrationCard } from '@/components/IntegrationCard'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { Footer } from '@/components/Footer'
import { BrandLogo } from '@/components/BrandLogo'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { 
  HiOutlineLightningBolt, 
  HiOutlineGlobeAlt, 
  HiOutlineShieldCheck,
  HiOutlineViewGrid,
  HiOutlineLockClosed,
  HiOutlineCube,
  HiOutlineTranslate,
  HiOutlineColorSwatch,
  HiOutlineRefresh
} from 'react-icons/hi'

function LandingPageContent() {
  const { user } = useAuth()
  const scrollToDemo = () => {
    const el = document.getElementById('features')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <div className="relative z-10 bg-white">
      <Navbar />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 w-full pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden">
        {/* Animated Background - covers entire hero section */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatedBackground />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900 leading-tight">
              A better home for your customers needs
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Capture, organize, and announce feedback in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  window.open('', '_blank')
                }}
              >
                See how it works
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              14-day free trial · No credit card required
            </p>
          </div>
        </div>
      </section>





      {/* Demo Section (Dashboard preview) */}
      {/* <section id="live-demo" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="absolute -top-20 -right-10 w-80 h-80 bg-blue-100/40 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-10 w-96 h-96 bg-orange-100/40 blur-3xl rounded-full" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-gray-100 shadow-lg bg-white">
              <Image
                src="/Screenshot 2025-12-15 at 14.06.08.png"
                alt="Feedkit dashboard preview"
                width={1600}
                height={900}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Social Proof - Simple Stats */}
      {/* <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-500">Happy users</p>
        </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-3xl font-bold text-gray-900">10k+</p>
            <p className="text-sm text-gray-500">Feedback collected</p>
        </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block" />
          <div>
            <p className="text-3xl font-bold text-gray-900">2 min</p>
            <p className="text-sm text-gray-500">Setup time</p>
      </div>
        </div>
      </section> */}



      {/* Two Flavors Section */}
      <section id="product" className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
      <section id="features" className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Built for teams that want to ship better products, faster.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

      {/* Widget Integration Showcase */}
      <section id="implementation" className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Integrate in seconds, not hours
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Add our widget to any website with a single line of code. No complex setup, no dependencies.
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8 sm:mb-10">
            <div className="bg-gray-900 px-4 sm:px-6 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm ml-2">Integration Code</span>
            </div>
            <div className="p-5 sm:p-6 md:p-8">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-3 font-medium">Step 1: Add the script tag</p>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-5 overflow-x-auto -mx-1 sm:mx-0">
                    <code className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words">
                      <span className="text-purple-600">&lt;script</span>{' '}
                      <span className="text-blue-600">src</span>=
                      <span className="text-green-600">"https://feedkit.co/widget.js?pid=YOUR_PROJECT_ID"</span>{' '}
                      <span className="text-blue-600">defer</span>
                      <span className="text-purple-600">&gt;&lt;/script&gt;</span>
                    </code>
                  </div>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-3 font-medium">Step 2: That's it! 🎉</p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    The widget will automatically appear on your site. Replace <span className="font-mono text-xs sm:text-sm bg-gray-100 px-1.5 py-0.5 rounded">YOUR_PROJECT_ID</span> with your actual project ID from the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HiOutlineLightningBolt className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">One Line of Code</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Copy and paste. No npm installs or build steps.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HiOutlineGlobeAlt className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Works Everywhere</h3>
              <p className="text-sm text-gray-600 leading-relaxed">React, Vue, WordPress, HTML—works on any platform.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HiOutlineShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Zero Maintenance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Updates happen automatically. No version management needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">Integrations</h2>
          <p className="text-lg text-gray-600">
            Connect Feedkit to the tools that you already use.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {integrations.slice(0, 12).map((integration) => (
            <IntegrationCard key={integration.name} name={integration.name} description={integration.description} />
          ))}
        </div>

      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">Pricing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <PricingTier
              name="Free"
              price="$0"
              description="Perfect to start collecting feedback for your app"
              features={["25 total feedback submissions"]}
              cta="Get started"
              plan="free"
              variant="default"
            />
            <PricingTier
              name="Pro"
              price="$19"
              period="/month"
              description="Suitable for production applications and websites of all sizes"
              features={["Unlimited feedback submissions"]}
              cta="Get started"
              plan="pro"
              variant="featured"
            />
            <PricingTier
              name="Enterprise"
              price="Custom"
              description="Talk to us about your custom needs"
              features={["Whitelabeling", "Service-level agreements", "Live chat support"]}
              cta="Contact us"
              plan="enterprise"
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight text-gray-900">
            Start managing customer feedback — today.
          </h2>
          <div className="flex items-center justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get started free
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}

// Visual Mockup Components for Feature Sections
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

function AnimatedWidgetDemo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const [state, setState] = useState<'closed' | 'open' | 'form' | 'success'>('closed')
  const [selectedType, setSelectedType] = useState<'issue' | 'idea' | 'other' | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [cursorClicking, setCursorClicking] = useState(false)
  const [zoomedElement, setZoomedElement] = useState<string | null>(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const closedBtnRef = useRef<HTMLButtonElement>(null)
  const ideaBtnRef = useRef<HTMLButtonElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sendBtnRef = useRef<HTMLButtonElement>(null)

  const isLarge = size === 'large'
  // Use relative units for mobile responsiveness
  const containerHeight = isLarge ? '380px' : '300px'
  const containerWidth = '100%'
  const maxContainerWidth = isLarge ? '380px' : '340px'

  const coords = isLarge
    ? {
        closedButton: { x: 50, y: 50 },
        ideaButton: { x: 50, y: 38 },
        textarea: { x: 20, y: 45 },
        sendButton: { x: 85, y: 75 },
      }
    : {
        closedButton: { x: 50, y: 50 },
        ideaButton: { x: 50, y: 38 },
        textarea: { x: 20, y: 45 },
        sendButton: { x: 85, y: 75 },
      }

  const getCenteredPercent = (ref: React.RefObject<HTMLElement>, fallback: { x: number; y: number }) => {
    const el = ref.current
    const wrapper = containerRef.current
    if (!el || !wrapper) return fallback
    const rect = el.getBoundingClientRect()
    const wrap = wrapper.getBoundingClientRect()
    if (!rect.width || !rect.height || !wrap.width || !wrap.height) return fallback
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    return {
      x: ((centerX - wrap.left) / wrap.width) * 100,
      y: ((centerY - wrap.top) / wrap.height) * 100,
    }
  }

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
          setCursorPos(getCenteredPercent(closedBtnRef, coords.closedButton))
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
        setCursorVisible(false)
        cursorTimeout = setTimeout(() => {
          setCursorPos(getCenteredPercent(ideaBtnRef, coords.ideaButton))
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
        setCursorVisible(false)
        cursorTimeout = setTimeout(() => {
          setCursorPos(getCenteredPercent(textareaRef, coords.textarea))
          setTimeout(() => {
            setCursorVisible(true)
            setZoomedElement('textarea')
            setTimeout(() => {
              setZoomedElement(null)
            }, 400)
          }, 50)
        }, 300)
        const text = "Love the new design! Dark mode would be great."
        let i = 0
        typeInterval = setInterval(() => {
          if (i < text.length) {
            setFeedbackText(text.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeInterval)
            setCursorVisible(false)
            cursorTimeout = setTimeout(() => {
              setCursorPos(getCenteredPercent(sendBtnRef, coords.sendButton))
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
        }, 2500)
        break
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (typeInterval) clearInterval(typeInterval)
      if (cursorTimeout) clearTimeout(cursorTimeout)
    }
  }, [state])

  const typeConfig = {
    issue: { emoji: '🐛', label: 'Bug' },
    idea: { emoji: '💡', label: 'Idea' },
    other: { emoji: '💬', label: 'Other' },
  }

  return (
    <div ref={containerRef} className="relative mx-auto overflow-hidden" style={{ height: containerHeight, width: containerWidth, maxWidth: maxContainerWidth }}>
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
        // Floating pill button
        <div className="flex justify-center items-center h-full">
          <button 
            ref={closedBtnRef}
            className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            <svg 
              className="w-5 h-5 text-white/90" 
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <span className="text-sm font-medium">Feedback</span>
          </button>
        </div>
      ) : (
        <div className={`rounded-3xl overflow-hidden overflow-x-hidden border border-white/20 transition-all duration-700 ease-out flex flex-col ${
          state === 'success' ? 'bg-white' : 'bg-white/95 backdrop-blur-xl'
        }`} style={{
          animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Minimal Header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              {selectedType && (
                <span className="text-2xl">{typeConfig[selectedType].emoji}</span>
              )}
              <div>
                <h3 className="text-gray-900 font-semibold text-lg tracking-tight">
                  {state === 'success' ? 'Thanks!' : 
                   selectedType ? (selectedType === 'issue' ? 'Report a bug' : selectedType === 'idea' ? 'Share an idea' : 'Other feedback') : 
                   'Send feedback'}
                </h3>
                {selectedType && state !== 'success' && (
                  <p className="text-gray-500 text-xs mt-0.5">
                    {selectedType === 'issue' ? 'Help us squash it' : selectedType === 'idea' ? 'We love new ideas' : 'Tell us anything'}
                  </p>
                  )}
                </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Widget Content */}
          <div className="px-6 pb-5 overflow-y-auto overflow-x-hidden flex-1 min-h-0 w-full box-border">
            {state === 'open' && (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm">What type of feedback?</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['issue', 'idea', 'other'] as const).map((type) => (
                    <button
                    key={type}
                      ref={type === 'idea' ? ideaBtnRef : undefined}
                      className={`group flex items-center justify-center gap-1.5 px-2 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-full transition-all duration-200 active:scale-95 ${
                        zoomedElement === 'idea-button' && type === 'idea' ? 'scale-105 bg-gray-100 border-gray-300' : ''
                      }`}
                    >
                      <span className="text-base group-hover:scale-110 transition-transform flex-shrink-0">{typeConfig[type].emoji}</span>
                      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{typeConfig[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {state === 'form' && (
              <div className="space-y-3 w-full">
                <div className="relative w-full overflow-hidden">
                  <textarea
                    ref={textareaRef}
                    value={feedbackText}
                    readOnly
                    className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500/50 focus:bg-white resize-none text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 box-border"
                    placeholder="Describe your feedback..."
                    style={{
                      transform: zoomedElement === 'textarea' ? 'scale(1.01)' : 'scale(1)',
                      maxWidth: '100%',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    ref={sendBtnRef}
                    className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-200 text-sm active:scale-95"
                    style={{
                      transform: zoomedElement === 'send-button' ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
            
            {state === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                  animation: 'zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Thanks!</h4>
                <p className="text-sm text-gray-500">Your feedback was sent.</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {state !== 'success' && (
            <div className="px-6 pb-4 pt-2 border-t border-gray-100 bg-white/95 flex-shrink-0">
              <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                <span>Powered by</span>
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 28 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block"
                >
                  <circle cx="6" cy="6" r="5" fill="#374151" />
                  <polygon points="17,0.5 23.5,11.5 11,11.5" fill="#9CA3AF" />
                </svg>
                <span className="font-medium text-gray-600">Feedkit</span>
              </p>
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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all">
      {type === 'webapp' ? (
        <div className={`bg-gradient-to-r ${gradient} p-4 relative overflow-hidden min-h-[300px] max-h-[320px] flex items-center justify-center`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full h-full flex flex-col max-h-full">
            <DashboardShowcase />
          </div>
        </div>
      ) : (
        <div className={`bg-gradient-to-br ${gradient} p-6 relative overflow-hidden`} style={{ minHeight: '300px', maxHeight: '400px' }}>
          <AnimatedWidgetDemo />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mb-2 font-medium">{subtitle}</p>}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href={href}>
            {cta}
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
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

function DashboardShowcase() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Filter Sidebar */}
      <aside className="w-16 sm:w-20 md:w-24 flex-shrink-0 bg-gray-50 border-r border-gray-200 p-1.5 sm:p-2">
        <h2 className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2 px-0.5">FILTER</h2>
        <div className="space-y-1">
          {[
            { label: 'All', count: 8, active: true, color: '#2563EB' },
            { label: 'Bug', emoji: '🐛', count: 3, color: '#EF4444' },
            { label: 'Idea', emoji: '💡', count: 4, color: '#F97316' },
            { label: 'Other', emoji: '💬', count: 1, color: '#6B7280' },
          ].map((filter, i) => (
            <button
              key={i}
              className={`w-full flex items-center justify-between px-1 sm:px-1.5 py-0.5 sm:py-1 rounded text-[8px] sm:text-[9px] md:text-[10px] font-medium transition ${
                filter.active
                  ? 'bg-[#2563EB]/10 text-[#2563EB]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-1">
                {filter.emoji ? (
                  <span className="text-[9px] sm:text-[10px]">{filter.emoji}</span>
                ) : (
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: filter.color }} />
                )}
                <span className="truncate">{filter.label}</span>
              </div>
              <span className="text-gray-500 text-[8px] sm:text-[9px]">{filter.count}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Feedback List */}
      <main className="flex-1 overflow-y-auto p-2 sm:p-2.5 md:p-3">
        <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-2 sm:mb-2.5">Feedback</h2>
        <div className="space-y-1.5 sm:space-y-2">
          {[
            { type: 'idea', emoji: '💡', message: 'Add dark mode support for better UX at night', time: '2m ago', color: '#F97316' },
            { type: 'bug', emoji: '🐛', message: 'Button not working on mobile devices', time: '15m ago', color: '#EF4444' },
            { type: 'idea', emoji: '💡', message: 'Export to CSV feature would be helpful', time: '1h ago', color: '#F97316' },
            { type: 'other', emoji: '💬', message: 'Love the new dashboard design!', time: '3h ago', color: '#6B7280' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-1.5 sm:p-2 border border-gray-200 hover:border-gray-300 transition">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-xs sm:text-sm flex-shrink-0`} style={{ backgroundColor: `${item.color}15` }}>
                  <span>{item.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-900 mb-0.5 sm:mb-1 line-clamp-2 leading-tight">{item.message}</p>
                  <p className="text-[8px] sm:text-[9px] text-gray-400">{item.time}</p>
                </div>
                <button className="text-[8px] sm:text-[9px] text-gray-400 hover:text-gray-600 flex-shrink-0 hidden sm:block">
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function FeatureItem({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      <div className="mb-4" style={{ color: color || '#2563EB' }}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  )
}

function InlineAdminIcon() {
  return <HiOutlineViewGrid className="w-6 h-6" />
}

function SSOIcon() {
  return <HiOutlineLockClosed className="w-6 h-6" />
}

function WidgetIcon() {
  return <HiOutlineCube className="w-6 h-6" />
}

function TranslationIcon() {
  return <HiOutlineTranslate className="w-6 h-6" />
}

function ThemeIcon() {
  return <HiOutlineColorSwatch className="w-6 h-6" />
}

function StatusIcon() {
  return <HiOutlineRefresh className="w-6 h-6" />
}



function PricingTier({
  name,
  price,
  period,
  description,
  features,
  cta,
  plan,
  variant = 'default'
}: {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  plan: 'free' | 'pro' | 'enterprise'
  variant?: 'default' | 'featured'
}) {
  const isFeatured = variant === 'featured'
  
  const handleClick = () => {
    // Track which plan was clicked
    if (plan === 'free') {
      // Free plan - go directly to dashboard (or sign-in if not authenticated)
      window.location.href = '/sign-in?intent=free'
    } else if (plan === 'pro') {
      // Pro plan - go to sign-in with intent to checkout
      window.location.href = '/sign-in?intent=pro'
    } else {
      // Enterprise - go to sign-in (or contact page)
      window.location.href = '/sign-in?intent=enterprise'
    }
  }
  
  return (
    <div className={`relative rounded-xl border bg-white transition-all hover:shadow-lg ${
      isFeatured 
        ? 'border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/20' 
        : 'border-gray-200 hover:border-gray-300'
    }`}>
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-3 py-1 rounded-full text-xs font-semibold">
          Most Popular
        </div>
      )}
      
      <div className="p-6 sm:p-7">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-baseline gap-1 mb-3">
            <span className={`text-3xl sm:text-4xl font-bold ${isFeatured ? 'text-[#2563EB]' : 'text-gray-900'}`}>
              {price}
            </span>
            {period && (
              <span className="text-sm text-gray-500 font-medium">{period}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <svg
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isFeatured ? 'text-[#2563EB]' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Button
          onClick={handleClick}
          className={`w-full ${
            isFeatured 
              ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          size="lg"
        >
          {cta}
        </Button>
      </div>
      
      {/* Decorative accent for featured */}
      {isFeatured && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#818CF8] rounded-b-xl"></div>
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
      className={`rounded-xl p-6 sm:p-8 border shadow-sm backdrop-blur-sm transition ${
        highlighted
          ? 'bg-white/98 border-gray-200 shadow-lg shadow-black/5'
          : 'bg-white/88 border-gray-200/80 hover:border-gray-200 shadow-black/5'
      } hover:shadow-md`}
    >
      <div className="mb-4">
        <span className="text-4xl sm:text-5xl font-bold text-gray-900">{price}</span>
        {priceSubtext && <span className="text-base sm:text-lg ml-1 text-gray-500">{priceSubtext}</span>}
      </div>
      <p className="text-sm sm:text-base mb-6 text-gray-600">{description}</p>
      <Link
        href={href}
        className={`block text-center py-3 rounded-lg font-medium transition mb-6 shadow-sm ${
          highlighted
            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-black/10'
            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-black/10'
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
