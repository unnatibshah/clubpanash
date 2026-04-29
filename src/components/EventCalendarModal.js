import React, { useState, useMemo } from 'react';
import './EventCalendarModal.css';

// ── Event data ── add/edit your events here ──────────────────────────
const ALL_EVENTS = [
  {
    id: 1,
    date: new Date(2026, 3, 21),   // Apr 21
    day: 'TUE', title: '$2 Tuesdays',
    sub: 'Select drinks · $2 all night',
    time: '5:00 PM – Close',
    img: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 2,
    date: new Date(2026, 3, 24),   // Apr 24
    day: 'FRI', title: 'Friday Night Live',
    sub: 'DJ Sets & VIP Bottle Service',
    time: '9:00 PM – 3:00 AM',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 3,
    date: new Date(2026, 3, 25),   // Apr 25
    day: 'SAT', title: 'Saturday Soirée',
    sub: 'The biggest night of the week',
    time: '4:00 PM – 3:00 AM',
    img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 4,
    date: new Date(2026, 3, 28),   // Apr 28
    day: 'TUE', title: '$2 Tuesdays',
    sub: 'Select drinks · $2 all night',
    time: '5:00 PM – Close',
    img: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 5,
    date: new Date(2026, 4, 1),    // May 1
    day: 'FRI', title: 'May Day Madness',
    sub: 'Specialty cocktail menu · Live DJ',
    time: '8:00 PM – 3:00 AM',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80',
    cta: 'Book Now',
  },
  {
    id: 6,
    date: new Date(2026, 4, 3),    // May 3
    day: 'SUN', title: 'Sunday Social',
    sub: 'Laid-back vibes & Sunday specials',
    time: '4:00 PM – 12:00 AM',
    img: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 7,
    date: new Date(2026, 4, 5),    // May 5
    day: 'TUE', title: 'Cinco De Mayo $2 Tuesdays',
    sub: 'Special holiday edition — $2 drinks',
    time: '5:00 PM – Close',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80',
    cta: 'Book Now',
  },
  {
    id: 8,
    date: new Date(2026, 4, 8),    // May 8
    day: 'FRI', title: 'Friday Night Live',
    sub: 'DJ Sets & VIP Bottle Service',
    time: '9:00 PM – 3:00 AM',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=500&q=80',
    cta: 'Reserve Table',
  },
  {
    id: 9,
    date: new Date(2026, 4, 23),   // May 23
    day: 'SAT', title: 'Memorial Day Weekend',
    sub: 'Extended hours · Rooftop specials · VIP only',
    time: '2:00 PM – 3:00 AM',
    img: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&q=80',
    cta: 'Book Now',
  },
];

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const SHORT_MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export default function EventCalendarModal({ open, onClose }) {
  const [filterMonth, setFilterMonth] = useState(null);   // null = all
  const [filterTag, setFilterTag]     = useState('ALL');

  const availableMonths = useMemo(() => {
    const set = new Set(ALL_EVENTS.map(e => e.date.getMonth()));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return ALL_EVENTS
      .filter(e => filterMonth === null || e.date.getMonth() === filterMonth)
      .filter(e => filterTag === 'ALL' || e.tag === filterTag)
      .sort((a, b) => a.date - b.date);
  }, [filterMonth, filterTag]);

  if (!open) return null;

  const scrollToPrivate = () => {
    onClose();
    setTimeout(() => document.getElementById('private-events')
      ?.scrollIntoView({ behavior: 'smooth' }), 200);
  };

  return (
    <div className="ecm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ecm-modal">

        {/* ── Top bar ── */}
        <div className="ecm-topbar">
          <div className="ecm-topbar-left">
            <img src="/logo.png" alt="Panash" className="ecm-logo" />
            <div>
              <p className="ecm-eyebrow">Panash</p>
              <h2 className="ecm-title">Upcoming <em>Events</em></h2>
            </div>
          </div>
          <button className="ecm-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── Filters ── */}
        <div className="ecm-filters">
          <div className="ecm-filter-group">
            {/* Month filter */}
            <button
              className={`ecm-filter-btn ${filterMonth === null ? 'active' : ''}`}
              onClick={() => setFilterMonth(null)}
            >All Dates</button>
            {availableMonths.map(m => (
              <button
                key={m}
                className={`ecm-filter-btn ${filterMonth === m ? 'active' : ''}`}
                onClick={() => setFilterMonth(m)}
              >{SHORT_MONTHS[m]}</button>
            ))}
          </div>
        </div>

        {/* ── Event list ── */}
        <div className="ecm-list">
          {filtered.length === 0 ? (
            <div className="ecm-empty">
              <span>◈</span>
              <p>No events match this filter — check back soon.</p>
            </div>
          ) : (
            filtered.map(ev => (
              <EventCard key={ev.id} ev={ev} onInquire={scrollToPrivate} />
            ))
          )}
        </div>

        {/* ── Footer ── */}
        <div className="ecm-footer">
          <p>Want to host a private event?</p>
          <button className="btn-gold ecm-inquire-btn" onClick={scrollToPrivate}>
            Submit a Private Inquiry
          </button>
        </div>

      </div>
    </div>
  );
}

function EventCard({ ev, onInquire }) {
  const d = ev.date;
  const month = SHORT_MONTHS[d.getMonth()];
  const dateNum = d.getDate();

  return (
    <div className="ecm-card">
      {/* Poster / image */}
      <div className="ecm-card-img">
        <img src={ev.img} alt={ev.title} loading="lazy" />
        <div className="ecm-card-img-overlay" />
      </div>

      {/* Date badge */}
      <div className="ecm-date-badge">
        <span className="ecm-date-day">{ev.day}</span>
        <span className="ecm-date-num">{dateNum}</span>
        <span className="ecm-date-month">{month}</span>
      </div>

      {/* Info */}
      <div className="ecm-card-info">
        <span className={`ecm-card-tag tag-${ev.tagColor}`}>{ev.tag}</span>
        <h3 className="ecm-card-title">{ev.title}</h3>
        <p className="ecm-card-sub">{ev.sub}</p>
        <p className="ecm-card-time">🕐 {ev.time}</p>
      </div>

      {/* CTA */}
      {/* <div className="ecm-card-cta">
        <button className="btn-gold ecm-cta-btn" onClick={onInquire}>
          {ev.cta}
        </button>
      </div> */}
    </div>
  );
}
