'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Home, Briefcase, Gem } from 'lucide-react'

// Using Lucide icons for now, can replace with custom SVGs later
const services = [
    {
        title: 'Real Estate',
        description: 'Luxury villas, grand estates, and exclusive development projects.',
        icon: Home,
        href: '/real-estate',
        image: '/assets/uploaded_image_1_1765432651320.jpg'
    },
    {
        title: 'Lifestyle',
        description: 'Yachts, private jets, collector watches, and supercars.',
        icon: Gem,
        href: '/lifestyle',
        image: '/assets/uploaded_image_3_1765432651320.jpg'
    },
    {
        title: 'Financing',
        description: 'Bespoke financial solutions and private wealth consultations.',
        icon: Briefcase,
        href: '/financing',
        image: '/assets/uploaded_image_0_1765432651320.jpg'
    },
]

export default function Services() {
    return (
        <Section className="bg-[#050505] text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Our Expertise</h2>
                <div className="w-20 h-[1px] bg-primary mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="group relative h-[550px] overflow-hidden"
                    >
                        <Link href={service.href} className="block w-full h-full">
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-30"
                            />
                            {/* Subtle dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                                <service.icon className="w-8 h-8 text-primary mb-8 opacity-80" />
                                <h3 className="font-serif text-3xl mb-4 text-white tracking-wide">{service.title}</h3>
                                <p className="text-gray-400 mb-8 line-clamp-2 text-sm leading-relaxed max-w-xs">{service.description}</p>

                                <div className="overflow-hidden">
                                    <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black hover:border-white px-8 uppercase tracking-widest text-[10px] font-bold">
                                            Explore {service.title}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
