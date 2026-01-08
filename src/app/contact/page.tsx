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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true)
                setFormState({ name: '', email: '', interest: 'Real Estate', message: '' })
            } else {
                setError(data.error || 'Failed to send message. Please try again.')
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
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
                            <a href="mailto:yours@jjluxurylifestyle.com" className="text-white text-lg mb-2">yours@jjluxurylifestyle.com</a>
                            <p className="text-white text-lg">+34 691340237</p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 p-8 md:p-12 rounded-sm border border-white/10 overflow-hidden relative"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-3xl text-white mb-4">Inquiry Received</h3>
                                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                                    Thank you for reaching out. A specialist will personally review your request and contact you within 24 hours.
                                </p>
                                <Button variant="outline" onClick={() => setSubmitted(false)}>
                                    Send another message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-sm mb-6 animate-in fade-in slide-in-from-top-2">
                                        {error}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-black/40 border border-white/10 focus:border-primary text-white p-4 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Your full name"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-black/40 border border-white/10 focus:border-primary text-white p-4 outline-none transition-all placeholder:text-gray-700"
                                            placeholder="your@email.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Interest</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-black/40 border border-white/10 focus:border-primary text-white p-4 outline-none transition-all appearance-none cursor-pointer"
                                            value={formState.interest}
                                            onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                                        >
                                            <option className="bg-secondary">Real Estate</option>
                                            <option className="bg-secondary">Lifestyle Assets</option>
                                            <option className="bg-secondary">Financing</option>
                                            <option className="bg-secondary">Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Message</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full bg-black/40 border border-white/10 focus:border-primary text-white p-4 outline-none transition-all resize-none placeholder:text-gray-700 font-light"
                                        placeholder="Describe your inquiry..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-6 text-sm tracking-[0.2em] font-bold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending Request...' : 'Request Consultation'}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </Section>

            <Footer />
        </main>
    )
}
