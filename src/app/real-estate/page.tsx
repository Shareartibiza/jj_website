'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import PropertyCard from '@/components/real-estate/PropertyCard'
import { Property } from '@/types';
import SectionHero from '@/components/sections/SectionHero'

export default function RealEstatePage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/listings?category=property')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            <SectionHero
                title="Exclusive Portfolio"
                subtitle="Discover our curated collection of luxury properties, from private villas to large-scale investment projects."
                videoSrc="https://cdn.pixabay.com/video/2020/06/19/42533-431835773_large.mp4"
                category="Real Estate"
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white/5 rounded-3xl aspect-[4/5] animate-pulse" />
                        ))
                    ) : properties.map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    )
}
