import React, { useState } from 'react';
import './About.css';

const ROOMS = [
  {
    id: 'main',
    // tag: 'The Main Room',
    name: 'The Main Room',
    capacity: 'Up to 300 Guests',
    bar: 'The Grand Bar',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1000&q=85',
    accent: '#7C5200',
    features: ['Main Dance Floor', 'Grand Bar', 'DJ Booth & Stage', 'Weekly Events'],
    desc: 'The heartbeat of Panash. A pulsing dance floor, the largest bar in the house, and a stage built for unforgettable nights. This is where the energy lives — from $2 Tuesdays to headline DJ nights.',
    cta: 'View Events',
    ctaTarget: 'promos',
  },
  {
    id: 'Social',
    // tag: 'The Middle Room',
    name: 'The Social Room',
    capacity: 'Up to 120 Guests',
    bar: 'The Social Bar',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1000&q=85',
    accent: '#6B0F1A',
    features: ['Intimate Lounge Seating', 'Craft Cocktail Bar', 'Low-Lit Atmosphere', 'Semi-Private Booths'],
    desc: 'A moody, velvet-draped haven between the energy of the floor and the exclusivity of the VIP. The Social is for those who want premium pours, deep conversations, and a setting that feels like a secret worth keeping.',
    cta: 'Book a Booth',
    ctaTarget: 'private-events',
  },
  {
    id: 'vip',
    // tag: 'The VIP Room',
    name: 'The Lounge',
    capacity: 'Up to 50 Guests',
    bar: 'Private Open Bar',
    img: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=1000&q=85',
    accent: '#C49A3C',
    features: ['Full Open Bar Available', 'Private Events', 'Individual Bookings', 'Exclusive Access'],
    desc: 'The most exclusive space in the house. The VIP offers a fully private experience — ideal for birthdays, corporate gatherings, or an elevated night out. Book it for a private event with open bar service, or reserve individual access when available.',
    cta: 'Reserve The VIP',
    ctaTarget: 'private-events',
  },
];

export default function About() {
  const [hovered, setHovered] = useState(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="about">
      {/* Section Header */}
      <div className="about-header">
        <span className="section-label">Explore The Space</span>
        <h2 className="section-title">Three rooms. <em>One experience.</em></h2>
        <div className="deco-line" />
        <p className="about-header-sub">
          Every corner of Panash is designed with intention — choose your vibe, find your room.
        </p>
      </div>

      {/* Room Panels */}
      <div className="rooms-grid">
        {ROOMS.map((room, i) => (
          <div
            key={room.id}
            className={`room-panel ${hovered === room.id ? 'is-hovered' : ''} ${hovered && hovered !== room.id ? 'is-dimmed' : ''}`}
            onMouseEnter={() => setHovered(room.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Background image */}
            <div
              className="room-bg"
              style={{ backgroundImage: `url(${room.img})` }}
            />

            {/* Gradient overlay */}
            <div
              className="room-overlay"
              style={{
                background: `linear-gradient(to top,
                  rgba(6,6,8,0.97) 0%,
                  rgba(6,6,8,0.75) 30%,
                  rgba(6,6,8,0.3) 60%,
                  transparent 100%)`
              }}
            />

            {/* Accent side line */}
            <div className="room-accent-line" style={{ background: room.accent }} />

            {/* Number */}
            <div className="room-number">0{i + 1}</div>

            {/* Content */}
            <div className="room-content">
              <div className="room-content-top">
                <span className="room-tag">{room.tag}</span>
                <h3 className="room-name">{room.name}</h3>
              </div>

              <div className="room-content-bottom">
                <div className="room-divider" style={{ background: room.accent }} />
                <p className="room-desc">{room.desc}</p>

                <div className="room-features">
                  {room.features.map(f => (
                    <span key={f} className="room-feature">
                      <span className="room-feature-dot" style={{ background: room.accent }} />
                      {f}
                    </span>
                  ))}
                </div>

                <div className="room-meta">
                  <div className="room-meta-item">
                    <span className="room-meta-label">Capacity</span>
                    <span className="room-meta-value">{room.capacity}</span>
                  </div>
                  <div className="room-meta-divider" />
                  <div className="room-meta-item">
                    <span className="room-meta-label">Bar</span>
                    <span className="room-meta-value">{room.bar}</span>
                  </div>
                </div>

                <button
                  className="room-cta"
                  style={{ borderColor: room.accent, color: room.accent }}
                  onClick={() => scrollTo(room.ctaTarget)}
                >
                  {room.cta} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
