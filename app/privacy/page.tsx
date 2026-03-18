import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Privacy Policy | Influx.AI',
  description: 'Privacy Policy for the Influx.AI AI influencer marketplace platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-influx-blue/10 via-white to-deep-purple/10 border-b border-gray-100">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
            <p className="text-gray-500 text-lg">Last updated: March 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed">
                At Influx.AI, we are committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, share, and safeguard your information when you use the Influx.AI
                platform ("Platform"). By using the Platform, you agree to the practices described in
                this policy.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information to provide and improve our services. The types of information we
                collect include:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you register, we collect your name, email address, password (stored in hashed
                    form), company name (for Brands), and any profile information you provide. For
                    Influencer Operators, this includes AI Influencer persona details, social media
                    handles, and portfolio content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect information about how you interact with the Platform,
                    including pages visited, features used, search queries, timestamps, and device
                    information (browser type, operating system, IP address). This data helps us
                    understand usage patterns and improve the Platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Campaign Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Information related to campaigns you create, participate in, or manage, including
                    campaign briefs, messaging between Brands and Influencer Operators, content submitted,
                    approval decisions, and campaign performance metrics.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Payment details (such as credit card numbers and bank account information) are
                    collected and processed directly by our payment processor. We do not store raw
                    payment card data on our servers. We retain transaction records including amounts,
                    dates, and payer/payee identifiers for accounting and compliance purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Communications</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you contact our support team or communicate through the Platform, we retain
                    those communications to assist you and improve our services.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. How We Use Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                2. How We Use Information
              </h2>
              <p className="text-gray-600 leading-relaxed">We use your information to:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li>Create and manage your account and authenticate your identity.</li>
                <li>Facilitate connections between Brands and Influencer Operators.</li>
                <li>Process campaign transactions and manage payment disbursements.</li>
                <li>Send transactional communications such as campaign updates, payment confirmations, and account notifications.</li>
                <li>Send marketing communications about new features and promotions, where you have opted in to receive them.</li>
                <li>Analyze usage patterns to improve Platform functionality and user experience.</li>
                <li>Detect and prevent fraud, abuse, and security incidents.</li>
                <li>Comply with legal obligations, including tax reporting requirements.</li>
                <li>Resolve disputes and enforce our Terms of Service.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We will not use your personal information for purposes materially different from those
                described above without your consent or as required by law.
              </p>
            </div>

            {/* 3. Information Sharing */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">We do not sell your personal information.</strong> We
                share your information only in the limited circumstances described below:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-3 text-gray-600">
                <li>
                  <strong className="text-gray-700">Campaign Partners:</strong> When a Brand and an
                  Influencer Operator agree to a campaign, relevant profile and contact information is
                  shared between them as necessary to execute that campaign. We share only what is
                  needed for the specific engagement.
                </li>
                <li>
                  <strong className="text-gray-700">Service Providers:</strong> We share data with
                  trusted third-party vendors who assist in operating the Platform, including cloud
                  hosting (Railway), payment processors, analytics providers, and email delivery
                  services. These vendors are contractually bound to use your data only to provide
                  services to us.
                </li>
                <li>
                  <strong className="text-gray-700">Legal Requirements:</strong> We may disclose
                  information if required to do so by law, court order, or governmental authority,
                  or if we believe in good faith that disclosure is necessary to protect the rights,
                  property, or safety of Influx.AI, our users, or the public.
                </li>
                <li>
                  <strong className="text-gray-700">Business Transfers:</strong> If Influx.AI is
                  acquired, merges with another entity, or undergoes a change of control, your
                  information may be transferred as part of that transaction. We will notify you via
                  email or Platform notification before any such transfer if it involves a material
                  change to how your data is handled.
                </li>
              </ul>
            </div>

            {/* 4. Data Security */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                4. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard technical and organizational security measures to protect
                your personal information against unauthorized access, disclosure, alteration, or
                destruction. These measures include:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li>Encryption of data in transit using TLS (Transport Layer Security).</li>
                <li>Encryption of sensitive data at rest.</li>
                <li>Password hashing using industry-standard algorithms (bcrypt).</li>
                <li>Role-based access controls limiting employee access to personal data.</li>
                <li>Regular security reviews and vulnerability assessments.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                While we take all reasonable precautions, no method of transmission over the internet
                or method of electronic storage is 100% secure. We cannot guarantee absolute security.
                If you believe your account has been compromised, please contact us immediately at
                support@influx.ai.
              </p>
            </div>

            {/* 5. Cookies and Tracking */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                5. Cookies and Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to operate the Platform and improve
                your experience. Cookies are small text files stored on your device.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Essential Cookies</h3>
                  <p className="text-gray-600">
                    Required for the Platform to function, including session management and
                    authentication. These cannot be disabled.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    Help us understand how users interact with the Platform so we can improve it.
                    We use privacy-focused analytics tools that anonymize IP addresses.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Preference Cookies</h3>
                  <p className="text-gray-600">
                    Remember your settings and preferences to personalize your experience.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You can control cookies through your browser settings. Note that disabling certain
                cookies may affect the functionality of the Platform.
              </p>
            </div>

            {/* 6. User Rights (GDPR) */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                6. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal
                information. EU/EEA residents have additional rights under the General Data Protection
                Regulation (GDPR), and California residents have rights under the California Consumer
                Privacy Act (CCPA).
              </p>
              <p className="text-gray-600 leading-relaxed">Your rights may include:</p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li><strong className="text-gray-700">Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong className="text-gray-700">Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
                <li><strong className="text-gray-700">Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
                <li><strong className="text-gray-700">Restriction:</strong> Request that we limit the processing of your personal data in certain circumstances.</li>
                <li><strong className="text-gray-700">Portability:</strong> Receive your personal data in a structured, machine-readable format.</li>
                <li><strong className="text-gray-700">Objection:</strong> Object to the processing of your personal data for direct marketing or other purposes based on legitimate interests.</li>
                <li><strong className="text-gray-700">Withdraw Consent:</strong> Where processing is based on consent, withdraw that consent at any time without affecting the lawfulness of prior processing.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                To exercise any of these rights, please contact us at privacy@influx.ai. We will
                respond to verified requests within 30 days. You also have the right to lodge a
                complaint with your local data protection authority.
              </p>
            </div>

            {/* 7. Data Retention */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                7. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as your account is active or as needed
                to provide you with the Platform's services. Specifically:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li>Account data is retained for the life of your account and for up to 2 years following account deletion, to handle any residual claims or legal obligations.</li>
                <li>Campaign and transaction records are retained for 7 years for tax and financial compliance purposes.</li>
                <li>Usage and analytics data is retained in anonymized or aggregated form for up to 3 years.</li>
                <li>Support communications are retained for 2 years after your last interaction.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                When data is no longer required, we securely delete or anonymize it in accordance with
                our data retention schedules.
              </p>
            </div>

            {/* 8. Third-Party Services */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                8. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the following third-party services in operating the Platform:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li>
                  <strong className="text-gray-700">Railway:</strong> Our primary hosting and
                  database infrastructure provider. Railway hosts our application and PostgreSQL
                  database. Data is stored on secure servers in
                  compliance with applicable data protection standards.
                </li>
                <li>
                  <strong className="text-gray-700">Payment Processors:</strong> We use industry-standard
                  payment processors to handle all financial transactions. These processors are
                  PCI-DSS compliant and handle payment card data directly; we do not store raw
                  card details.
                </li>
                <li>
                  <strong className="text-gray-700">Email Service Providers:</strong> Used to send
                  transactional and marketing emails. Your email address and name are shared with
                  these providers solely for this purpose.
                </li>
                <li>
                  <strong className="text-gray-700">Analytics Tools:</strong> We use analytics
                  services to monitor Platform performance and usage. We configure these tools to
                  minimize personal data collection where possible.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                The Platform may contain links to third-party websites. We are not responsible for
                the privacy practices of those websites and encourage you to review their policies.
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                9. Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Influx.AI is intended for users who are 18 years of age or older. We do not knowingly
                collect, store, or process personal information from individuals under the age of 18.
                If you believe a minor has provided us with personal information, please contact us
                immediately at privacy@influx.ai and we will take steps to delete that information
                promptly.
              </p>
            </div>

            {/* 10. Changes to Privacy Policy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices,
                technology, legal requirements, or other factors. When we make material changes, we will
                notify you via email to the address associated with your account and/or via a prominent
                notice on the Platform, at least 14 days before the changes take effect.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We encourage you to review this Privacy Policy periodically. The "Last updated" date at
                the top of this page indicates when it was most recently revised.
              </p>
            </div>

            {/* 11. Contact */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                11. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or our
                data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                <p className="text-gray-700 font-semibold">Influx.AI — Privacy Team</p>
                <p className="text-gray-600">
                  Email:{' '}
                  <a href="mailto:privacy@influx.ai" className="text-influx-blue hover:underline font-medium">
                    privacy@influx.ai
                  </a>
                </p>
                <p className="text-gray-600">
                  General support:{' '}
                  <a href="mailto:support@influx.ai" className="text-influx-blue hover:underline font-medium">
                    support@influx.ai
                  </a>
                </p>
                <p className="text-gray-500 text-sm mt-3">
                  For EU/EEA residents exercising GDPR rights, please include "GDPR Request" in
                  your email subject line. We will respond within 30 days.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
