import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import { Mail, MapPin, Send, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/BrandIcons';
import { playClick } from '../utils/audioEngine';

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
    playClick();
    
    // Simulate active military channel transmit ping
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
        style={{ textAlign: 'left', marginBottom: '50px' }}
      >
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-cyan)',
          textShadow: '0 0 10px rgba(255, 10, 10, 0.3)',
          display: 'block',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)'
        }}>
          [ 🪖 ENCRYPTED RADIO TRANSMITTER ]
        </span>
        <h1 className="section-title">Outpost Comms</h1>
        <p className="section-subtitle">
          Initiate a tactical connection channel. Transmit coordinate parameters, officer requests, or reconnaissance orders across secure frequencies.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: '40px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Left: Coordinates Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TiltCard
            style={{
              padding: '0px',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              height: '100%',
              boxShadow: '0 15px 35px rgba(0,0,0,0.85)'
            }}
          >
            <div className="hazard-tape" style={{ height: '6px' }} />
            
            {/* Screws and bullet hole */}
            <div className="bullet-hole" style={{ top: '15px', right: '15px', width: '8px', height: '8px', opacity: 0.25 }} />
            <div className="bullet-hole" style={{ bottom: '25px', left: '15px', width: '12px', height: '12px', opacity: 0.2 }} />

            <div style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: '0.02em', marginBottom: '8px', color: '#ffffff' }}>
                  Station Coordinates
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-body)' }}>
                  Secure communication frequencies for manual officer transmission channels.
                </p>
              </div>

              {/* Coordinates List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                {/* Location */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div
                    className="flex-center"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '2px',
                      background: 'rgba(255, 10, 10, 0.05)',
                      border: '1.5px solid rgba(255, 10, 10, 0.2)',
                    }}
                  >
                    <MapPin size={16} className="text-neon-cyan" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>OUTPOST REGION</span>
                    <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>Tamil Nadu, India</span>
                  </div>
                </div>

                {/* Email */}
                <a href="mailto:divagar.m.cs@gmail.com" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div
                    className="flex-center"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '2px',
                      background: 'rgba(255, 150, 12, 0.05)',
                      border: '1.5px solid rgba(255, 150, 12, 0.2)',
                    }}
                  >
                    <Mail size={16} className="text-neon-pink" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>SECURE TELEGRAPH</span>
                    <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold', textDecoration: 'underline' }}>divagar.m.cs@gmail.com</span>
                  </div>
                </a>

                {/* Github */}
                <a href="https://github.com/divagar199?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div
                    className="flex-center"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '2px',
                      background: 'rgba(34, 197, 94, 0.05)',
                      border: '1.5px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    <Github size={16} className="text-neon-violet" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>CODE RESERVES</span>
                    <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>github.com/divagar199</span>
                  </div>
                </a>

                {/* Linkedin */}
                <a href="https://www.linkedin.com/in/divagar-m-3598b3391/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div
                    className="flex-center"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '2px',
                      background: 'rgba(255, 10, 10, 0.05)',
                      border: '1.5px solid rgba(255, 10, 10, 0.2)',
                    }}
                  >
                    <Linkedin size={16} className="text-neon-cyan" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>TACTICAL NETWORK</span>
                    <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>linkedin.com/in/divagar-m-3598b3391</span>
                  </div>
                </a>

              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Right: Tactical Command Form Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard
            style={{
              padding: '0px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 15px 35px rgba(0,0,0,0.85)'
            }}
          >
            <div className="hazard-tape-cyan" style={{ height: '6px' }} />
            
            {/* Exposed screws */}
            <div className="bullet-hole" style={{ top: '15px', right: '15px', width: '8px', height: '8px', opacity: 0.25 }} />

            <div style={{ padding: '36px 36px 30px 36px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={16} className="text-neon-pink" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.01em', color: '#ffffff' }}>
                  Transmit Outpost Ping
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Name prompt */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-body)' }}>
                    SYS_PING_AUTHORITY &gt;
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER OFFICER OR CORPS IDENTITY..."
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                    className="contact-input"
                  />
                </div>

                {/* Email prompt */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-body)' }}>
                    RETURN_COMM_FREQUENCY &gt;
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="OFFICER@DOMAIN.COM"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                    className="contact-input"
                  />
                </div>

                {/* Message prompt */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-body)' }}>
                    ENCRYPTED_TELEGRAPH_PAYLOAD &gt;
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="DRAFT BATTLE PAYLOAD MESSAGE CORRIDOR..."
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                    className="contact-input"
                  />
                </div>

                {/* Submit button */}
                <div style={{ marginTop: '6px' }}>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-neon"
                    style={{ width: '100%', justifyContent: 'center', borderRadius: '2px' }}
                  >
                    {status === 'sending' ? 'TRANSMITTING ENCRYPTED SIGNALS...' : (
                      <>
                        TRANSMIT SECURE PAYLOAD
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* Success alert prompt */}
                {status === 'success' && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '2px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1.5px solid rgba(34, 197, 94, 0.3)',
                    color: 'var(--color-violet)',
                    fontSize: '0.82rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <MessageSquare size={14} />
                    TRANSMISSION ACQUIRED. OUTPOST OFFICERS NOTIFIED. STANDBY FOR SIGNAL ECHO.
                  </div>
                )}

              </form>
            </div>
          </TiltCard>
        </motion.div>

      </div>

      {/* Focus outlines */}
      <style>{`
        .contact-input:focus {
          border-color: var(--color-pink) !important;
          box-shadow: 0 0 10px rgba(255, 150, 12, 0.2) !important;
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
