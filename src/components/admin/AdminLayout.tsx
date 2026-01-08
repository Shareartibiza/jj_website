'use client';

import { useState, useEffect, ElementType } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Home,
    Anchor,
    Car,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    icon: ElementType;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems: NavItem[] = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Properties', href: '/admin/properties', icon: Home },
        { name: 'Lifestyle', href: '/admin/lifestyle', icon: Anchor },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const handleLogout = () => {
        // Clear cookie (logic will be in middleware/api usually)
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-pink-500/30">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-[#1a1a1a] border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">JJ</div>
                    <span className="font-playfair font-bold text-lg tracking-wider">BACKOFFICE</span>
                </div>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
          ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}
          fixed lg:static inset-y-0 left-0 z-50
          transition-all duration-300 ease-in-out
          bg-[#141414] border-r border-white/10
          flex flex-col overflow-hidden
        `}>
                    <div className="p-6 hidden lg:block">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-pink-500/20">JJ</div>
                            <div className="flex flex-col">
                                <span className="font-playfair font-bold text-xl tracking-wider leading-none">JJ LUXURY</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Management Console</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                                            ? 'bg-gradient-to-r from-pink-500/10 to-transparent text-pink-500 border-l-2 border-pink-500'
                                            : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                        }
                  `}
                                >
                                    <item.icon size={20} className={isActive ? 'text-pink-500' : 'text-zinc-500 group-hover:text-white'} />
                                    <span className="font-medium text-sm">{item.name}</span>
                                    {isActive && <ChevronRight size={14} className="ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200"
                        >
                            <LogOut size={20} />
                            <span className="font-medium text-sm">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Backdrop for mobile */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-h-screen relative">
                    <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
