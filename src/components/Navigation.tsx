'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Radar } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

interface NavItem { href: string; label: string; badge?: string; }

const NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/expense-expert', label: 'Expense Expert', badge: 'NEW' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  // refs for persistent highlight
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; height: number } | null>(null);

  const computeIndicator = useCallback(() => {
    const activeLink = Object.entries(linkRefs.current).find(([href]) => {
      return href === '/' ? pathname === '/' : pathname.startsWith(href);
    });
    if (!activeLink) return;
    const el = activeLink[1];
    const parent = linksContainerRef.current;
    if (!el || !parent) return;
    const rect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [pathname]);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setIsScrolled(y > 10);
        const down = y > lastY.current + 4;
        const up = y < lastY.current - 4;
        if (down && y > 100) setShowBar(false); else if (up) setShowBar(true);
        lastY.current = y;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', computeIndicator);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', computeIndicator);
    };
  }, [onScroll, computeIndicator]);

  // Ensure nav is visible immediately on route change to preserve pill animation origin
  useEffect(() => {
    setShowBar(true);
    // defer measurement to next frame after potential layout shift
    requestAnimationFrame(() => computeIndicator());
  }, [pathname, computeIndicator]);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: showBar ? 0 : -72, opacity: showBar ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
        className={`nav-shell nav-animated-gradient overflow-hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${isScrolled ? 'backdrop-blur-xl bg-background/60 border-white/10 dark:border-white/5' : 'bg-background/30 border-transparent'} `}
        style={{ WebkitBackdropFilter: 'blur(18px)' }}
      >
        <div className="container mx-auto px-6">
          <div className="h-16 flex items-center">
            {/* Brand */}
            <Link href="/" className="group flex items-center gap-2 pr-6">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary via-primary/70 to-primary/40 shadow-sm brand-capsule ring-1 ring-slate-200/60 dark:ring-slate-500/40">
                <div className="absolute inset-0 opacity-70 hidden md:block">
                  <Player
                    autoplay
                    loop
                    speed={2.2}
                    src={require('../lottie/brand.json')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <Radar className="w-5 h-5 text-white drop-shadow relative" />
              </div>
              <span className="font-mono font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 hidden sm:inline">KATCHX</span>
            </Link>

            {/* Centered Links */}
            <div className="flex-1 hidden md:flex justify-center">
              <LayoutGroup>
                <div ref={linksContainerRef} className="flex items-center gap-1 relative">
                  {indicator && (
                    <motion.span
                      aria-hidden
                      className="absolute top-0 rounded-lg -z-10 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 dark:from-primary/20 dark:via-primary/15 dark:to-primary/20"
                      style={{ height: indicator.height }}
                      initial={false}
                      animate={{ left: indicator.left, width: indicator.width }}
                      transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.6 }}
                    />
                  )}
                  {NAV_LINKS.map(link => {
                    const active = isActive(link.href);
                    return (
                      <NavLink
                        key={link.href}
                        link={link}
                        active={active}
                        refCallback={(el) => (linkRefs.current[link.href] = el)}
                        onMountMeasure={computeIndicator}
                      />
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            {/* Actions (only theme toggle now) */}
            <div className="flex items-center gap-4 pl-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

interface NavLinkProps { link: NavItem; active: boolean; refCallback: (el: HTMLAnchorElement | null) => void; onMountMeasure: () => void; }
function NavLink({ link, active, refCallback, onMountMeasure }: NavLinkProps) {
  return (
    <Link
      ref={(el) => { refCallback(el); if (el) requestAnimationFrame(onMountMeasure); }}
      href={link.href}
      aria-current={active ? 'page' : undefined}
      className={`nav-link relative px-4 py-2 tracking-[0.18em] text-[11px] font-medium rounded-lg transition-colors duration-300 ${active ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`}
    >
      <span className="nav-link-text flex items-center gap-2 relative z-10">
        {link.label}
        {link.badge && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/20 text-primary font-semibold tracking-wider">{link.badge}</span>
        )}
      </span>
    </Link>
  );
}

function BrandParticles() { return null; }