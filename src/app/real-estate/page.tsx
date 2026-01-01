'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import PropertyCard from '@/components/real-estate/PropertyCard'

export default function RealEstatePage() {
    const [properties, setProperties] = useState<any[]>([]);
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

            {/* Simple Header */}
            <section className="pt-40 pb-20 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Exclusive Portfolio</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Discover our curated collection of luxury properties, from private villas to large-scale investment projects.
                </p>
            </section>

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
