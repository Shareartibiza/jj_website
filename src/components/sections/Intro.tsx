'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function Intro() {
    return (
        <Section className="bg-secondary text-accent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h4 className="text-primary text-sm uppercase tracking-[0.2em] mb-4">The Founders</h4>
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                        Jozef & Julud
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-8 text-lg font-light">
                        With decades of combined experience in the Mediterranean market, we have established a reputation for excellence, discretion, and unparalleled access.
                        <br /><br />
                        We don&apos;t just sell properties; we curate a lifestyle reserved for the few. From private off-market villas to securing the rarest timepieces, our network is your key to the exceptional.
                    </p>
                    <div className="flex gap-4">
                        <a href="/about">
                            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black hover:border-accent">
                                Read Our Story
                            </Button>
                        </a>
                        <a href="/contact">
                            <Button variant="primary">
                                Get in Touch
                            </Button>
                        </a>
                    </div>
                </motion.div>

                {/* Founders Images */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 gap-4 md:gap-6"
                >
                    {/* Jozef */}
                    <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/assets/jozef_bio.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        <div className="absolute inset-0 border border-white/10 m-3" />
                        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white text-xs tracking-[0.2em] uppercase">Jozef</span>
                        </div>
                    </div>

                    {/* Julud */}
                    <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden group mt-12">
                        <div className="absolute inset-0 bg-[url('/assets/julud_bio.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                        <div className="absolute inset-0 border border-white/10 m-3" />
                        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white text-xs tracking-[0.2em] uppercase">Julud</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}
