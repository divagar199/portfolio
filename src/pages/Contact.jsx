import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { Mail, MapPin, Send, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/BrandIcons';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API connection
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    }, 1500);
  };

  return (
    <section className="section-container" style={{ paddingTop: '120px' }}>
      
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'left', marginBottom: '60px' }}
      >
        <span style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-cyan)',
          textShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
          display: 'block',
          marginBottom: '10px'
        }}>
          Communication Node
        </span>
        <h1 className="section-title">Establish Portal</h1>
        <p className="section-subtitle">
          Initiate a connection channel. Send coordinates, queries, or job opportunities directly through the cosmic pipeline.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: '50px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Left Side: Coordinates Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TiltCard
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              textAlign: 'left',
              height: '100%'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                System Coordinates
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                Reach out directly via external nodes or standard emails.
              </p>
            </div>

            {/* List of Connection Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Location */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div
                  className="flex-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                >
                  <MapPin size={18} className="text-neon-cyan" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>Location</span>
                  <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600' }}>Tamil Nadu, India</span>
                </div>
              </div>

              {/* Email */}
              <a href="mailto:divagar.m.cs@gmail.com" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div
                  className="flex-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    background: 'rgba(236, 72, 153, 0.05)',
                    border: '1px solid rgba(236, 72, 153, 0.2)',
                  }}
                >
                  <Mail size={18} className="text-neon-pink" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>Email Direct</span>
                  <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600', textDecoration: 'underline' }}>divagar.m.cs@gmail.com</span>
                </div>
              </a>

              {/* Github */}
              <a href="https://github.com/divagar199?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div
                  className="flex-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    background: 'rgba(170, 59, 255, 0.05)',
                    border: '1px solid rgba(170, 59, 255, 0.2)',
                  }}
                >
                  <Github size={18} className="text-neon-violet" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>GitHub Code</span>
                  <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600' }}>github.com/divagar199</span>
                </div>
              </a>

              {/* Linkedin */}
              <a href="https://www.linkedin.com/in/divagar-m-3598b3391/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div
                  className="flex-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                >
                  <Linkedin size={18} className="text-neon-cyan" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>LinkedIn Net</span>
                  <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600' }}>linkedin.com/in/divagar-m-3598b3391</span>
                </div>
              </a>

            </div>
          </TiltCard>
        </motion.div>

        {/* Right Side: Visual Input Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard
            style={{
              padding: '40px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={18} className="text-neon-pink" />
              <h2 style={{ fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.01em' }}>
                Send Console Ping
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)' }}>Name / Authority</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter identity label..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)' }}>Connection Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)' }}>Holographic Payload</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Draft system message..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    fontFamily: 'var(--font-body)'
                  }}
                  className="contact-input"
                />
              </div>

              {/* Submit Trigger */}
              <div style={{ marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-neon"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'sending' ? 'Transmitting Data...' : (
                    <>
                      Transmit Ping
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Feedback messages */}
              {status === 'success' && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: 'var(--color-cyan)',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MessageSquare size={16} />
                  Ping transmission successful! I will respond to your coordinates shortly.
                </div>
              )}

            </form>
          </TiltCard>
        </motion.div>

      </div>

      {/* Inputs focus glows */}
      <style>{`
        .contact-input:focus {
          border-color: var(--color-cyan) !important;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.25) !important;
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
