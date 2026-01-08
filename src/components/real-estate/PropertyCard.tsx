'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight, Bed, Bath } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types'

interface PropertyCardProps {
    property: Property
    index: number
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImage((prev) => (prev + 1) % property.images.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
    }

    return (
        <Link href={`/real-estate/${property.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden bg-gray-900 cursor-pointer"
            >
                {/* Image Carousel */}
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={property.images[currentImage].url}
                                alt={property.images[currentImage].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Controls */}
                {property.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            onClick={prevImage}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Carousel Dots */}
                <div className="absolute top-6 right-6 flex gap-1 z-10">
                    {property.images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImage ? 'bg-primary' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-primary text-xs uppercase tracking-widest">{property.category}</p>
                        <div className="flex gap-3 text-xs text-gray-300">
                            <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {property.specs.bedrooms}</span>
                            <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {property.specs.bathrooms}</span>
                        </div>
                    </div>

                    <h3 className="font-serif text-2xl mb-2">{property.title}</h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
                        <MapPin className="w-4 h-4 text-primary" />
                        {property.location}
                    </div>

                    <div className="flex justify-between items-end border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xl font-medium">{property.price}</span>
                        <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-primary">
                            Details <ArrowUpRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
