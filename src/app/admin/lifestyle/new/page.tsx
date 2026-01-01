import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LifestyleForm from '@/components/admin/LifestyleForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewLifestylePage() {
    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/lifestyle"
                        className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all border border-white/5"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-1">Add New Lifestyle Item</h1>
                        <p className="text-zinc-500">Add a new yacht, jet, car or watch to the portfolio.</p>
                    </div>
                </div>

                <LifestyleForm />
            </div>
        </AdminLayout>
    );
}
