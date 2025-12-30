'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { MapPin, Target, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <main className="bg-secondary min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/villa_es_cubells_main.png"
            alt="The Art of Living"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-secondary" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 uppercase tracking-widest"
          >
            The Art <br /> of <span className="italic font-light text-primary">Living</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-24 h-[1px] bg-primary mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            Exclusive Real Estate & Bespoke Lifestyle Management in Ibiza and Beyond.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <Section className="bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">Our Philosophy</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              Luxury is Personal
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              At JJ Real Estate & Luxury Lifestyle, we believe that true luxury is not just about the price tag, but about the experience, the privacy, and the seamless integration of high-end services.
              <br /><br />
              Founded by Jozef & Julud, our agency was born from a desire to bridge the gap between premium real estate and the lifestyle that accompanies it. We are not just agents; we are your gateway to the Mediterranean dream.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="flex items-center gap-2 text-white font-serif mb-2 text-xl">
                  <Shield className="w-5 h-5 text-primary" /> Integrity
                </h4>
                <p className="text-gray-500 text-sm">Operated with discretion and an unyielding commitment to excellence.</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-white font-serif mb-2 text-xl">
                  <Target className="w-5 h-5 text-primary" /> Access
                </h4>
                <p className="text-gray-500 text-sm">Specializing in off-market properties and exclusive experiences.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <Image
              src="/assets/lifestyle_interior_detail.png"
              alt="Luxury Detail"
              fill
              className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -inset-4 border border-primary/20 -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Founders Section */}
      <Section className="bg-black/20">
        <div className="text-center mb-20">
          <h2 className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">The Founders</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white">Jozef & Julud</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Jozef */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
              <Image
                src="/assets/jozef_bio.jpg"
                alt="Jozef"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-white/10 m-4" />
            </div>
            <div>
              <h4 className="font-serif text-3xl text-white mb-2">Jozef</h4>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Co-Founder & Real Estate Specialist</p>
              <p className="text-gray-400 font-light leading-relaxed">
                With a deep focus on off-market acquisitions and investment structuring, Jozef brings a wealth of knowledge in the Spanish and International real estate markets. His commitment to discretion ensures that every transaction is handled with the utmost privacy.
              </p>
            </div>
          </motion.div>

          {/* Julud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 md:mt-24"
          >
            <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
              <Image
                src="/assets/julud_bio.jpg"
                alt="Julud"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-white/10 m-4" />
            </div>
            <div>
              <h4 className="font-serif text-3xl text-white mb-2">Julud</h4>
              <p className="text-primary text-xs uppercase tracking-widest mb-4">Co-Founder & Lifestyle Curator</p>
              <p className="text-gray-400 font-light leading-relaxed">
                Julud oversees the essence of the JJ brand—curating experiences that transcend the home. From securing rare timepieces to arranging private aviation and bespoke travels, she ensures that our clients&apos; time in the Mediterranean is effortless and extraordinary.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Global Section */}
      <Section className="bg-secondary text-center">
        <div className="max-w-4xl mx-auto">
          <Users className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-8">A Global Network</h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
            While our heart lies in Ibiza, our reach is global. With key operations in <span className="text-white italic">Ibiza</span>, <span className="text-white italic">Dubai</span>, and <span className="text-white italic">London</span>, we connect the world&apos;s most discerning individuals with the most exclusive opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Ibiza</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Dubai</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> London</span>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary/5 py-24">
        <div className="text-center">
          <h3 className="font-serif text-4xl text-white mb-8">Ready to Start Your Journey?</h3>
          <Link href="/contact">
            <Button size="lg">Consult a specialist</Button>
          </Link>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
