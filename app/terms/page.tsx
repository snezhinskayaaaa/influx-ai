import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Terms of Service | Influx.AI',
  description: 'Terms of Service for the Influx.AI AI influencer marketplace platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-influx-blue/10 via-white to-deep-purple/10 border-b border-gray-100">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Terms of Service</h1>
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
                Please read these Terms of Service ("Terms") carefully before using the Influx.AI platform
                ("Platform," "we," "us," or "our"). By accessing or using Influx.AI, you agree to be bound
                by these Terms. If you do not agree, do not use the Platform.
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By creating an account, accessing, or using Influx.AI in any manner, you confirm that you
                are at least 18 years of age, have the legal authority to enter into these Terms, and agree
                to comply with all applicable laws and regulations. If you are using the Platform on behalf
                of a company or other legal entity, you represent that you have authority to bind that entity
                to these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify registered users of
                material changes via email or an in-platform notification. Continued use of the Platform
                after the effective date of any modification constitutes your acceptance of the updated Terms.
              </p>
            </div>

            {/* 2. Description of Service */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                2. Description of Service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Influx.AI is a marketplace platform that connects brands and businesses ("Brands") with
                AI-generated virtual influencers ("AI Influencers") for the purpose of digital marketing
                campaigns. The Platform facilitates discovery, negotiation, campaign management, content
                delivery, and payment processing between Brands and AI Influencer operators ("Influencer
                Operators").
              </p>
              <p className="text-gray-600 leading-relaxed">
                Influx.AI acts solely as an intermediary marketplace. We do not create, own, or operate
                the AI Influencer personas listed on the Platform unless explicitly stated. We do not
                guarantee the performance, reach, or outcomes of any campaign conducted through the Platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Platform may include features such as: influencer profile discovery, campaign brief
                submission, direct messaging, campaign tracking dashboards, content approval workflows,
                and payment processing.
              </p>
            </div>

            {/* 3. User Accounts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                3. User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To access core features of the Platform, you must register for an account. You agree to
                provide accurate, current, and complete information during registration and to keep your
                account information updated.
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Brand Accounts</h3>
                <p className="text-gray-600 leading-relaxed">
                  Brands register to discover AI Influencers, post campaign briefs, review proposals, and
                  manage active campaigns. Brands are responsible for providing accurate business information
                  and ensuring that all campaign content they request complies with applicable advertising
                  standards, platform policies, and these Terms.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">AI Influencer Operator Accounts</h3>
                <p className="text-gray-600 leading-relaxed">
                  Influencer Operators register to list AI Influencer personas, receive campaign offers,
                  deliver content, and receive payment. By listing an AI Influencer, you represent that you
                  own or have full rights to operate that persona and any associated intellectual property,
                  and that the persona complies with all applicable laws.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You are solely responsible for maintaining the confidentiality of your account credentials.
                You must immediately notify us at support@influx.ai of any unauthorized access or use of
                your account. Influx.AI will not be liable for any losses arising from unauthorized use of
                your account.
              </p>
            </div>

            {/* 4. Platform Rules and Prohibited Conduct */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                4. Platform Rules and Prohibited Conduct
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All users must conduct themselves professionally and in accordance with these Terms. You
                agree not to:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li>Use the Platform for any unlawful purpose or in violation of applicable laws or regulations.</li>
                <li>Post, promote, or distribute content that is fraudulent, misleading, defamatory, obscene, hateful, or that violates third-party rights.</li>
                <li>Circumvent the Platform by arranging direct transactions with users met through Influx.AI in order to avoid platform fees.</li>
                <li>Scrape, crawl, or otherwise collect data from the Platform without our express written consent.</li>
                <li>Introduce viruses, malware, or other harmful code to the Platform.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                <li>Harass, threaten, or abuse other users in any way.</li>
                <li>Attempt to gain unauthorized access to any part of the Platform or its related systems.</li>
                <li>Use the Platform to promote, sell, or distribute products or services that are illegal in the user's or target audience's jurisdiction.</li>
                <li>Create campaigns targeting minors or violating children's advertising regulations.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Violation of these rules may result in immediate account suspension or termination, removal
                of content, and/or referral to appropriate legal authorities.
              </p>
            </div>

            {/* 5. Campaign Agreements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                5. Campaign Agreements
              </h2>
              <p className="text-gray-600 leading-relaxed">
                When a Brand and an Influencer Operator enter into a campaign through the Platform, the
                specific terms (deliverables, timeline, content requirements, compensation) are defined in
                the campaign brief and agreed upon by both parties prior to campaign start.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Fee Structure:</strong> Influx.AI charges a platform
                service fee of 20% of the total campaign budget. The remaining 80% is paid to the
                Influencer Operator upon successful delivery and approval of campaign deliverables. These
                percentages are calculated on the gross campaign budget agreed upon between the Brand and
                the Influencer Operator.
              </p>
              <p className="text-gray-600 leading-relaxed">
                All campaign funds must be deposited through the Platform before the campaign commences.
                Influx.AI holds funds in escrow until the Brand approves deliverables or the dispute
                resolution period expires. Brands may not request or require Influencer Operators to
                arrange payment outside of the Platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If a Brand requests a revision of content that does not conform to the agreed campaign
                brief, the Influencer Operator may negotiate additional compensation. Disputes regarding
                deliverable approval are subject to our dispute resolution process outlined in our Help
                Center.
              </p>
            </div>

            {/* 6. Intellectual Property */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                6. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Platform IP:</strong> The Influx.AI name, logo, design,
                software, and all Platform content created by Influx.AI are the exclusive property of
                Influx.AI and are protected by intellectual property laws. You may not copy, reproduce,
                modify, or distribute any Influx.AI IP without our prior written consent.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">User Content:</strong> By submitting content to the
                Platform (including influencer profiles, campaign briefs, and creative assets), you grant
                Influx.AI a non-exclusive, worldwide, royalty-free license to use, display, and reproduce
                that content for the purpose of operating and promoting the Platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Campaign Content:</strong> Unless otherwise agreed in
                writing, campaign content created by an Influencer Operator and delivered to a Brand is
                licensed to the Brand for the uses specified in the campaign brief. Influx.AI takes no
                ownership over campaign deliverables. Ownership and licensing terms for campaign content
                are the responsibility of the Brand and Influencer Operator to negotiate within their
                campaign agreement.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Influencer Operators represent and warrant that they own or have full rights to all
                content, personas, and likenesses they make available on the Platform, and that such
                content does not infringe any third-party intellectual property rights.
              </p>
            </div>

            {/* 7. Payment Terms */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                7. Payment Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All payments on the Platform are processed through our third-party payment processor.
                By using the payment features, you agree to the payment processor's applicable terms
                and conditions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Brand Payments:</strong> Brands must fund campaign
                budgets in full prior to campaign commencement. Campaign funds are held in escrow by
                Influx.AI and released to the Influencer Operator upon deliverable approval. In the event
                of a cancellation prior to campaign start, Brands may be eligible for a refund per our
                refund policy. Once a campaign is in progress, refunds are subject to dispute resolution.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Influencer Payouts:</strong> Influencer Operators receive
                80% of the campaign budget upon Brand approval of deliverables. Payouts are processed within
                5–7 business days following approval. Influx.AI reserves the right to withhold payouts
                pending resolution of any disputes, suspected fraud, or violation of these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You are solely responsible for all taxes applicable to payments you receive through the
                Platform. Influx.AI will provide documentation required by applicable law (such as 1099
                forms for US-based operators where required).
              </p>
            </div>

            {/* 8. Content Guidelines for AI Influencers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                8. Content Guidelines for AI Influencers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All AI Influencer content published or distributed in connection with campaigns on the
                Platform must comply with the following guidelines:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-gray-600">
                <li><strong className="text-gray-700">Disclosure:</strong> All AI-generated influencer content must be clearly disclosed as created by an artificial intelligence or virtual persona, in compliance with applicable advertising standards and FTC guidelines.</li>
                <li><strong className="text-gray-700">Accuracy:</strong> Campaign content must not contain false, misleading, or deceptive claims about products or services.</li>
                <li><strong className="text-gray-700">Prohibited content:</strong> Content must not depict or promote illegal activities, violence, hate speech, discrimination, adult content, or any material that violates platform policies of the distribution channels used.</li>
                <li><strong className="text-gray-700">Brand safety:</strong> Influencer Operators must ensure that AI persona content does not endorse competing brands within the same campaign window without Brand consent.</li>
                <li><strong className="text-gray-700">Platform rules:</strong> Content must comply with the community guidelines and advertising policies of any third-party platform on which it is published (e.g., Instagram, TikTok, YouTube).</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Influx.AI reserves the right to review, remove, or require modification of any content
                that violates these guidelines. Repeated violations may result in account termination.
              </p>
            </div>

            {/* 9. Limitation of Liability */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INFLUX.AI AND ITS OFFICERS, DIRECTORS,
                EMPLOYEES, AGENTS, AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER
                INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM, EVEN IF
                INFLUX.AI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-gray-600 leading-relaxed">
                IN NO EVENT WILL INFLUX.AI'S AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR
                RELATING TO THE USE OF THE PLATFORM EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU
                TO INFLUX.AI IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS
                ($100).
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Platform is provided on an "as is" and "as available" basis without warranties of
                any kind, either express or implied. Influx.AI does not warrant that the Platform will
                be uninterrupted, error-free, or free of harmful components.
              </p>
            </div>

            {/* 10. Termination */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                10. Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You may terminate your account at any time by contacting support@influx.ai or through
                the account settings in your dashboard. Upon termination, your right to use the Platform
                ceases immediately. Any outstanding campaign obligations, pending payouts, or disputed
                funds at the time of termination will be handled in accordance with these Terms and our
                standard procedures.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Influx.AI reserves the right to suspend or terminate any account at any time, with or
                without notice, for any violation of these Terms, fraudulent activity, or conduct that
                we determine, in our sole discretion, to be harmful to the Platform, other users, or
                third parties.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sections of these Terms that by their nature should survive termination (including
                Intellectual Property, Limitation of Liability, and Governing Law) will remain in effect
                after termination.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                11. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the State of
                Delaware, United States, without regard to its conflict of law principles. Any disputes
                arising out of or in connection with these Terms or your use of the Platform will be
                subject to the exclusive jurisdiction of the state and federal courts located in Delaware.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you are located in the European Union or another jurisdiction with mandatory consumer
                protection laws, you may have additional rights under local law that these Terms cannot
                override.
              </p>
            </div>

            {/* 12. Contact Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                12. Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                <p className="text-gray-700 font-semibold">Influx.AI</p>
                <p className="text-gray-600">
                  Email:{' '}
                  <a href="mailto:support@influx.ai" className="text-influx-blue hover:underline font-medium">
                    support@influx.ai
                  </a>
                </p>
                <p className="text-gray-600">
                  For privacy-related inquiries, please contact:{' '}
                  <a href="mailto:privacy@influx.ai" className="text-influx-blue hover:underline font-medium">
                    privacy@influx.ai
                  </a>
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
