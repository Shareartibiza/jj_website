'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { ListingImage } from '@/data/listings'

interface ListingHeroProps {
    images: ListingImage[]
}

export default function ListingHero({ images }: ListingHeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

    return (
        <section className="relative h-[70vh] w-full overflow-hidden bg-black pt-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        fill
                        priority
                        className="object-cover opacity-90"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

            {/* Controls */}
            {images.length > 1 && (
                <>
                    <div className="absolute inset-y-0 left-0 flex items-center p-4">
                        <button onClick={prev} className="p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center p-4">
                        <button onClick={next} className="p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10">
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </>
            )}

            {/* Gallery Info */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4 text-white z-10">
                <span className="text-sm font-medium tracking-widest uppercase">
                    {currentIndex + 1} / {images.length}
                </span>
                <button className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all">
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-primary' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>
        </section>
    )
}
