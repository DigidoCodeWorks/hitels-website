import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/cdn';

const LINKS = [
  { label: 'Booking engine', href: '/booking-engine', badge: 'New' },
  { label: 'Custom website', href: '/custom-hotels-website' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About us', href: '/about-us' },
  { label: 'Resources', href: '/discover' },
  { label: 'Contact us', href: '/contact-us' },
];

// Local mirror of shared/Button.astro's prop shape (styles kept in sync by
// hand) -- kept separate since Astro components can't be imported into a
// React island.
const VARIANT_STYLES = {
  primary: 'bg-yellow text-navy hover:bg-brand hover:text-background',
  secondary: 'bg-background text-navy hover:bg-navy hover:text-background',
  dark: 'bg-navy text-background hover:bg-background hover:text-navy hover:border-navy',
};

// Inline (not R2-hosted) so stroke="currentColor" can follow the pill's own
// text color -- matches the desktop persistent CTA's smaller icon geometry
// (previously two separate pre-baked files, icon-calendar-nav.svg /
// icon-calendar-nav-white.svg, one per isLight state; that pair never
// followed the pill's *hover* color, only the isLight swap).
function IconCalendarNav({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 1.5V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 1.5V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 5.5H13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Same glyph as shared/icons/IconCalendar.astro (used by Button.astro), kept
// as its own local copy for the same reason as IconCalendarNav above -- this
// is the mobile drawer's larger CTA icon (previously icon-calendar-cta.svg).
function IconCalendarCta({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.75 1.875V4.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.25 1.875V4.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.125 6.875H16.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaPill({
  href,
  label,
  icon: Icon,
  variant,
  padding = 'pl-4 pr-5 py-3',
  gap = 'gap-3',
  iconSize = 'size-5',
  textSize = 'text-body-md',
  className = '',
}: {
  href: string;
  label: string;
  icon?: (props: { className?: string }) => React.JSX.Element;
  variant: 'primary' | 'secondary' | 'dark';
  padding?: string;
  gap?: string;
  iconSize?: string;
  textSize?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${VARIANT_STYLES[variant]} flex ${gap} items-center justify-center rounded-lg border-2 border-transparent transition-colors duration-300 ${padding} ${className}`}
    >
      {Icon && <Icon className={iconSize} />}
      <span className={`font-body font-medium ${textSize} whitespace-nowrap`}>{label}</span>
    </a>
  );
}

// 'dark' (default) is for the gradient/dark hero backgrounds every existing
// page uses. 'light' is for pages like Blog Detail where the nav sits
// directly on the plain page background (bg-background) instead of a hero.
type NavigationProps = {
  variant?: 'dark' | 'light';
};

export default function Navigation({ variant = 'dark' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  // Tracks whether the page has been scrolled past its hero section (marked with
  // data-hero on the hero's root element) -- only relevant for variant="dark", since
  // "light" pages have no hero to leave and are always in the light-on-white state.
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isLight = variant === 'light' || scrolledPastHero;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Nav is fixed (out of flow), so measure its own height to reserve the
  // equivalent space where it sits in the document via the spacer below.
  useEffect(() => {
    const measure = () => setNavHeight(navRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (variant !== 'dark') return;
    const heroEl = navRef.current?.closest('[data-hero]');
    if (!heroEl) return;
    // rootMargin pulls the observation line down by the nav's own height, so the
    // switch fires exactly when the hero has fully scrolled out from under the nav.
    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPastHero(!entry.isIntersecting),
      { rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [variant, navHeight]);

  return (
    <>
      {/* Reserves the nav's space in normal flow now that the nav itself is fixed. */}
      <div style={navHeight ? { height: navHeight } : undefined} aria-hidden="true" />
      <nav
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isLight ? 'bg-background/70' : 'bg-transparent'} backdrop-blur-[18px] w-full ${isOpen ? 'max-lg:invisible' : ''}`}
      >
        <div className="flex items-center justify-between px-4 lg:px-[100px] py-4 max-w-[1440px] mx-auto">
          <a href="/" className="block h-6 w-[88px]">
            <img src={asset(isLight ? 'images/home/nav/mobile-menu-logo-dark.svg' : 'images/home/hero/hitels-logo.svg')} alt="Hitels" className="h-full w-full" />
          </a>

          <div className="flex gap-6 items-center">
            <div className="hidden lg:flex gap-6 items-center">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative font-body font-medium ${isLight ? 'text-navy' : 'text-background'} text-body-sm whitespace-nowrap py-1`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${isLight ? 'bg-navy' : 'bg-background'}`}
                  />
                </a>
              ))}
            </div>
            {/* Book a demo stays visible on tablet (only true mobile, <768px, drops it) — confirmed against the Tablet Home frame, which keeps this button next to the hamburger */}
            <CtaPill
              href="/contact-us"
              label="Book a demo"
              icon={IconCalendarNav}
              variant={isLight ? 'dark' : 'secondary'}
              padding="pl-3 pr-4 py-2"
              gap="gap-2"
              iconSize="size-4"
              textSize="text-body-sm"
              className="hidden md:flex"
            />
            <button
              type="button"
              className="lg:hidden block relative shrink-0 size-8"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
            >
              <img src={asset(isLight ? 'images/home/nav/mobile-nav-hamburger-navy.svg' : 'images/home/nav/mobile-nav-hamburger.svg')} alt="" className="size-full" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="backdrop-blur-[18px] flex items-center justify-between p-4 absolute top-0 left-0 w-full">
          <a href="/" className="block h-6 w-[88px]">
            <img src={asset('images/home/nav/mobile-menu-logo-dark.svg')} alt="Hitels" loading="lazy" className="h-full w-full" />
          </a>
          <button
            type="button"
            className="relative shrink-0 size-8"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            <img src={asset('images/home/nav/mobile-menu-close.svg')} alt="" loading="lazy" className="size-full" />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full pt-[104px] px-4 pb-4">
          <div className="flex flex-col gap-5 items-start w-full">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-h3 text-navy w-full flex gap-3 items-center"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                {link.badge && (
                  <span className="border border-brand text-navy font-body font-medium text-body-sm rounded-full px-2 py-0.5">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-10 items-start w-full">
            <div className="font-heading text-h6 text-navy flex flex-col gap-5 w-full">
              <p>hi@hitels.is</p>
              <p>+354 5478001</p>
            </div>
            <CtaPill
              href="/contact-us"
              label="Book a demo"
              icon={IconCalendarCta}
              variant="primary"
              padding="px-4 py-3"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
