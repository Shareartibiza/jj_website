
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import SectionHero from '@/components/sections/SectionHero'

export default function BespokeInteriorDesign() {
  return (
    <main className="bg-secondary min-h-screen text-white">
      <Navbar />
      <SectionHero
        title="Bespoke Interior Design"
        subtitle="Transforming luxury properties into personal sanctuaries with curated furnishings and art."
        videoSrc="https://cdn.pixabay.com/video/2020/09/24/51016-464335447_large.mp4"
        category="Interior Design"
      />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-primary mb-6">Transforming Spaces into Sanctuaries</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At JJ RE, we believe that a home is more than just a place to live; it&apos;s a reflection of your identity and a sanctuary for the soul. Our Bespoke Interior Design service is dedicated to creating spaces that are not only beautiful but also deeply personal and supremely functional. We specialize in curating environments that resonate with the unique lifestyle of our clients, particularly in the luxury villa market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center my-20">
          <div>
            <h3 className="text-2xl font-serif text-primary mb-4">Our Expertise in Luxury Villa Rentals</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Our deep-rooted experience in the luxury villa rental market gives us an unparalleled understanding of what makes a property truly exceptional. We know what discerning renters look for: a seamless blend of comfort, style, and practicality. A well-designed interior can significantly enhance a villa&apos;s appeal, command higher rental yields, and ensure outstanding guest reviews.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We leverage this expertise to design interiors that are not only stunning but also durable and easy to maintain, ensuring your property remains a top choice for luxury travelers. From selecting the right furniture to optimizing the flow of each room, we craft spaces that feel both aspirational and welcoming.
            </p>
          </div>
          <div className="h-96 relative">
            <Image
              src="/assets/luxury_villa_showcase_1765426934575.png"
              alt="Luxury Villa Interior"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="text-center my-20">
          <h3 className="text-2xl font-serif text-primary mb-4">Our Process</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-black/20 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 text-white">1. Consultation & Vision</h4>
              <p className="text-gray-400">We begin by understanding your vision, requirements, and the unique character of your property. This collaborative process ensures the final design is a true reflection of your goals.</p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 text-white">2. Design & Curation</h4>
              <p className="text-gray-400">Our team develops a comprehensive design concept, selecting materials, furniture, and art that align with the vision. We source from the finest artisans and brands to ensure quality and exclusivity.</p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2 text-white">3. Execution & Handover</h4>
              <p className="text-gray-400">We manage the entire implementation process with meticulous attention to detail, delivering a turnkey solution. Your transformed space will be ready to welcome you or your guests.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
