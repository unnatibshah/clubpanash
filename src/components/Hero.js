import React from 'react';
import './Hero.css';

export default function Hero({ onCalendarOpen }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-glow hero-glow-gold" />
      <div className="hero-glow hero-glow-burgundy" />
      <div className="hero-grain" />
      <div className="hero-stars" />

      {/* Art deco corners */}
      <div className="deco-corner tl" />
      <div className="deco-corner tr" />
      <div className="deco-corner bl" />
      <div className="deco-corner br" />
      <div className="deco-hline top" />
      <div className="deco-hline bot" />

      <div className="hero-content">
        <div className="hero-logo-wrap">
          <img src="/logo.png" alt="Panash" className="hero-logo" />
        </div>

        <p className="hero-eyebrow">New Brunswick, New Jersey &nbsp;·&nbsp; Premium Lounge</p>

        <h1 className="hero-name">PANASH</h1>

        <p className="hero-tagline">
          Where luxury meets the <em>Night</em>
        </p>

        <div className="hero-divider-row">
          <span className="hero-div-line" />
          <span className="hero-div-diamond">◆</span>
          <span className="hero-div-line" />
        </div>

        <div className="hero-ctas">
          <button className="btn-gold" onClick={() => scrollTo('private-events')}>
            Book Your Event
          </button>
          <button className="btn-outline-gold" onClick={onCalendarOpen}>
            Explore
          </button>
        </div>
      </div>

      <div className="hero-scroll" onClick={() => scrollTo('about')}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
