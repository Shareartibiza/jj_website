'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import LifestyleCard from '@/components/lifestyle/LifestyleCard'
import SectionHero from '@/components/sections/SectionHero'

export default function LifestylePage() {
    const [lifestyleItems, setLifestyleItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/listings?category=lifestyle')
            .then(res => res.json())
            .then(data => {
                setLifestyleItems(data);
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
                title="JJ Lifestyle"
                subtitle="Your gateway to the most exclusive experiences in the Mediterranean. Curated excellence for the discerning few."
                videoSrc="https://cdn.pixabay.com/video/2025/12/21/323513_large.mp4"
                category="Life"
                fullHeight={true}
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white/5 rounded-3xl aspect-[4/5] animate-pulse" />
                        ))
                    ) : (Array.isArray(lifestyleItems) ? lifestyleItems : []).map((item, index) => (
                        <LifestyleCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    )
}
