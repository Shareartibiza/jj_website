import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-luxury-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Brand */}
                    <div className="max-w-xs">
                        <h2 className="font-serif text-3xl font-bold tracking-widest text-primary mb-4">
                            JJ
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curating the finest real estate and lifestyle experiences in Ibiza and beyond. Access the top 1%.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-12 sm:gap-20">
                        <div>
                            <h3 className="font-serif text-lg text-primary mb-6">Explore</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/real-estate" className="hover:text-white transition-colors">Real Estate</Link></li>
                                <li><Link href="/lifestyle" className="hover:text-white transition-colors">Yachts & Jets</Link></li>
                                <li><Link href="/lifestyle" className="hover:text-white transition-colors">Watches & Cars</Link></li>
                                <li><Link href="/journal" className="hover:text-white transition-colors">The Journal</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-serif text-lg text-primary mb-6">Company</h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Private Consultation</Link></li>
                                <li><Link href="/financing" className="hover:text-white transition-colors">Financing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-serif text-lg text-primary mb-6">JJ LIFE</h3>
                            <address className="text-sm text-gray-400 not-italic">
                                Placa de vila 4<br />
                                07800<br />
                                Eivissa /Islas Baleares<br />
                                Spain
                            </address>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} JJ Real Estate & Lifestyle. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
