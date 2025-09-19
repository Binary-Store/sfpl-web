'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Smartphone, 
  Package, 
  CreditCard, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  User
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import Breadcrumb from '@/components/ui/breadcrumb';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    
    if (!storedToken) {
      router.push('/login');
    }
  }, [router]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const c = parsed?.customer ?? parsed;
        setCustomer(c ?? null);
      } else {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
          setCustomer(JSON.parse(storedCustomer));
        }
      }
    } catch (e) {
      setCustomer(null);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('customer');
    } catch {}
    router.push('/login');
  };

  const openLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const closeLogoutConfirm = () => {
    setShowLogoutConfirm(false);
  };

  const sidebarItems = [
    // {
    //   href: '/dashboard',
    //   label: 'Dashboard',
    //   icon: LayoutDashboard,
    //   isMain: true
    // },
    {
      href: '/dashboard/projects',
      label: 'projects',
      icon: Smartphone
    },
    {
      href: '/dashboard/orders',
      label: 'Orders',
      icon: Package
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: User
    },
    // {
    //   href: '/dashboard/payments',
    //   label: 'Payment History',
    //   icon: CreditCard
    // }
  ];



  return (
    <div className="h-screen flex overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarCollapsed ? 'w-16' : 'w-64'}
        lg:relative lg:flex lg:flex-col lg:h-full
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          {!isSidebarCollapsed && (
            <div className="mx-10 py-2 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => router.push('/')}>
              <Image 
                src="/logo.svg" 
                alt="Smart Fire System Logo" 
                width={100}
                height={100}
              />
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`hidden lg:block p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors ${
              isSidebarCollapsed ? 'mx-auto' : ''
            }`}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center rounded-lg text-sm font-medium transition-colors group
                  ${(item.href === '/dashboard' 
                      ? pathname === '/dashboard' 
                      : pathname.startsWith(item.href))
                    ? 'bg-red-50 text-red-600 border-l-4 border-primary' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${isSidebarCollapsed ? 'justify-center px-2 py-2' : 'px-4 py-3 space-x-3'}
                `}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <Icon className={`w-5 h-5 ${isSidebarCollapsed ? 'mx-auto' : ''}`} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={openLogoutConfirm}
            className={`
              w-full flex items-center rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors
              ${isSidebarCollapsed ? 'justify-center px-2 py-2' : 'px-4 py-2 space-x-3'}
            `}
            title={isSidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
        {/* Top Bar with Breadcrumbs */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumbs */}
            <Breadcrumb pathname={pathname} />
            
            <div className="w-8"></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-2 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={closeLogoutConfirm}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to log out?"
      />
    </div>
  );
}
