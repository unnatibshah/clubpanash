import React, { useState } from 'react';
import './Gallery.css';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=900&q=80', alt: 'Signature cocktails', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&q=80', alt: 'Bar setup' },
  { src: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&q=80', alt: 'Lounge interior' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', alt: 'Evening ambiance', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', alt: 'Craft cocktail' },
  { src: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80', alt: 'Night life' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-header">
        <span className="section-label">The Experience</span>
        <h2 className="section-title">A glimpse of <em>Panash</em></h2>
        <div className="deco-line" />
        <p className="gallery-sub">
          Add your own photos here — replace placeholders with actual venue shots
        </p>
      </div>

      <div className="gallery-grid">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className={`gallery-item ${photo.span === 'wide' ? 'wide' : ''}`}
            onClick={() => setLightbox(photo)}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <div className="gallery-item-overlay">
              <span className="gallery-zoom">⊕ View</span>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-ig-banner">
        <span className="gallery-ig-text">
          Follow us for the latest ·&nbsp;
          <a href="https://www.instagram.com/club.panash" target="_blank" rel="noreferrer" className="ig-link">
            @Club.Panash
          </a>
          &nbsp;on Instagram
        </span>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </section>
  );
}
