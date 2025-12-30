'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Anchor, Watch, Car, Plane, ChevronLeft, ChevronRight } from 'lucide-react'
import { LifestyleListing } from '@/data/listings'

interface LifestyleCardProps {
    item: LifestyleListing
    index: number
}

const CategoryIcon = {
    Yacht: Anchor,
    Jet: Plane,
    Watch: Watch,
    Car: Car,
}

export default function LifestyleCard({ item, index }: LifestyleCardProps) {
    const [currentImage, setCurrentImage] = useState(0)
    const Icon = CategoryIcon[item.category] || Anchor

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImage((prev) => (prev + 1) % item.images.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length)
    }

    return (
        <Link href={`/lifestyle/${item.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[450px] overflow-hidden bg-gray-900 cursor-pointer"
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
                                src={item.images[currentImage].url}
                                alt={item.images[currentImage].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Controls */}
                {item.images.length > 1 && (
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                    <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest mb-3">
                        <Icon className="w-4 h-4" />
                        {item.category}
                    </div>
                    <h3 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <span className="text-lg font-medium">{item.price}</span>
                        <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                            Explore <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
