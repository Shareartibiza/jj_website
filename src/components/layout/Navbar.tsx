'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
    { name: 'Real Estate', href: '/real-estate' },
    { name: 'Lifestyle', href: '/lifestyle' },
    { name: 'Journal', href: '/journal' },
    {
        name: 'Passion',
        href: '#',
        subLinks: [
            { name: 'About Us', href: '/about' },
            { name: 'Interior Design', href: '/bespoke-interior-design' },
            { name: 'Home Staging', href: '/house-staging' },
        ],
    },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
            setActiveDropdown(null)
        } else {
            setHidden(false)
        }

        if (latest > 50) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    })

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 shadow-2xl py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-primary z-50">
                    JJ <span className="text-white text-sm tracking-widest font-sans ml-2 uppercase">Life</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                className={`flex items-center gap-1 text-xs font-medium tracking-widest uppercase transition-colors ${activeDropdown === link.name ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name}
                                {link.subLinks && (link.subLinks.length > 0) && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-primary transition-all duration-300 ${activeDropdown === link.name ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </Link>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {link.subLinks && link.subLinks.length > 0 && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                                    >
                                        <div className="bg-secondary/95 backdrop-blur-xl border border-white/10 shadow-2xl py-4 min-w-[200px] rounded-sm">
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block px-6 py-3 text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-primary hover:bg-white/5 transition-all whitespace-nowrap"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <Link href="/contact" className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary transition-all duration-300 rounded-sm font-medium text-xs uppercase tracking-wider">
                        Consultation
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-accent z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-secondary flex flex-col items-center justify-center p-8 md:hidden nav-overlay z-40 overflow-y-auto"
                        >
                            <div className="flex flex-col items-center gap-8 py-12">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col items-center gap-4">
                                        <Link
                                            href={link.href}
                                            className="text-3xl font-serif text-accent hover:text-primary transition-colors text-center"
                                            onClick={() => (!link.subLinks || link.subLinks.length === 0) && setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.subLinks && link.subLinks.length > 0 && (
                                            <div className="flex flex-col items-center gap-4 border-l border-primary/20 pl-4 py-2">
                                                {link.subLinks.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="text-sm tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
