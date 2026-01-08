'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Property } from '@/types';
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    ExternalLink,
    MapPin,
    Euro,
    Bed,
    Bath,
    Maximize2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/listings?category=property')
            .then(res => res.json())
            .then((data: Property[]) => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;

        try {
            const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProperties(properties.filter(p => p.id !== id));
            }
        } catch (err) {
            alert('Failed to delete property');
        }
    };

    const filteredProperties = properties.filter(p =>
    (p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Property Portfolio</h1>
                        <p className="text-zinc-500">Manage your exclusive real estate listings.</p>
                    </div>
                    <Link
                        href="/admin/properties/new"
                        className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        <span>Add New Property</span>
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            className="w-full bg-[#141414] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#141414] border border-white/5 rounded-2xl text-zinc-400 hover:text-white hover:border-white/10 transition-all">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="bg-[#141414] border border-white/5 rounded-3xl h-64 animate-pulse" />
                        ))
                    ) : filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                            <div key={property.id} className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all group">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image */}
                                    <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                                        <Image
                                            src={property.images[0]?.url || '/assets/placeholder.jpg'}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-white border border-white/10">
                                            {property.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-pink-500 transition-colors">{property.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/properties/edit/${property.id}`}
                                                    className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-all"
                                                >
                                                    <Edit3 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(property.id)}
                                                    className="p-2 bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                                            <MapPin size={14} className="text-pink-500" />
                                            <span>{property.location}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <Bed size={14} />
                                                <span>{property.specs.bedrooms} Beds</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <Bath size={14} />
                                                <span>{property.specs.bathrooms} Baths</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <Maximize2 size={14} />
                                                <span>{property.specs.buildSize}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-lg font-bold text-white">{property.price}</span>
                                            <Link
                                                href={`/real-estate/${property.id}`}
                                                target="_blank"
                                                className="text-xs text-zinc-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
                                            >
                                                View on site <ExternalLink size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-[#141414] border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-zinc-600 mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No properties found</h3>
                            <p className="text-zinc-500 mb-6 max-w-xs">We couldn&apos;t find any properties matching your search criteria.</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-pink-500 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
