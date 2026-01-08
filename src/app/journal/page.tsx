import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import SectionHero from '@/components/sections/SectionHero'

const articles = [
    {
        title: "Only Up from Here: Why 2025 is Ibiza's Golden Era",
        category: "Market Insights",
        image: "/assets/journal_market_report.png",
        excerpt: "The Ibiza real estate market has historically defied global trends, and 2025 is shaping up to be its most pivotal year yet.",
        content: `The Ibiza real estate market has historically defied global trends, and 2025 is shaping up to be its most pivotal year yet. While other luxury markets stabilize, the White Isle continues to see unprecedented demand for ultra-prime properties, particularly in the Golden Triangle of Es Cubells, Vista Alegre, and Porroig.

At JJ Real Estate, we have observed a 15% increase in off-market transactions in the first quarter alone. The buyer profile is shifting—moving from seasonal holiday-makers to semi-permanent residents who demand year-round infrastructure. "The definition of luxury has evolved," says Co-Founder Jozef. "It's no longer just about the view; it's about connectivity, privacy, and turnkey service."`
    },
    {
        title: "Hidden Ibiza: 5 Spots You Won't Find on Instagram",
        category: "Lifestyle Guide",
        image: "/assets/journal_hidden_ibiza.png",
        excerpt: "Ibiza is famous for its super-clubs and beach bars, but the true magic of the island lies in its secrets.",
        content: `Ibiza is famous for its super-clubs and beach bars, but the true magic of the island lies in its secrets. For our clients, we curate experiences that go beyond the velvet rope.

1. The Fisherman's Table (Sa Caleta): Tucked away in a cove, this nameless spot serves the fresh catch of the day to a maximum of 12 guests.
2. Es Vedrà's Secret Angle: Forget the crowded viewpoints. We arrange private sunset hikes to a secluded ledge with a spiritual connection.
3. The Private Vineyard: Deep in Santa Gertrudis lies a family-owned vineyard for private tastings with the winemaker.`
    },
    {
        title: "Skies & Seas: Redefining Freedom",
        category: "Concierge Services",
        image: "/assets/journal_bespoke_travel.png",
        excerpt: "In a world where time is the ultimate currency, how you travel matters as much as where you go.",
        content: `In a world where time is the ultimate currency, how you travel matters as much as where you go. At JJ Lifestyle, we believe that the journey should be as exceptional as the destination.

Our partnership with leading private aviation fleets ensures that you can be from London, Dubai, or New York to your villa in Ibiza in record time. From the runway, a helicopter transfer can whisk you directly to your yacht. Whether it's a sleek Riva for a day trip to Formentera or a comprehensive charter on a 50m superyacht, we handle every logistical detail.`
    }
]

export default function JournalPage() {
    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            <SectionHero
                title="The Journal"
                subtitle="Insights into the Mediterranean lifestyle, market trends, and hidden secrets."
                videoSrc="https://cdn.pixabay.com/video/2020/05/24/39906-424366624_large.mp4"
                category="Insights"
            />

            <Section>
                <div className="space-y-32">
                    {articles.map((article, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                            <div className="flex-1 relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 space-y-6">
                                <span className="text-primary text-sm uppercase tracking-widest">{article.category}</span>
                                <h2 className="font-serif text-3xl text-white">{article.title}</h2>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                                    {article.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    )
}
