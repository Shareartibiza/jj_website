'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Landmark, TrendingUp, ShieldCheck, Briefcase, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Financing() {
  return (
    <main className="bg-secondary min-h-screen text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">Investment & Wealth</h2>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Smart Capital</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Navigate high-value acquisitions with sophisticated financial structuring and strategic advisory.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-colors group"
          >
            <Landmark className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-2xl text-white mb-4">Investment Trusts</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Tailored real estate investment structures for private individuals and family offices, ensuring long-term asset security and growth.
            </p>
            <ul className="text-gray-500 text-sm space-y-2">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Asset Protection</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Tax Optimization</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-colors group"
          >
            <TrendingUp className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-2xl text-white mb-4">Golden Visas</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Expert guidance through the Spanish residency-by-investment process, managing every detail of your application for a seamless transition.
            </p>
            <ul className="text-gray-500 text-sm space-y-2">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> EU Residency</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Family Inclusion</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-colors group"
          >
            <ShieldCheck className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-2xl text-white mb-4">Asset Management</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Comprehensive management of your high-value assets, from property portfolios to rare collectibles, ensuring pristine maintenance and value.
            </p>
            <ul className="text-gray-500 text-sm space-y-2">
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Multi-Asset Oversight</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" /> Wealth Preservation</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Detailed Services */}
      <Section className="bg-black/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl text-white mb-8">Specialized Financing Solutions</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="mt-1 p-3 bg-primary/10 rounded-sm">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">Private Banking Ties</h4>
                  <p className="text-gray-400 font-light">Direct connections with leading private banks in Spain and offshore, facilitating competitive lending terms.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1 p-3 bg-primary/10 rounded-sm">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">Structuring Advisory</h4>
                  <p className="text-gray-400 font-light">Coordinated efforts with your legal and tax advisors to ensure optimal holding structures.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 p-12 border border-white/10 backdrop-blur-md rounded-sm"
          >
            <h3 className="font-serif text-3xl text-white mb-6">Corporate & Commercial</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-8">
              Beyond residential real estate, we assist in commercial ventures, boutique hotel developments, and large-scale architectural projects across the Mediterranean.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="w-full">Enquire about commercial</Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center py-32">
        <h3 className="font-serif text-4xl text-white mb-8">Private Consultation</h3>
        <p className="text-gray-400 max-w-xl mx-auto mb-12 font-light">
          Every financial path is unique. Schedule a discreet consultation with our advisory team to discuss your objectives.
        </p>
        <Link href="/contact">
          <Button size="lg">Request Consultation</Button>
        </Link>
      </Section>

      <Footer />
    </main>
  )
}
