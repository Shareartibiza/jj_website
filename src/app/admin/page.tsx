import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Plus,
    TrendingUp,
    Users,
    Eye,
    ArrowUpRight,
    PlusCircle,
    Home,
    Anchor
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Listings', value: '7', change: '+2', icon: Home, color: 'text-pink-500' },
        { name: 'Page Views', value: '1,248', change: '+12%', icon: Eye, color: 'text-blue-500' },
        { name: 'Inquiries', value: '42', change: '+5', icon: TrendingUp, color: 'text-green-500' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Welcome back, JJLIFE</h1>
                        <p className="text-zinc-500">Here&apos;s what&apos;s happening with your luxury portfolio today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/properties/new"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl transition-all"
                        >
                            <PlusCircle size={18} />
                            <span>Add Property</span>
                        </Link>
                        <Link
                            href="/admin/lifestyle/new"
                            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/20 transition-all"
                        >
                            <Plus size={18} />
                            <span>Add Lifestyle</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                    <ArrowUpRight size={12} />
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-zinc-500 text-sm mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions / Recent Activiy Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#141414] border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Quick Listing Access</h2>
                        <div className="space-y-4">
                            <Link href="/admin/properties" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-500/10 flex items-center justify-center rounded-xl text-pink-500">
                                        <Home size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Properties</p>
                                        <p className="text-sm text-zinc-500">Manage villas and developments</p>
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-zinc-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="/admin/lifestyle" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-xl text-blue-500">
                                        <Anchor size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Lifestyle Portfolio</p>
                                        <p className="text-sm text-zinc-500">Yachts, Jets, and Supercars</p>
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-zinc-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 overflow-hidden">
                        <h2 className="text-xl font-bold text-white mb-6">Latest Updates</h2>
                        <div className="space-y-6">
                            {[
                                { type: 'property', title: 'Villa Es Cubells', action: 'updated', time: '2 hours ago' },
                                { type: 'lifestyle', title: 'Sunseeker 131', action: 'price changed', time: '5 hours ago' },
                                { type: 'property', title: 'Modern Bay Retreat', action: 'new photos added', time: '1 day ago' }
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i < 2 && <div className="absolute top-8 bottom-[-24px] left-[15px] w-[1px] bg-white/5" />}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${activity.type === 'property' ? 'bg-pink-500/20 text-pink-500' : 'bg-blue-500/20 text-blue-500'
                                        }`}>
                                        {activity.type === 'property' ? <Home size={14} /> : <Anchor size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">
                                            <span className="font-bold">{activity.title}</span> was {activity.action}
                                        </p>
                                        <p className="text-xs text-zinc-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
    );
}
