import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function HouseStagingPage() {
    return (
        <main className="bg-secondary min-h-screen text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src="/assets/lifestyle_pool_steps.jpg"
                    alt="Luxury House Staging"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">House Staging</h1>
                        <p className="text-primary text-xl tracking-widest uppercase">The Art of Selling the Dream</p>
                    </div>
                </div>
            </div>

            <Section>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8">Maximize Your Property&apos;s Potential</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            In the ultra-prime market, first impressions are everything. Our House Staging service is designed to transform properties into aspirational lifestyle statements that resonate deeply with high-net-worth buyers and renters.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            We don&apos;t just fill space; we curate environments. By leveraging our deep understanding of the Mediterranean luxury market, we highlight the architectural strengths of your property and create an emotional connection for potential clients.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Increase Market Value</h4>
                                    <p className="text-sm text-gray-500">Staged homes consistently achieve higher sales prices and command premium rental rates.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Accelerate Transactions</h4>
                                    <p className="text-sm text-gray-500">Properties that are professionally staged spend significantly less time on the market.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Targeted Demographics</h4>
                                    <p className="text-sm text-gray-500">We tailor the aesthetic to appeal specifically to the profiles most likely to acquire your property.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="/assets/lifestyle_interior_detail.png"
                            alt="Staged Interior Detail"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Section>

            <Section className="bg-black/20">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif text-primary mb-8">Ready to showcase your property?</h2>
                    <p className="text-gray-400 mb-10">
                        Let us help you unlock the full value of your real estate investment. Contact our team for a private consultation and property assessment.
                    </p>
                    <a href="/contact">
                        <Button variant="primary" className="px-12 py-4 text-lg">
                            Request Consultation
                        </Button>
                    </a>
                </div>
            </Section>

            <Footer />
        </main>
    )
}
