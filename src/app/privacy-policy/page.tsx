import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'

export default function PrivacyPolicy() {
  return (
    <main className="bg-secondary min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-white">
          <h1 className="font-serif text-5xl md:text-6xl mb-12">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
            <p className="text-sm italic">Last Updated: January 2026</p>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">1. Introduction</h2>
              <p>
                JJ Luxury Lifestyle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">2. Information We Collect</h2>
              <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number).</li>
                <li>Preferences regarding real estate and lifestyle services.</li>
                <li>Any other information you choose to provide via our contact forms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and manage our real estate and lifestyle services.</li>
                <li>Respond to your inquiries and offer personalized consultations.</li>
                <li>Send you updates, newsletters, or marketing communications (only if you have opted in).</li>
                <li>Comply with legal obligations in Spain and internationally.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">5. Your Rights</h2>
              <p>
                Under the General Data Protection Regulation (GDPR) and Spanish law (LOPD-GDD), you have the right to access, rectify, or delete your personal data. You may also object to the processing of your data or request data portability.
              </p>
            </section>

            <section>
              <h2 className="text-primary font-serif text-2xl mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
              </p>
              <address className="not-italic mt-4 text-white">
                Email: yours@jjluxurylifestyle.com<br />
                Address: Placa de vila 4, 07800, Eivissa, Islas Baleares, Spain
              </address>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
