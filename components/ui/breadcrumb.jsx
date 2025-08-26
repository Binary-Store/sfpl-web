'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

export default function Breadcrumb({ pathname }) {
  const { lastId } = useGlobal();

  console.log(lastId, "this is last id");
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    if (paths.length > 0) {
      breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });
      
      if (paths.length > 1) {
        const section = paths[1];
        const sectionMap = {
          'devices': 'Device Management',
          'orders': 'Order Management',
          'payments': 'Payment Management'
        };
        
        if (sectionMap[section]) {
          // For device details pages, add the section and then the ID
          if (section === 'devices' && paths.length > 2) {
            breadcrumbs.push({ 
              label: sectionMap[section], 
              href: `/dashboard/${section}`,
              isCurrent: false
            });
            // Add the device ID as the final breadcrumb
            breadcrumbs.push({ 
              label: `Device ${paths[2]}`, 
              href: `/dashboard/${section}/${paths[2]}`,
              isCurrent: true
            });
          } else {
            breadcrumbs.push({ 
              label: sectionMap[section], 
              href: `/dashboard/${section}`,
              isCurrent: true
            });
          }
        }
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="hidden lg:flex items-center space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) =>{ 
        console.log(breadcrumb.label, "this is breadcrumb");
        return (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {breadcrumb.isCurrent ? (
            <span className="text-gray-900 font-medium">{  breadcrumb.label}</span>
          ) : (
            <Link 
              href={breadcrumb.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {lastId ? lastId.id === breadcrumb.label ? lastId.name : breadcrumb.label :breadcrumb.label}
            </Link>
          )}
        </div>
      )})}
    </div>
  );
}
