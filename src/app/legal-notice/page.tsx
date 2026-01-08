import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'

export default function LegalNotice() {
    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-white">
                    <h1 className="font-serif text-5xl md:text-6xl mb-12 uppercase tracking-widest">Legal Notice</h1>

                    <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
                        <p className="text-sm italic">Compliance with Spanish Law (Ley 34/2002 - LSSI-CE)</p>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">1. Identifying Data</h2>
                            <p>
                                In compliance with the duty of information contained in article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce, the following data is reflected below:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2 text-white">
                                <li><strong>Title Holder:</strong> Jozef & Julud (JJ Luxury Lifestyle)</li>
                                <li><strong>Address:</strong> Placa de vila 4, 07800, Eivissa, Islas Baleares, Spain</li>
                                <li><strong>Email:</strong> yours@jjluxurylifestyle.com</li>
                                <li><strong>Phone:</strong> +34 691340237</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">2. Users</h2>
                            <p>
                                Access and/or use of this portal attributes the condition of USER, who accepts, from said access and/or use, the General Conditions of Use reflected here.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">3. Use of the Portal</h2>
                            <p>
                                The website provides access to information, services, programs, or data on the Internet belonging to JJ Luxury Lifestyle. The USER assumes responsibility for the use of the portal. This responsibility extends to any registration that may be necessary to access certain services or content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">4. Data Protection</h2>
                            <p>
                                Everything related to the data protection policy is contained in the Privacy Policy document.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">5. Exclusion of Guarantees and Liability</h2>
                            <p>
                                JJ Luxury Lifestyle is not responsible, in any case, for damages of any nature that could cause, by way of example: errors or omissions in the contents, lack of availability of the portal or the transmission of viruses or malicious programs in the contents, despite having adopted all the necessary technological measures to avoid it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-primary font-serif text-2xl mb-4">6. Modifications</h2>
                            <p>
                                JJ Luxury Lifestyle reserves the right to carry out without prior notice the modifications it deems appropriate in its portal, being able to change, delete or add both the contents and services provided through it and the way in which they appear presented or located in your portal.
                            </p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
