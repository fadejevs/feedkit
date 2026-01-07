"use client"
import { Suspense } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
        <Navbar />
      </Suspense>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>Feedkit</strong> ("<strong>Company</strong>", "<strong>we</strong>", "<strong>our</strong>", "<strong>us</strong>"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <a href="mailto:support@feedkit.co" className="text-[#2563EB] hover:underline">support@feedkit.co</a>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website https://feedkit.co, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This privacy policy applies to all information collected through our website (such as https://feedkit.co), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "<strong>Services</strong>").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us. For example, we collect information when you create an account, use our Services, make a purchase, request customer support, or otherwise communicate with us.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The types of information we may collect include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Account Information:</strong> Name, email address, password, and other information you provide when you create an account.</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address, and other payment-related information processed through our third-party payment processor (Stripe).</li>
              <li><strong>Feedback Content:</strong> Any feedback, comments, suggestions, or other content you submit through our Services.</li>
              <li><strong>Usage Information:</strong> Information about how you use our Services, including pages visited, features used, and time spent on the platform.</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and other technical information.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect or receive:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>To facilitate account creation and logon process</li>
              <li>To send you marketing and promotional communications (you can opt-out at any time)</li>
              <li>To send administrative information to you (e.g., account verification, changes/updates to features of the Service, technical and security notices)</li>
              <li>To fulfill and manage your orders, payments, and other transactions related to the Service</li>
              <li>To post testimonials (with your consent)</li>
              <li>To request feedback and to contact you about your use of our Services</li>
              <li>To respond to user inquiries/offer support to users</li>
              <li>To develop and improve our Services</li>
              <li>To monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li>To detect, prevent and address technical issues and fraudulent or illegal activity</li>
              <li>To enforce our terms, conditions, and policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Will Your Information Be Shared With Anyone?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may process or share data based on the following legal basis:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
              <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              More specifically, we may need to process your data or share your personal information in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Vendors, Consultants and Other Third-Party Service Providers:</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li><strong>Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Do We Use Cookies And Other Tracking Technologies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How Long Do We Keep Your Information?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
            </p>
            <p className="text-gray-700 leading-relaxed">
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How Do We Keep Your Information Safe?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the services within a secure environment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Do We Collect Information From Minors?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at <a href="mailto:support@feedkit.co" className="text-[#2563EB] hover:underline">support@feedkit.co</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Are Your Privacy Rights?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="https://ec.europa.eu/justice/data-protection/bg/authorities/index_en.htm" className="text-[#2563EB] hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/justice/data-protection/bg/authorities/index_en.htm</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Controls For Do-Not-Track Features</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Do California Residents Have Specific Privacy Rights?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Do We Make Updates To This Policy?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How Can You Contact Us About This Policy?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or comments about this policy, you may email us at <a href="mailto:support@feedkit.co" className="text-[#2563EB] hover:underline">support@feedkit.co</a> or by post to:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Feedkit<br />
              Riga, Latvia
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
