import React from 'react';
import './Hours.css';

const hours = [
  { day: 'Monday',    time: 'Closed', closed: true },
  { day: 'Tuesday',   time: '5:00 PM – 2:00 AM' },
  { day: 'Wednesday', time: '5:00 PM – 12:00 AM' },
  { day: 'Thursday',  time: '5:00 PM – 2:00 AM' },
  { day: 'Friday',    time: '5:00 PM – 2:00 AM' },
  { day: 'Saturday',  time: '5:00 PM – 2:00 AM' },
  { day: 'Sunday',    time: '5:00 PM – 12:00 AM' },
];

export default function Hours() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="hours" className="hours">
      
      {/* LEFT SIDE - HOURS */}
      <div className="hours-left">
        <span className="section-label">Find Us</span>
        <h2 className="section-title">Hours &amp; <em>Location</em></h2>
        <div className="deco-line" />

        <table className="hours-table">
          <tbody>
            {hours.map((h) => (
              <tr
                key={h.day}
                className={`${h.closed ? 'closed' : ''} ${h.day === today ? 'today' : ''}`}
              >
                <td className="hours-day">
                  {h.day === today && <span className="today-dot" />}
                  {h.day}
                </td>
                <td className="hours-time">{h.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="hours-note">
          <p>Hours may vary on holidays — follow our socials for updates.</p>
        </div>
      </div>

      {/* RIGHT SIDE - LOCATION */}
      <div className="hours-right">
        <div className="location-block">
          <span className="section-label">Address</span>
          <h3 className="location-title">PANASH</h3>
          <div className="deco-line" />

          <div className="location-detail">
            <div className="location-icon">📍</div>
            <div>
              <p>13 Paterson Street</p>
              <p>New Brunswick, NJ 08901</p>
            </div>
          </div>

          <div className="location-detail">
            <div className="location-icon">📞</div>
            <div>
              <a href="tel:+18486683077">(848) 668-3077</a>
            </div>
          </div>

          <div className="location-detail">
            <div className="location-icon">✉</div>
            <div>
              <a href="mailto:inquiries@clubpanash.com">
                inquiries@clubpanash.com
              </a>
            </div>
          </div>

          {/* MAP */}
          <div className="location-map">
            <iframe
              title="Panash Location"
              src="https://www.google.com/maps?q=13+Paterson+Street+New+Brunswick+NJ+08901&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

    </section>
  );
}