'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

export default function Breadcrumb({ pathname }) {
  const { breadcrumbsEndPoint } = useGlobal();

  
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    if (paths.length > 0 && paths[0] === 'dashboard') {
      // Skip 'dashboard' and start from the next segment
      const dashboardPaths = paths.slice(1);
      
      if (dashboardPaths.length > 0) {
        // Add first section
        const firstSection = dashboardPaths[0];
        const sectionMap = {
          'devices': 'Devices',
          'orders': 'Order Management',
          'payments': 'Payment Management',
          'profile': 'Profile'
        };
        
        const sectionLabel = sectionMap[firstSection] || firstSection.charAt(0).toUpperCase() + firstSection.slice(1);
        
        if (dashboardPaths.length === 1) {
          // Only section, no sub-path
          breadcrumbs.push({ 
            label: sectionLabel, 
            href: `/dashboard/${firstSection}`,
            isCurrent: true
          });
        } else {
          // Section with sub-path
          breadcrumbs.push({ 
            label: sectionLabel, 
            href: `/dashboard/${firstSection}`,
            isCurrent: false
          });
          
          // Handle special case for devices with ID
          if (firstSection === 'devices' && dashboardPaths.length > 1) {
            const deviceLabel = breadcrumbsEndPoint.length > 1 ? 
              breadcrumbsEndPoint[1]?.label : 
              breadcrumbsEndPoint[0]?.label || 
              `Device ${dashboardPaths[1]}`;
              
            breadcrumbs.push({ 
              label: deviceLabel, 
              href: `/dashboard/${firstSection}/${dashboardPaths[1]}`,
              isCurrent: true
            });
          } else {
            // Generic sub-path handling
            const subPath = dashboardPaths[1];
            breadcrumbs.push({ 
              label: subPath.charAt(0).toUpperCase() + subPath.slice(1), 
              href: `/dashboard/${firstSection}/${subPath}`,
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
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {breadcrumb.isCurrent ? (
            <span className="text-gray-900 font-medium">{breadcrumb.label}</span>
          ) : (
            <Link 
              href={breadcrumb.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
