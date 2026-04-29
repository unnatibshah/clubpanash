import React, { useRef, useEffect, useState } from 'react';
import './TopEvents.css';

const TOP_EVENTS = [
  {
    id: 1,
    tag: 'Every Tuesday',
    title: '$2',
    titleSub: 'Tuesdays',
    subtitle: 'Two Dollars. All Night.',
    time: '5:00 PM – Close',
    badge: 'Fan Favourite',
    badgeColor: 'gold',
    img: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&q=90',
    ctaTarget: 'private-events',
  },
  {
    id: 2,
    tag: 'Mon – Fri',
    title: 'Happy',
    titleSub: 'Hour',
    subtitle: 'Half Price. Every Weekday.',
    time: '5:00 PM – 8:00 PM',
    badge: 'Daily',
    badgeColor: 'burgundy',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=90',
    ctaTarget: 'hours',
  },
  {
    id: 3,
    tag: 'Fri & Sat Nights',
    title: 'The',
    titleSub: 'Weekend',
    subtitle: 'The Floor at its Most Electric.',
    time: '9:00 PM – 3:00 AM',
    badge: 'Headliner',
    badgeColor: 'gold',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=90',
    ctaTarget: 'private-events',
  },
  {
    id: 4,
    tag: 'Every Sunday',
    title: 'Sunday',
    titleSub: 'Social',
    subtitle: 'Laid-Back Vibes & Sunday Specials.',
    time: '4:00 PM – 12:00 AM',
    badge: 'Weekly',
    badgeColor: 'burgundy',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=90',
    ctaTarget: 'hours',
  },
];

// Triplicate for seamless infinite scroll
const POSTERS = [...TOP_EVENTS, ...TOP_EVENTS, ...TOP_EVENTS];

export default function TopEvents() {
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);
  const speedRef = useRef(0.6);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const CARD_W = 340; // must match CSS --card-w
    const GAP    = 24;
    const loopWidth = TOP_EVENTS.length * (CARD_W + GAP);

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speedRef.current;
        if (Math.abs(posRef.current) >= loopWidth) {
          posRef.current += loopWidth;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="top-events" className="te-section">
      {/* Header */}
      <div className="te-header">
        <span className="section-label">What We're Known For</span>
        <h2 className="section-title">Signature <em>Nights</em></h2>
        <div className="deco-line" />
      </div>

      {/* Scrolling row */}
      <div
        className="te-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="te-track" ref={trackRef}>
          {POSTERS.map((ev, i) => (
            <div key={`${ev.id}-${i}`} className={`te-poster te-poster-${ev.badgeColor}`}>

              {/* Photo */}
              <div className="te-poster-img">
                <img src={ev.img} alt={ev.title} loading="lazy" />
                <div className="te-poster-img-overlay" />
              </div>

              {/* Badge */}
              <span className={`te-badge te-badge-${ev.badgeColor}`}>{ev.badge}</span>

              {/* Body */}
              <div className="te-poster-body">
                <p className="te-poster-tag">{ev.tag}</p>

                <div className="te-poster-title-block">
                  <span className="te-poster-title-main">{ev.title}</span>
                  <span className="te-poster-title-italic">{ev.titleSub}</span>
                </div>

                <p className="te-poster-subtitle">{ev.subtitle}</p>

                <div className="te-poster-divider" />

                <div className="te-poster-footer">
                  <div className="te-poster-time">
                    <span className="te-time-label">Doors</span>
                    <span className="te-time-val">{ev.time}</span>
                  </div>
                  <button
                    className="te-poster-cta"
                    onClick={() => scrollTo(ev.ctaTarget)}
                  >
                    Reserve →
                  </button>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="te-poster-bottom-line" />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="te-fade te-fade-left" />
        <div className="te-fade te-fade-right" />
      </div>
    </section>
  );
}