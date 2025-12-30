'use client'

import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingHero from '@/components/ui/ListingHero'
import SpecsGrid from '@/components/ui/SpecsGrid'
import Section from '@/components/ui/Section'
import { lifestyleItems } from '@/data/listings'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LifestyleDetailPage() {
    const params = useParams()
    const item = lifestyleItems.find((i) => i.id === params.id)

    if (!item) {
        return (
            <main className="bg-secondary min-h-screen">
                <Navbar />
                <div className="pt-40 pb-20 px-6 text-center">
                    <h1 className="font-serif text-4xl text-white mb-6">Item Not Found</h1>
                    <Link href="/lifestyle" className="text-primary hover:underline">Return to Collection</Link>
                </div>
                <Footer />
            </main>
        )
    }

    const specsArray = Object.entries(item.specs).map(([label, value]) => ({
        label,
        value
    }))

    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            {/* Hero Gallery */}
            <ListingHero images={item.images} />

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Summary */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <Link href="/lifestyle" className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest mb-8 hover:text-white transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to Collection
                            </Link>
                            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-4">{item.category}</p>
                            <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">{item.title}</h1>
                            <p className="text-2xl text-white font-medium mb-8">{item.price}</p>
                        </div>

                        <SpecsGrid specs={specsArray} title="Key Specifications" />
                    </div>

                    {/* Right Column: Narrative and Features */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="font-serif text-3xl text-white mb-8 border-b border-white/10 pb-4">The Experience</h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-8 font-light">
                                {item.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl text-white mb-8">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {item.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 py-3 border-b border-white/5">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-lg text-center backdrop-blur-md">
                            <h3 className="font-serif text-2xl text-white mb-4">Tailored to You</h3>
                            <p className="text-gray-400 mb-8">Our lifestyle curators are ready to assist with private viewings, charters, or bespoke acquisitions.</p>
                            <Link href="/contact" className="inline-block px-8 py-4 bg-primary text-white font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                Consult a Specialist
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    )
}
