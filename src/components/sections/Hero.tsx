'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Darker base overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-transparent to-orange-400/20 z-10" /> {/* Warmer golden hour overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" /> {/* Vertical depth gradient */}

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-110 saturate-110"
                >
                    <source
                        src="https://cdn.pixabay.com/video/2024/01/24/197940-906226447_large.mp4"
                        type="video/mp4"
                    />
                    {/* Fallback image */}
                    <div className="absolute inset-0 bg-[url('/assets/luxury_villa_showcase_1765426934575.png')] bg-cover bg-center" />
                </video>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h2 className="text-secondary bg-primary px-5 py-1.5 inline-block uppercase tracking-[0.4em] text-[10px] font-bold mb-8">
                        Jozef & Julud
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 leading-tight uppercase tracking-tighter"
                >
                    The Art of <br />
                    <span className="italic font-light text-primary lowercase">Mediterranean</span> Living
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light tracking-wide"
                >
                    Curating the world&apos;s most exclusive real estate and lifestyle experiences in Ibiza and Spain.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    <a href="/contact">
                        <Button size="lg" className="px-12">Request Private Access</Button>
                    </a>
                    <a href="/real-estate">
                        <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black hover:border-white px-12">
                            Explore Collection
                        </Button>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            </motion.div>
        </section>
    )
}
