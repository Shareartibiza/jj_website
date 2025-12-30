import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import LifestyleCard from '@/components/lifestyle/LifestyleCard'
import { lifestyleItems } from '@/data/listings'

export default function LifestylePage() {
    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Lifestyle Collection</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Beyond real estate. Curated excellence for the discerning few.
                </p>
            </section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lifestyleItems.map((item, index) => (
                        <LifestyleCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    )
}
