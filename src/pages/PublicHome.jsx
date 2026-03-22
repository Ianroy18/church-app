import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PublicHome() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealElements.forEach(el => revealObserver.unobserve(el));
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <div className="logo flex items-center gap-2">
            <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507" alt="LCC Logo" className="w-10 h-10 rounded-full border-2 border-[#4CAF50] object-cover" />
            <span className="font-extrabold tracking-tighter text-white drop-shadow-sm transition-colors duration-300">LCC CDO</span>
          </div>
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
            <a href="#services" className="nav-link" onClick={closeMobileMenu}>Ministries</a>
            <a href="#services" className="nav-link" onClick={closeMobileMenu}>Events</a>
            <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Connect</a>
            <Link to="/login" className="bg-[#4CAF50] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#388E3C] transition-all ml-4 shadow-sm hover:shadow-[0_10px_20px_rgba(76,175,80,0.3)] hover:-translate-y-1 outline-none text-[13px] uppercase tracking-wider" onClick={closeMobileMenu}>LOGIN FBS</Link>
          </nav>
          <div className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-background"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">welcome to the family!</h1>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">ENROLL NOW</Link>
              <a href="#about" className="btn btn-outline">WHO WE ARE</a>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container container-large">
            <div className="about-grid">
              <div className="about-text scroll-reveal">
                <div className="section-tag flex items-center gap-2">
                   <span className="w-8 h-[2px] bg-[#4CAF50]"></span> OUR CORE MISSION
                </div>
                <h2 className="section-title text-5xl font-black mb-6 leading-tight text-gray-900 italic">"Unexpected problems, <span className="text-[#4CAF50]">realized solutions.</span>"</h2>
                <p className="about-description text-xl text-gray-600 leading-loose mb-10">
                  We are **Grace and Truth Life Care Centre Inc.**, a community dedicated to spiritual growth and practical care in Cagayan de Oro. We believe every challenge is an opportunity for God's grace to provide a solution.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-10">
                   <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="block text-2xl font-black text-[#4CAF50] mb-2">9+</span>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years of Service</span>
                   </div>
                   <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="block text-2xl font-black text-[#4CAF50] mb-2">500+</span>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lives Touched</span>
                   </div>
                </div>
              </div>
              <div className="about-image scroll-reveal relative group rounded-[40px] overflow-hidden shadow-2xl" style={{ transitionDelay: '200ms' }}>
                <img src="/images/church_gathering.png" alt="Community gathering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section bg-[#F9FBFA]" id="services">
          <div className="container">
            <div className="text-center section-header scroll-reveal mb-20 max-w-3xl mx-auto">
              <div className="section-tag">KINGDOM SERVICE</div>
              <h2 className="section-title text-4xl font-extrabold mb-4">How we serve our community</h2>
              <p className="text-gray-500 font-medium">From intimate gatherings to massive community outreaches, there's a place for everyone to experience grace and truth.</p>
            </div>

            <div className="cards-grid">
              <div className="card scroll-reveal group border-none shadow-none bg-transparent h-full">
                <div className="card-img-wrapper rounded-[30px] shadow-lg mb-6 group-hover:shadow-2xl transition-all duration-500 overflow-hidden relative aspect-square">
                   <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1456105935968197" alt="Worship" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                   <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white transform group-hover:-translate-y-2 transition-transform">
                      <h4 className="font-bold uppercase tracking-widest text-[10px]">Weekly Gathering</h4>
                      <p className="text-lg font-black">Worship Services</p>
                   </div>
                </div>
              </div>

              <div className="card scroll-reveal group border-none shadow-none bg-transparent h-full" style={{ transitionDelay: '150ms' }}>
                <div className="card-img-wrapper rounded-[30px] shadow-lg mb-6 group-hover:shadow-2xl transition-all duration-500 overflow-hidden relative aspect-square">
                   <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1317182853788107" alt="Outreach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                   <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white transform group-hover:-translate-y-2 transition-transform">
                      <h4 className="font-bold uppercase tracking-widest text-[10px]">Civic Spirit</h4>
                      <p className="text-lg font-black">Life Care Programs</p>
                   </div>
                </div>
              </div>

              <div className="card scroll-reveal group border-none shadow-none bg-transparent h-full" style={{ transitionDelay: '300ms' }}>
                <div className="card-img-wrapper rounded-[30px] shadow-lg mb-6 group-hover:shadow-2xl transition-all duration-500 overflow-hidden relative aspect-square">
                   <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=125438837139151" alt="Connect" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                   <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white transform group-hover:-translate-y-2 transition-transform">
                      <h4 className="font-bold uppercase tracking-widest text-[10px]">Relational Deep</h4>
                      <p className="text-lg font-black">Connect Groups</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section relative overflow-hidden h-[600px] flex items-center justify-center" id="connect">
          <div className="absolute inset-0 z-0 scale-110 hover:scale-100 transition-transform duration-[20s]">
            <img src="/images/bible_study.png" alt="CTA BG" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
          </div>
          <div className="container relative z-10 text-center text-white scroll-reveal flex flex-col items-center">
            <div className="w-20 h-[2px] bg-[#4CAF50] mb-8"></div>
            <h2 className="cta-title text-7xl font-black mb-4 tracking-tighter uppercase italic">Field Bible School</h2>
            <p className="text-xl max-w-2xl text-gray-300 mb-10 leading-relaxed">Prepare for ministry with advanced doctrine and spiritual training. Enrollment for 2026 is currently open.</p>
            <div className="flex gap-4">
              <Link to="/register" className="btn btn-primary px-10 py-5 text-lg">ENROLL NOW</Link>
              <Link to="/login" className="btn btn-outline px-10 py-5 text-lg">STUDENT LOG IN</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 className="footer-logo">GRACE &amp; TRUTH</h3>
              <p className="brand-subtext">Life Care Centre Inc.</p>
              <p className="brand-desc">Spreading grace, sharing truth, and offering life care solutions to the community.</p>
            </div>

            <div className="footer-info">
              <h4 className="footer-heading">VISIT US</h4>
              <p className="footer-detail text-white">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Cagayan de Oro, Philippines, 9000
              </p>
            </div>

            <div className="footer-info">
              <h4 className="footer-heading">CONTACT</h4>
              <p className="footer-detail text-white">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                0965 882 2806 <br /> 0998 989 7712
              </p>
              <p className="footer-detail text-white mt-2">
                <svg className="icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:lifecarecentrecdo@gmail.com" className="footer-link">lifecarecentrecdo@gmail.com</a>
              </p>
            </div>

            <div className="footer-info">
              <h4 className="footer-heading">SOCIAL</h4>
              <a href="https://www.facebook.com/LifeCareCenterCDO" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Grace and Truth Life Care Centre Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PublicHome;
