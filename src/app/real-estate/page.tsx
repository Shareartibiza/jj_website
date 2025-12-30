import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import PropertyCard from '@/components/real-estate/PropertyCard'
import { properties } from '@/data/listings'

export default function RealEstatePage() {
    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            {/* Simple Header */}
            <section className="pt-40 pb-20 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Exclusive Portfolio</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Discover our curated collection of luxury properties, from private villas to large-scale investment projects.
                </p>
            </section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    )
}
