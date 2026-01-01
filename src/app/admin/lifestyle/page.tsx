'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    ExternalLink,
    Anchor,
    Plane,
    Watch,
    Car,
    Tag
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLifestyle() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/listings?category=lifestyle')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lifestyle item?')) return;

        try {
            const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setItems(items.filter(p => p.id !== id));
            }
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    const getIcon = (category: string) => {
        switch (category) {
            case 'Yacht': return <Anchor size={20} />;
            case 'Jet': return <Plane size={20} />;
            case 'Watch': return <Watch size={20} />;
            case 'Car': return <Car size={20} />;
            default: return <Tag size={20} />;
        }
    };

    const filteredItems = items.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Lifestyle Portfolio</h1>
                        <p className="text-zinc-500">Manage yachts, jets, supercars and luxury timepieces.</p>
                    </div>
                    <Link
                        href="/admin/lifestyle/new"
                        className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        <span>Add New Item</span>
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            className="w-full bg-[#141414] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-[#141414] border border-white/5 rounded-3xl h-80 animate-pulse" />
                        ))
                    ) : filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all group flex flex-col">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.images[0]?.url || '/assets/placeholder.jpg'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] uppercase tracking-widest font-bold text-white border border-white/10">
                                        <span className="text-pink-500">{getIcon(item.category)}</span>
                                        {item.category}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-white group-hover:text-pink-500 transition-colors line-clamp-1">{item.title}</h3>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Link
                                                href={`/admin/lifestyle/edit/${item.id}`}
                                                className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-all"
                                            >
                                                <Edit3 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{item.description}</p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-md font-bold text-white">{item.price}</span>
                                        <Link
                                            href={`/lifestyle/${item.id}`}
                                            target="_blank"
                                            className="text-xs text-zinc-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
                                        >
                                            View on site <ExternalLink size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-[#141414] border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
                            <p className="text-zinc-500 mb-6 max-w-xs">Start by adding a new luxury item to your lifestyle portfolio.</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-pink-500 font-bold hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
