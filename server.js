const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT;

// ── Middleware ──
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// ── GoDaddy local SMTP relay ──
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
  auth: false,
});

// ── Health check ──
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── POST /api/inquire ──
app.post('/api/inquire', async (req, res) => {
  const {
    firstName, lastName, email, phone, ext,
    preferContact, company,
    eventType, eventDate, startTime, endTime,
    guests, notes, hearAbout,
  } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Respond immediately — don't make user wait
  res.status(200).json({ success: true });

  const inquiryHtml = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#060608;padding:32px;text-align:center;border-bottom:2px solid #7C5200;">
        <h1 style="color:#E8BE6A;font-size:28px;letter-spacing:8px;margin:0;text-transform:uppercase;">Panash</h1>
        <p style="color:#C49A3C;font-size:12px;letter-spacing:4px;margin:8px 0 0;text-transform:uppercase;">New Private Event Inquiry</p>
      </div>
      <div style="background:#fdf8f0;padding:36px;">
        <h2 style="color:#7C5200;font-size:16px;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid #e0d0b0;padding-bottom:12px;">Contact Information</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:12px;">
          <tr><td style="padding:8px 0;color:#555;width:40%;font-size:13px;">Full Name</td><td style="padding:8px 0;font-weight:bold;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#7C5200;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Phone</td><td style="padding:8px 0;">${phone}${ext ? ` ext. ${ext}` : ''}</td></tr>
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Preferred Contact</td><td style="padding:8px 0;">${preferContact}</td></tr>
          ${company ? `<tr><td style="padding:8px 0;color:#555;font-size:13px;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
        </table>
        <h2 style="color:#7C5200;font-size:16px;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid #e0d0b0;padding-bottom:12px;margin-top:28px;">Event Details</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:12px;">
          ${eventType ? `<tr><td style="padding:8px 0;color:#555;width:40%;font-size:13px;">Event Type</td><td style="padding:8px 0;">${eventType}</td></tr>` : ''}
          ${eventDate ? `<tr><td style="padding:8px 0;color:#555;font-size:13px;">Date</td><td style="padding:8px 0;">${new Date(eventDate).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Time</td><td style="padding:8px 0;">${startTime} – ${endTime}</td></tr>
          ${guests ? `<tr><td style="padding:8px 0;color:#555;font-size:13px;">Guests</td><td style="padding:8px 0;">${guests} people</td></tr>` : ''}
          ${hearAbout ? `<tr><td style="padding:8px 0;color:#555;font-size:13px;">Heard About Us</td><td style="padding:8px 0;">${hearAbout}</td></tr>` : ''}
        </table>
        ${notes ? `<h2 style="color:#7C5200;font-size:16px;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid #e0d0b0;padding-bottom:12px;margin-top:28px;">Additional Notes</h2><p style="margin-top:12px;color:#333;line-height:1.7;">${notes}</p>` : ''}
      </div>
      <div style="background:#060608;padding:20px;text-align:center;">
        <p style="color:#7C5200;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;">Panash · 13 Paterson Street · New Brunswick, NJ 08901</p>
      </div>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;">
      <div style="background:#060608;padding:32px;text-align:center;">
        <h1 style="color:#E8BE6A;font-size:24px;letter-spacing:8px;margin:0;text-transform:uppercase;">Panash</h1>
      </div>
      <div style="background:#fdf8f0;padding:36px;">
        <p style="font-size:22px;color:#7C5200;">Dear ${firstName},</p>
        <p style="color:#333;line-height:1.8;margin-top:14px;">Thank you for your interest in hosting a private event at Panash. We have received your inquiry and our events team will be in touch within 24 hours.</p>
        <p style="color:#333;line-height:1.8;margin-top:14px;">For urgent questions please email us at <a href="mailto:inquiries@clubpanash.com" style="color:#7C5200;">inquiries@clubpanash.com</a>.</p>
        <p style="color:#7C5200;font-style:italic;margin-top:28px;">— Panash Events Team</p>
      </div>
      <div style="background:#060608;padding:16px;text-align:center;">
        <p style="color:#7C5200;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">Panash · 13 Paterson Street · New Brunswick, NJ 08901</p>
      </div>
    </div>
  `;

  // Fire and forget — send in background
  transporter.sendMail({
    from: '"Panash Website" <inquiries@clubpanash.com>',
    to: process.env.NOTIFY_EMAIL || 'inquiries@clubpanash.com',
    replyTo: email,
    subject: `New Event Inquiry — ${firstName} ${lastName} · ${eventDate || 'Date TBD'}`,
    html: inquiryHtml,
  }).then(() => {
    console.log(`✓ Inquiry email sent for ${firstName} ${lastName}`);
  }).catch(err => {
    console.error('❌ Inquiry email error:', err.message);
  });

  transporter.sendMail({
    from: '"Panash" <inquiries@clubpanash.com>',
    to: email,
    subject: 'We received your inquiry — Panash',
    html: autoReplyHtml,
  }).then(() => {
    console.log(`✓ Auto-reply sent to ${email}`);
  }).catch(err => {
    console.error('❌ Auto-reply error:', err.message);
  });
});

// ── Serve React build ──
app.use(express.static(path.join(__dirname, 'build')));
app.get('/{*path}', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
);

// ── Start server — ALWAYS LAST ──
app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));