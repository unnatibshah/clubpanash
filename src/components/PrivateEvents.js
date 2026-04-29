import React, { useState } from 'react';
import './PrivateEvents.css';

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '', ext: '',
  preferContact: 'Email', company: '',
  eventType: '', eventDate: '', startTime: '6:00pm', endTime: '9:00pm',
  guests: '', notes: '', hearAbout: '',
};

export default function PrivateEvents() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm(initialForm); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="private-events" className="pe-section">
      <div className="pe-container">
        <div className="pe-header">
          <span className="section-label">Reserve Your Event</span>
          <h2 className="section-title">Private <em>Events & Inquiries</em></h2>
          <div className="deco-line" />
          <p className="pe-intro">
            You bring the idea, we'll make it unforgettable. Tell us about your upcoming
celebration — whether it's a birthday, a milestone, or a corporate event —
and our team will be in touch within 24 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="pe-success">
            <div className="pe-success-icon">✦</div>
            <h3>Thank you for your inquiry</h3>
            <p>Our events team will be in touch within 24 hours. We look forward to hosting you.</p>
            <button className="btn-gold" onClick={() => setStatus('idle')}>Submit Another</button>
          </div>
        ) : (
          <form className="pe-form" onSubmit={handleSubmit} noValidate>

            {/* ── CONTACT INFO ── */}
            <div className="pe-form-section-title">Your Contact Information</div>

            <div className="pe-row two">
              <div className="pe-field">
                <label>First Name <span className="req">*</span></label>
                <input type="text" value={form.firstName} onChange={set('firstName')} required placeholder="First name" />
              </div>
              <div className="pe-field">
                <label>Last Name <span className="req">*</span></label>
                <input type="text" value={form.lastName} onChange={set('lastName')} required placeholder="Last name" />
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Email Address <span className="req">*</span></label>
                <input type="email" value={form.email} onChange={set('email')} required placeholder="your@email.com" />
              </div>
            </div>

            <div className="pe-row two">
              <div className="pe-field">
                <label>Phone Number <span className="req">*</span></label>
                <input type="tel" value={form.phone} onChange={set('phone')} required placeholder="(000) 000-0000" />
              </div>
              <div className="pe-field">
                <label>Ext.</label>
                <input type="text" value={form.ext} onChange={set('ext')} placeholder="Extension" />
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>How would you prefer to be contacted?</label>
                <select value={form.preferContact} onChange={set('preferContact')}>
                  <option>Phone</option>
                  <option>Email</option>
                  <option>Text</option>
                </select>
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Company</label>
                <input type="text" value={form.company} onChange={set('company')} placeholder="Company name (optional)" />
              </div>
            </div>

            {/* ── EVENT DETAILS ── */}
            <div className="pe-form-section-title">Your Event Details</div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Nature of this Event <em>(e.g., Birthday Party or Business Dinner)</em></label>
                <input type="text" value={form.eventType} onChange={set('eventType')} placeholder="Describe your event" />
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Event Date</label>
                <input type="date" value={form.eventDate} onChange={set('eventDate')} />
              </div>
            </div>

            <div className="pe-row two">
              <div className="pe-field">
                <label>Start Time</label>
                <select value={form.startTime} onChange={set('startTime')}>
                  {['12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm',
                    '7:00pm','8:00pm','9:00pm','10:00pm','11:00pm'].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="pe-field">
                <label>End Time</label>
                <select value={form.endTime} onChange={set('endTime')}>
                  {['8:00pm','9:00pm','10:00pm','11:00pm','12:00am','1:00am','2:00am'].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Number of People</label>
                <input type="number" value={form.guests} onChange={set('guests')} placeholder="Expected guest count" min="1" />
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>Is there any additional information you would like to add?</label>
                <textarea value={form.notes} onChange={set('notes')} rows={5} placeholder="Special requests, dietary needs, vision for the event..." />
              </div>
            </div>

            <div className="pe-row one">
              <div className="pe-field">
                <label>How did you hear about us?</label>
                <select value={form.hearAbout} onChange={set('hearAbout')}>
                  <option value="">Select an option</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>TikTok</option>
                  <option>Google Search</option>
                  <option>Word of Mouth</option>
                  <option>Walked By</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="pe-submit-row">
              <button type="submit" className="btn-gold pe-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit Inquiry'}
              </button>
              {status === 'error' && (
                <p className="pe-error">Something went wrong. Please email us directly at inquiries@clubpanash.com</p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
