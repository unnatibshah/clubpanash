import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ onCalendarOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#hero" className="nav-logo-link" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <img src="/panash_logo.png" alt="Panash" className="nav-logo" />
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('promos')}>Specials</button></li>
          <li><button onClick={() => scrollTo('gallery')}>Gallery</button></li>
          <li>
            <button onClick={onCalendarOpen} className="nav-events-btn">
              Events <span className="nav-badge">↗</span>
            </button>
          </li>
          <li><button onClick={() => scrollTo('hours')}>Hours</button></li>
          <li>
            <button onClick={() => scrollTo('private-events')} className="nav-reserve">
              Contact Us
            </button>
          </li>
        </ul>

        {/* Burger */}
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => scrollTo('about')}>About</button>
        <button onClick={() => scrollTo('promos')}>Specials</button>
        <button onClick={() => scrollTo('gallery')}>Gallery</button>
        <button onClick={() => { onCalendarOpen(); setMenuOpen(false); }}>Events Calendar</button>
        <button onClick={() => scrollTo('hours')}>Hours & Location</button>
        <button onClick={() => scrollTo('private-events')}>Private Events</button>
      </div>
    </nav>
  );
}
