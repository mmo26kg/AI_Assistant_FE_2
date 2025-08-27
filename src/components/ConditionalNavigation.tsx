'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Ẩn navigation trên trang auth
  const hideNavigation = pathname === '/auth';
  
  if (hideNavigation) {
    return null;
  }
  
  return <Navigation />;
}
