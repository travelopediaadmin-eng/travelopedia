'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Compass, 
  LayoutDashboard, 
  Users, 
  Package, 
  MapPin, 
  LogOut, 
  ExternalLink, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  // If on login page, don't show admin chrome
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      if (typeof window !== 'undefined') {
        const localAuth = localStorage.getItem('travelopedia_admin_auth');
        if (localAuth) {
          try {
            const user = JSON.parse(localAuth);
            setAdminUser(user);
            return;
          } catch (e) {}
        }
      }

      fetch('/api/auth/me')
        .then(res => {
          if (!res.ok) {
            router.push('/admin/login');
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.user) {
            setAdminUser(data.user);
          }
        })
        .catch(() => {
          if (typeof window !== 'undefined' && !localStorage.getItem('travelopedia_admin_auth')) {
            router.push('/admin/login');
          }
        });
    }
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('travelopedia_admin_auth');
    }
    window.location.href = '/admin/login';
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Leads & Enquiries', href: '/admin/enquiries', icon: Users },
    { label: 'Tour Packages', href: '/admin/packages', icon: Package },
    { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy-950 text-white border-r border-navy-900 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-navy-900/60">
          <Link href="/admin/dashboard" className="block text-center group">
            <div className="flex items-center justify-center py-2 px-3 bg-white rounded-xl shadow-md">
              <img
                src="/logo.png"
                alt="The TraveloPedia"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 block mt-2">
              Surat Admin Portal
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Shortcut */}
        <div className="p-4 border-t border-navy-900">
          <Link
            href="/admin/packages/new"
            className="w-full py-2.5 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-navy-800 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Create New Package</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="w-full mt-2 py-2 px-3 rounded-xl text-slate-400 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-navy-900 bg-navy-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-brand-400 font-bold text-xs flex items-center justify-center uppercase shrink-0">
              {adminUser?.name ? adminUser.name[0] : 'A'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">
                {adminUser?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                {adminUser?.email || 'admin@thetravelopedia.com'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-navy-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="lg:hidden bg-navy-950 text-white p-3.5 flex items-center justify-between border-b border-navy-900">
        <Link href="/admin/dashboard" className="py-1 px-2.5 bg-white rounded-lg shadow-sm">
          <img src="/logo.png" alt="The TraveloPedia" className="h-6 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-navy-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 text-white p-4 space-y-2 border-b border-navy-800">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-navy-800"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-navy-800 flex justify-between">
            <Link href="/" target="_blank" className="text-xs text-amber-300 font-semibold p-2">
              View Public Website &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 font-semibold p-2"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
