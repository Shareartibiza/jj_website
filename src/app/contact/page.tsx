'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        interest: 'Real Estate',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle submitting
        console.log('Form submitted:', formState)
        alert('Thank you for your inquiry. We will contact you shortly.')
    }

    return (
        <main className="bg-secondary min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Private Consultation</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Whether you are looking to acquire a dream property, expand your portfolio, or seek bespoke financing solutions, we are here to assist.
                </p>
            </section>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Financing / Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl text-white mb-6">Financing & Wealth</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Navigating the complexities of high-value asset acquisition requires expert guidance. We offer private consultations in financing to ensure your transactions are seamless and optimized.
                        </p>
                        <ul className="space-y-4 mb-12">
                            <li className="flex items-center gap-4 text-gray-300">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Tailored Mortgage Solutions
                            </li>
                            <li className="flex items-center gap-4 text-gray-300">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Asset-Backed Lending
                            </li>
                            <li className="flex items-center gap-4 text-gray-300">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Investment Portfolio Structuring
                            </li>
                        </ul>

                        <div className="p-8 border border-white/10 bg-white/5 rounded-sm">
                            <h3 className="text-primary font-medium uppercase tracking-widest mb-4">Direct Contact</h3>
                            <a href="mailto:consultations@jj-luxury.com" className="text-white text-lg mb-2">consultations@jj-luxury.com</a>
                            <p className="text-white text-lg">+34 971 000 000</p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 p-8 md:p-12 rounded-sm border border-white/10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/20 border border-white/10 focus:border-primary text-white p-4 outline-none transition-colors"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-black/20 border border-white/10 focus:border-primary text-white p-4 outline-none transition-colors"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Interest</label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 focus:border-primary text-white p-4 outline-none transition-colors appearance-none"
                                    value={formState.interest}
                                    onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                                >
                                    <option className="bg-secondary">Real Estate</option>
                                    <option className="bg-secondary">Lifestyle Assets</option>
                                    <option className="bg-secondary">Financing</option>
                                    <option className="bg-secondary">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full bg-black/20 border border-white/10 focus:border-primary text-white p-4 outline-none transition-colors resize-none"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Request Consultation
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </Section>

            <Footer />
        </main>
    )
}
