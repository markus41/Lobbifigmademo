import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { landingCopy } from '@/app/data/landingCopy';

interface NavbarProps {
  onRequestDemo: () => void;
}

export function Navbar({ onRequestDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleAnchorClick = (href: string) => {
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`lobbi-nav ${isScrolled ? 'lobbi-nav-scrolled' : ''}`}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
        <button
          type="button"
          onClick={() => handleAnchorClick('#hero')}
          className="lobbi-logo lobbi-focusable"
          aria-label="Go to top"
        >
          <span className="lobbi-logo-mark" aria-hidden="true">
            L
          </span>
          <span className="lobbi-logo-wordmark">{landingCopy.nav.logoText}</span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {landingCopy.nav.links.map((link) => (
            <button
              key={link.href}
              type="button"
              className="lobbi-nav-link lobbi-focusable"
              onClick={() => handleAnchorClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Button variant="primary" size="md" onClick={onRequestDemo}>
            {landingCopy.nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className="lobbi-icon-button lobbi-focusable lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="lobbi-mobile-menu"
          aria-label="Open navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="lobbi-mobile-menu" className="lobbi-mobile-menu lg:hidden">
          <div className="lobbi-mobile-menu-accent" />
          <nav className="lobbi-mobile-menu-content" aria-label="Mobile primary">
            {landingCopy.nav.links.map((link) => (
              <button
                key={link.href}
                type="button"
                className="lobbi-mobile-nav-link lobbi-focusable"
                onClick={() => handleAnchorClick(link.href)}
              >
                {link.label}
              </button>
            ))}
            <Button variant="primary" size="lg" onClick={onRequestDemo}>
              {landingCopy.nav.cta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
