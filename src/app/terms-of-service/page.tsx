import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'

export default function TermsOfService() {
  return (
    <main className="bg-secondary min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-white">
          <h1 className="font-serif text-5xl md:text-6xl mb-12">Terms of Service</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
            <p className="text-sm italic">Last Updated: January 2026</p>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">2. Services Offered</h2>
              <p>
                JJ Luxury Lifestyle provides specialized real estate brokerage and bespoke lifestyle management services, including but not limited to yacht charters, private aviation, and luxury asset acquisitions.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">3. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and designs, is the property of JJ Luxury Lifestyle and is protected by international copyright laws. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">4. Limitation of Liability</h2>
              <p>
                While we strive for accuracy, JJ Luxury Lifestyle does not guarantee that the information on this website is always complete or up-to-date. We are not liable for any direct or indirect damages arising from the use of our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">5. Real Estate Listings</h2>
              <p>
                Property details, prices, and availability are subject to change without notice. Listings do not constitute a binding offer but rather an invitation for consultation.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of Spain. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Eivissa (Ibiza), Spain.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">7. Contact Information</h2>
              <p>
                For any legal inquiries regarding these terms, please reach out to us:
              </p>
              <address className="not-italic mt-4 text-white">
                Email: jozef@jjluxurylifestyle.com<br />
                Phone: +34 691340237
              </address>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
