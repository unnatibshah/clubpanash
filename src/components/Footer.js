import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';


const socials = [
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/club.panash' },
  { icon: <FaFacebook/>,   label: 'Facebook',   href: 'https://www.facebook.com/people/ClubPanash/61566659213444/' },
  { icon: <FaTiktok/>,   label: 'TikTok',     href: 'https://www.tiktok.com/' },
];

export default function Footer({ onCalendarOpen }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ── CTA Banner ── */}
      <div className="footer-cta-banner">
        <div className="footer-cta-content">
          <span className="footer-cta-label">Ready to experience Panash?</span>
          <h3 className="footer-cta-title">Make it a <em>night to remember</em></h3>
        </div>
        <div className="footer-cta-actions">
          <button className="btn-gold" onClick={() => scrollTo('private-events')}>
            Reserve Your Event
          </button>
          <button className="btn-outline-gold" onClick={onCalendarOpen}>
            View Calendar ↗
          </button>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logo.png" alt="Panash" className="footer-logo" />
          <p className="footer-tagline">
            A premium cocktail lounge experience — where every detail is crafted for you.
          </p>
          <div className="footer-socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="footer-social-icon" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-nav-group">
          <h4 className="footer-nav-heading">Explore</h4>
          <ul>
            <li><button onClick={() => scrollTo('about')}>About Us</button></li>
            <li><button onClick={() => scrollTo('top-events')}>Signature Nights</button></li>
            <li><button onClick={() => scrollTo('promos')}>Weekly Specials</button></li>
            <li><button onClick={() => scrollTo('gallery')}>Gallery</button></li>
            <li><button onClick={onCalendarOpen}>Events Calendar</button></li>
            <li><button onClick={() => scrollTo('hours')}>Hours & Location</button></li>
          </ul>
        </div>

        <div className="footer-nav-group">
          <h4 className="footer-nav-heading">Visit</h4>
          <ul>
            <li><span>13 Paterson Street</span></li>
            <li><span>New Brunswick, NJ 08901</span></li>
            <li><a href="tel:+18486683077">(848) 668-3077</a></li>
            <li><a href="mailto:inquiries@clubpanash.com">inquiries@clubpanash.com</a></li>
          </ul>
        </div>

        <div className="footer-nav-group">
          <h4 className="footer-nav-heading">Hours</h4>
          <ul className="footer-hours">
            <li><span className="fh-day">Mon</span><span className="fh-closed">Closed</span></li>
            <li><span className="fh-day">Tue</span><span>5pm – 2am</span></li>
            <li><span className="fh-day">Wed</span><span>5pm – 12am</span></li>
            <li><span className="fh-day">Thurs</span><span>5pm – 2am</span></li>
            <li><span className="fh-day">Fri</span><span>4pm – 2am</span></li>
            <li><span className="fh-day">Sat</span><span>5pm – 2am</span></li>
            <li><span className="fh-day">Sun</span><span>4pm – 12am</span></li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} Panash · All Rights Reserved
        </p>
        <div className="footer-deco">
          <span>◆</span>
          <span>Crafted with care</span>
          <span>◆</span>
        </div>
        <p className="footer-copy footer-right">
          Drink Responsibly · Must be 21+
        </p>
      </div>
    </footer>
  );
}
