import React from 'react';
import './Promos.css';

const promos = [
  {
    day: 'Every Tuesday',
    title: 'Two Dollar Tuesdays',
    subtitle: '$2 Drinks Till Midnight',
    desc: 'Start your week right. Every Tuesday we keep it flowing — $2 well drinks, plus discounted shakers and pitchers. Bring your crew and make it a night.',
    img: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=900&q=80',
    tag: 'Fan Favourite',
    accent: 'gold',
  },
  {
    day: 'Mon – Fri · 5PM – 8PM',
    title: 'Happy Hour',
    subtitle: 'Half-Priced Happiness',
    desc: 'Unwind after work with half-priced cocktails and select bites. The perfect way to ease into the evening in style.',
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80',
    tag: 'Daily Special',
    accent: 'burgundy',
  },
  {
    day: 'Every Weekend',
    title: 'Curated Event Nights',
    subtitle: 'Beats, Vibes & Themed Nights',
    desc: 'Fridays and Saturdays bring the energy with top DJs and rotating themed nights. Check out our calendar for upcoming events and lock in your plans early.',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=900&q=80',
    tag: 'Weekend Vibes',
    accent: 'gold',
  },
];

export default function Promos() {
  return (
    <section id="promos" className="promos">
      <div className="promos-header">
        <span className="section-label">Weekly Specials</span>
        <h2 className="section-title">Join us for <em>something special</em></h2>
        <div className="deco-line" />
      </div>

      <div className="promos-grid">
        {promos.map((p, i) => (
          <div className={`promo-card promo-${p.accent}`} key={i}>
            <div
              className="promo-bg"
              style={{ backgroundImage: `url(${p.img})` }}
            />
            <div className="promo-overlay" />
            <div className="promo-content">
              <span className="promo-tag">{p.tag}</span>
              <div className="promo-day">{p.day}</div>
              <h3 className="promo-title">{p.title}</h3>
              <div className="promo-subtitle">{p.subtitle}</div>
              <div className="promo-divider" />
              <p className="promo-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
