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
      <section id="home" className="relative z-10 w-full pt-12 pb-4 sm:pt-24 sm:pb-6 overflow-hidden min-h-[480px] sm:min-h-[650px]">
        {/* Animated Background - covers entire hero section */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatedBackground />
          </div>
        
        {/* Background decorative circle */}
        <div className="absolute top-0 left-0 w-[400px] sm:w-[900px] h-[400px] sm:h-[900px] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 rounded-full -translate-x-[30%] -translate-y-[30%] opacity-30 blur-3xl z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 text-gray-900 leading-[1.1]">
            Build more of what<br />
            customers want
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Capture, organize, and announce product feedback in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 px-4 sm:px-0">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition text-base inline-flex items-center justify-center gap-2"
            >
              Start for free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition text-base inline-flex items-center justify-center gap-3"
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Watch the demo</span>
              <span className="text-gray-500 text-sm hidden xs:inline">15s</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            14-day free trial. No credit card required.
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
                src="/Screenshot 2025-12-14 at 02.33.28.png"
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
      <section id="product" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
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
      <section id="features" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Background gradient with complementary colors */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-blue-100 via-indigo-50 to-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl" />
        
        <div className="relative text-center mb-8 sm:mb-16 px-2">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Built for teams that want to ship better products, faster.
          </h2>
            </div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
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

      {/* Feature Showcase Sections */}
      <section className="bg-gray-50 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature 1: Collect Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center mb-16 sm:mb-24">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Collect feedback without friction</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Drop a sleek widget on your site. Users report bugs, share ideas, or leave feedback in seconds — no forms, no friction.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Bug reports, ideas & general feedback
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Screenshot attachments
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Works on any website
                </li>
              </ul>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="bg-gradient-to-br from-orange-100/50 via-white to-orange-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]" />
                <WidgetMockup />
              </div>
            </div>
          </div>

          {/* Feature 2: Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center mb-16 sm:mb-24">
            <div className="order-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">All feedback in one place</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Every piece of feedback lands in your dashboard. Filter by type, search, archive, and never lose track of what users are saying.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Filter by bugs, ideas, or other
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Search and organize feedback
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Archive when done
                </li>
              </ul>
            </div>
            <div className="order-1 relative">
              <div className="bg-gradient-to-br from-blue-100/50 via-white to-indigo-50/50 rounded-2xl sm:rounded-3xl p-3 sm:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.1),transparent_50%)]" />
                <DashboardMockup />
              </div>
            </div>
          </div>

          {/* Feature 3: Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Build what users actually want</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Stop guessing. See which features users request most, what bugs are causing pain, and prioritize your roadmap with confidence.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  See feedback trends at a glance
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Know what to build next
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Data-driven product decisions
                </li>
              </ul>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="bg-gradient-to-br from-emerald-100/50 via-white to-teal-50/50 rounded-2xl sm:rounded-3xl p-3 sm:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
                <InsightsMockup />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">Pricing</h2>
        </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-8 max-w-5xl mx-auto sm:grid-cols-3">
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
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight text-gray-900">
            Start managing customer feedback — today.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 rounded-lg bg-[#F97316] text-white font-medium hover:bg-[#EA580C] shadow-sm shadow-[#F97316]/30 transition text-base"
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

// Visual Mockup Components for Feature Sections
function WidgetMockup() {
  return (
    <div className="relative mx-auto max-w-[280px] sm:max-w-[320px]">
      {/* Widget Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-lg sm:text-xl">💡</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Share an idea</h4>
              <p className="text-[10px] sm:text-xs text-gray-500">We love new ideas</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-600">Add dark mode support for better UX at night...</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
              </div>
            </div>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-full">Send</button>
          </div>
        </div>
        <div className="px-4 sm:px-5 py-2 border-t border-gray-100 text-center">
          <p className="text-[9px] sm:text-[10px] text-gray-400">Powered by Feedkit</p>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md sm:rounded-lg flex-shrink-0" />
        <span className="font-semibold text-xs sm:text-sm text-gray-900">Feedkit</span>
        <div className="ml-auto flex gap-1 sm:gap-2">
          <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[10px] sm:text-xs rounded font-medium">All</div>
          <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-500 text-[10px] sm:text-xs rounded hidden xs:block">Bugs</div>
          <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-500 text-[10px] sm:text-xs rounded hidden xs:block">Ideas</div>
        </div>
      </div>
      {/* Feedback Items */}
      <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        <FeedbackItemMockup type="idea" title="Dark mode support" time="2m ago" />
        <FeedbackItemMockup type="bug" title="Button not working on mobile" time="15m ago" />
        <FeedbackItemMockup type="idea" title="Export to CSV feature" time="1h ago" />
        <FeedbackItemMockup type="other" title="Love the new dashboard!" time="3h ago" />
      </div>
    </div>
  )
}

function FeedbackItemMockup({ type, title, time }: { type: 'bug' | 'idea' | 'other'; title: string; time: string }) {
  const colors = {
    bug: 'bg-red-50 text-red-600',
    idea: 'bg-amber-50 text-amber-600',
    other: 'bg-gray-50 text-gray-600'
  }
  const emojis = { bug: '🐛', idea: '💡', other: '💬' }
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition">
      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm flex-shrink-0 ${colors[type]}`}>
        {emojis[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-[10px] sm:text-xs text-gray-400">{time}</p>
      </div>
      <button className="text-[10px] sm:text-xs text-gray-400 hover:text-gray-600 hidden xs:block">Archive</button>
    </div>
  )
}

function InsightsMockup() {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden p-3 sm:p-4">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="bg-gradient-to-br from-blue-50 to-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-100">
          <p className="text-lg sm:text-2xl font-bold text-blue-600">24</p>
          <p className="text-[10px] sm:text-xs text-gray-500">This week</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-amber-100">
          <p className="text-lg sm:text-2xl font-bold text-amber-600">12</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Ideas</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-red-100">
          <p className="text-lg sm:text-2xl font-bold text-red-500">8</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Bugs</p>
        </div>
      </div>
      {/* Chart Placeholder */}
      <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 font-medium">Feedback Trends</p>
        <div className="flex items-end gap-1 sm:gap-2 h-14 sm:h-20">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] text-gray-400">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>
      {/* Top Request */}
      <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
        <p className="text-[10px] sm:text-xs text-emerald-600 font-medium mb-0.5 sm:mb-1">🔥 Most requested</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-900">Dark mode support</p>
        <p className="text-[10px] sm:text-xs text-gray-500">Requested 8 times</p>
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
    <div ref={containerRef} className="relative mx-auto" style={{ height: containerHeight, width: containerWidth, maxWidth: maxContainerWidth }}>
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
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-white/20 transition-all duration-700 ease-out" style={{
          animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
        }}>
          {/* Minimal Header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between">
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
          <div className="px-6 pb-5">
            {state === 'open' && (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm">What type of feedback?</p>
                <div className="flex flex-wrap gap-2">
                  {(['issue', 'idea', 'other'] as const).map((type) => (
                    <button
                      key={type}
                      ref={type === 'idea' ? ideaBtnRef : undefined}
                      className={`group flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-full transition-all duration-200 active:scale-95 ${
                        zoomedElement === 'idea-button' && type === 'idea' ? 'scale-105 bg-gray-100 border-gray-300' : ''
                      }`}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{typeConfig[type].emoji}</span>
                      <span className="text-sm font-medium text-gray-700">{typeConfig[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {state === 'form' && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={feedbackText}
                    readOnly
                    className="w-full h-32 px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:bg-white resize-none text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200"
                    placeholder="Describe your feedback..."
                    style={{
                      transform: zoomedElement === 'textarea' ? 'scale(1.02)' : 'scale(1)',
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
            <div className="px-6 pb-4 pt-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <span>Powered by</span>
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 28 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block opacity-60"
                >
                  <circle cx="6" cy="6" r="5" fill="#374151" />
                  <polygon points="17,0.5 23.5,11.5 11,11.5" fill="#9CA3AF" />
                </svg>
                <span className="font-medium text-gray-500">Feedkit</span>
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
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      {type === 'webapp' ? (
        <div className={`bg-gradient-to-r ${gradient} p-3 sm:p-6`}>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <Image
              src="/Screenshot 2025-12-14 at 02.33.28.png"
              alt="Feedkit dashboard preview"
              width={1600}
              height={900}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </div>
      ) : (
        <div className={`bg-gradient-to-br ${gradient} p-4 sm:p-8 relative`} style={{ minHeight: '320px' }}>
          <AnimatedWidgetDemo />
        </div>
      )}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">{subtitle}</p>}
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">{description}</p>
        <Link href={href} className="text-[#2563EB] font-medium hover:text-[#1D4ED8] text-xs sm:text-sm inline-flex items-center gap-1 group">
          {cta}
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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



function LifetimeDealCard() {
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLifetimePurchase = async () => {
    // If user is not signed in, redirect to sign in with intent to purchase
    if (!user) {
      window.location.href = '/sign-in?intent=lifetime'
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
    <div className="relative rounded-2xl p-6 sm:p-8 pt-10 sm:pt-12 border border-gray-200/80 bg-white/98 text-slate-900 shadow-lg shadow-black/5 transform hover:scale-[1.005] transition-all duration-300 overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/6 via-[#7C3AED]/6 to-[#F97316]/6 pointer-events-none" />
      {/* Ribbon Badge */}
      <div className="absolute top-3 right-4 bg-[#F97316] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-[#F97316]/40">
        LIMITED TIME
      </div>
      
      <div className="mb-4 relative z-10">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl sm:text-5xl font-bold text-slate-900">€59</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Single payment</span>
        </div>
      </div>
      
      <p className="text-sm sm:text-base mb-6 text-slate-700 relative z-10">
        Get lifetime access to all Pro features with a one-time payment. Perfect for long-term projects.
      </p>
      
      <button
        onClick={handleLifetimePurchase}
        disabled={isProcessing}
        className="relative z-10 w-full text-center py-3 rounded-lg font-medium transition mb-6 bg-[#111827] text-white hover:bg-[#0f172a] shadow-sm shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
      
      <ul className="space-y-3 relative z-10">
        {[
          'Unlimited feedback submissions',
          'All Pro features included',
          'Lifetime updates & support',
          'No account limitations',
        ].map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-800">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#2563EB]"
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
