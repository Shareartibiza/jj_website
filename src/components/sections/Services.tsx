'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import { ArrowRight, Anchor, Home, Briefcase, Gem } from 'lucide-react'

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
    {
        title: 'Our Services',
        description: 'A comprehensive suite of services to cater to your every need.',
        icon: Anchor,
        href: '/services',
        image: '/assets/uploaded_image_2_1765432651320.jpg'
    },
]

export default function Services() {
    return (
        <Section className="bg-luxury-black text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="font-serif text-4xl md:text-5xl mb-4">Our Expertise</h2>
                <div className="w-20 h-[1px] bg-primary mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="group relative h-[500px] overflow-hidden cursor-pointer"
                    >
                        <Link href={service.href} className="block w-full h-full">
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <service.icon className="w-10 h-10 text-primary mb-6" />
                                <h3 className="font-serif text-3xl mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-gray-300 mb-6 line-clamp-2">{service.description}</p>
                                <div className="flex items-center text-sm font-medium uppercase tracking-widest text-primary gap-2">
                                    Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
