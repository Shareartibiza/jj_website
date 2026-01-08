import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import Link from 'next/link'
import Image from 'next/image'
import SectionHero from '@/components/sections/SectionHero'

const services = [
  {
    title: "Prime Real Estate",
    description: "Exclusive access to Ibiza's most prestigious off-market villas and investment opportunities.",
    image: "/assets/villa_es_cubells_main.png",
    link: "/real-estate",
    tag: "Real Estate"
  },
  {
    title: "Bespoke Interior Design",
    description: "Transforming luxury properties into personal sanctuaries with curated furnishings and art.",
    image: "/assets/lifestyle_interior_detail.png",
    link: "/bespoke-interior-design",
    tag: "Design"
  },
  {
    title: "House Staging",
    description: "Strategic property presentation designed to maximize rental yield and market value.",
    image: "/assets/lifestyle_pool_steps.jpg",
    link: "/house-staging",
    tag: "Marketing"
  },
  {
    title: "Luxury Lifestyle",
    description: "Bespoke concierge services covering private jets, yacht charters, and rare timepieces.",
    image: "/assets/lifestyle_yacht_freedom.png",
    link: "/lifestyle",
    tag: "Concierge"
  }
]

export default function ServicesPage() {
  return (
    <main className="bg-secondary min-h-screen">
      <Navbar />

      <SectionHero
        title="Our Services"
        subtitle="From acquisition to lifestyle management, we provide a holistic approach to luxury living."
        videoSrc="https://cdn.pixabay.com/video/2023/11/04/187740-880909569_large.mp4"
        category="Services"
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="group relative block aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-primary text-xs tracking-widest uppercase mb-2 block">{service.tag}</span>
                <h2 className="text-white text-3xl font-serif mb-2">{service.title}</h2>
                <p className="text-gray-300 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  )
}
