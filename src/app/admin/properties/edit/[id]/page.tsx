'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PropertyForm from '@/components/admin/PropertyForm';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Property } from '@/types';

export default function EditPropertyPage() {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/listings/${id}`)
                .then(res => res.json())
                .then((data: Property) => {
                    setProperty(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/properties"
                        className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all border border-white/5"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-1">Edit Property</h1>
                        <p className="text-zinc-500">Update listing details for {property?.title || 'Property'}.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 bg-[#141414] border border-white/5 rounded-3xl flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
                    </div>
                ) : property ? (
                    <PropertyForm initialData={property} isEditing={true} />
                ) : (
                    <div className="h-64 bg-[#141414] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Property not found</h3>
                        <Link href="/admin/properties" className="text-pink-500 hover:underline">Back to list</Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
