'use client'

import { motion } from 'framer-motion'

interface SectionHeroProps {
    title: string;
    subtitle: string;
    videoSrc: string;
    category?: string;
}

export default function SectionHero({ title, subtitle, videoSrc, category }: SectionHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Darker base overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-transparent to-orange-400/10 z-10" /> {/* Warmer golden hour overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" /> {/* Vertical depth gradient */}

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110 saturate-110"
                >
                    <source
                        src={videoSrc}
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 text-center">
                {category && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-white bg-primary px-4 py-1.5 inline-block uppercase tracking-[0.4em] text-[9px] font-bold mb-8">
                            {category}
                        </h2>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight tracking-tighter"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent z-20" />
        </section>
    )
}
