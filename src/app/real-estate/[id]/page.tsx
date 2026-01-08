import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingHero from '@/components/ui/ListingHero'
import SpecsGrid from '@/components/ui/SpecsGrid'
import Section from '@/components/ui/Section'
import { properties } from '@/data/listings'
import { Hash, Home, Maximize, MapPin, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
    const property = properties.find((p) => p.id === params.id)

    if (!property) {
        return (
            <main className="bg-secondary min-h-screen">
                <Navbar />
                <div className="pt-40 pb-20 px-6 text-center">
                    <h1 className="font-serif text-4xl text-white mb-6">Property Not Found</h1>
                    <Link href="/real-estate" className="text-primary hover:underline">Return to Portfolio</Link>
                </div>
                <Footer />
            </main>
        )
    }

    const mainSpecs = [
        { label: 'Price', value: property.price, icon: Hash },
        { label: 'Bedrooms', value: property.specs.bedrooms, icon: Home },
        { label: 'Bathrooms', value: property.specs.bathrooms, icon: Maximize },
        { label: 'Living Space', value: property.specs.buildSize, icon: Maximize },
        { label: 'Location', value: property.location, icon: MapPin },
    ]

    if (property.specs.plotSize) {
        mainSpecs.push({ label: 'Plot Size', value: property.specs.plotSize, icon: Maximize })
    }

    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            {/* Hero Gallery */}
            <ListingHero images={property.images} />

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Technical Details */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-4">{property.category}</p>
                            <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">{property.title}</h1>
                            <div className="flex items-center gap-2 text-gray-400 text-lg mb-8">
                                <MapPin className="w-5 h-5 text-primary" />
                                {property.location}
                            </div>
                        </div>

                        <SpecsGrid specs={mainSpecs} title="Technical Specifications" />
                    </div>

                    {/* Right Column: Narrative and Features */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="font-serif text-3xl text-white mb-8 border-b border-white/10 pb-4">About this Property</h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-8">
                                {property.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl text-white mb-8">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {property.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 py-3 border-b border-white/5">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-lg text-center backdrop-blur-md">
                            <h3 className="font-serif text-2xl text-white mb-4">Interested in this property?</h3>
                            <p className="text-gray-400 mb-8">Contact our exclusive advisory team for more information or a private viewing.</p>
                            <Link href="/contact" className="inline-block px-8 py-4 bg-primary text-white font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                Request Information
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    )
}
