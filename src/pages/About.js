
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Navbar />
      
      {/* قسم الهيرو - خلفية موحدة */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
        <div className="hero-content">
          <h1 className="hero-title">CMT Tech</h1>
          <p className="hero-subtitle">Your Ultimate PC Hardware Destination</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate('/')}>
              تسوق الآن
            </button>
            <button className="secondary-btn" onClick={() => navigate('/contact')}>
              تواصل معنا
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* قسم من نحن */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">من نحن</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <h3>CMT Tech - شغف بالتكنولوجيا</h3>
              <p>
                نحن فريق من عشاق التكنولوجيا والمهتمين بأحدث مكونات الكمبيوتر. 
                تأسست CMT Tech في 2024 بهدف توفير أفضل قطع الكمبيوتر الأصلية 
                وبأسعار مناسبة لعشاق الألعاب والمحترفين.
              </p>
              <p>
                نؤمن في CMT Tech أن كل شخص يستحق أفضل تجربة تقنية، لذلك نحرص 
                على توفير منتجات أصلية 100% مع ضمان الجودة ودعم فني متميز.
              </p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">عميل سعيد</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">منتج</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">ماركة</span>
                </div>
              </div>
            </div>
            
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="PC Build" />
            </div>
          </div>
        </div>
      </section>

      {/* قسم الرؤية والرسالة */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="card-icon">🔮</div>
              <h3>رؤيتنا</h3>
              <p>أن نكون الوجهة الأولى في العالم العربي لكل ما يتعلق بقطع الكمبيوتر والتقنيات الحديثة.</p>
            </div>
            
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h3>رسالتنا</h3>
              <p>توفير منتجات أصلية بأسعار مناسبة مع خدمة عملاء استثنائية وتوصيل سريع.</p>
            </div>
            
            <div className="values-card">
              <div className="card-icon">💎</div>
              <h3>قيمنا</h3>
              <p>الجودة، الأصالة، الثقة، الابتكار، ورضا العملاء.</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الفريق - شخصين فقط */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">فريقنا</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="team-grid two-members">
            {/* شكري محمد توفيق */}
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="شكري محمد توفيق" />
              </div>
              <h4>شكري محمد توفيق</h4>
              <p>المؤسس والمطور الرئيسي</p>
              <div className="member-social">
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </button>
                <button 
                  onClick={() => window.open('https://github.com', '_blank')}
                  className="social-link"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
            
            {/* أمين زدما */}
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="أمين زدما" />
              </div>
              <h4>أمين زدما</h4>
              <p>مطور مشارك</p>
              <div className="member-social">
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </button>
                <button 
                  onClick={() => window.open('https://github.com', '_blank')}
                  className="social-link"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم التواصل */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">تواصل معنا</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h3>معلومات الاتصال</h3>
              
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>العنوان</h4>
                  <p>الجزائر العاصمة، الجزائر</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>الهاتف</h4>
                  <p>+213 555 123 456</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <h4>البريد الإلكتروني</h4>
                  <p>contact@cmt-tech.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-content">
                  <h4>ساعات العمل</h4>
                  <p>السبت - الخميس: 9:00 - 18:00</p>
                </div>
              </div>
              
              <div className="social-links">
                <button 
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="social-link"
                  aria-label="Facebook"
                >
                  📘
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')}
                  className="social-link"
                  aria-label="Twitter"
                >
                  🐦
                </button>
                <button 
                  onClick={() => window.open('https://instagram.com', '_blank')}
                  className="social-link"
                  aria-label="Instagram"
                >
                  📷
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  💼
                </button>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>أرسل لنا رسالة</h3>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="الاسم الكامل" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="البريد الإلكتروني" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="الموضوع" required />
                </div>
                <div className="form-group">
                  <textarea rows="5" placeholder="رسالتك" required></textarea>
                </div>
                <button type="submit" className="submit-btn">إرسال الرسالة</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخريطة */}
      <section className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204482.07332332386!2d2.986991443477358!3d36.7528870344072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad6c89c6bdb1%3A0x3f4e5b7c8d9e8f0a!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1710500000000!5m2!1sen!2sdz"
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="موقع CMT Tech"
        ></iframe>
      </section>

      {/* الفوتر */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>CMT Tech</h3>
              <p>وجهتك الأولى لقطع الكمبيوتر الأصلية في الجزائر.</p>
              <div className="footer-social">
                <button 
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="social-link"
                  aria-label="Facebook"
                >
                  📘
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')}
                  className="social-link"
                  aria-label="Twitter"
                >
                  🐦
                </button>
                <button 
                  onClick={() => window.open('https://instagram.com', '_blank')}
                  className="social-link"
                  aria-label="Instagram"
                >
                  📷
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  💼
                </button>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>روابط سريعة</h4>
              <ul>
                <li><button onClick={() => navigate('/')} className="footer-link">الرئيسية</button></li>
                <li><button onClick={() => navigate('/about')} className="footer-link">من نحن</button></li>
                <li><button onClick={() => navigate('/contact')} className="footer-link">اتصل بنا</button></li>
                <li><button onClick={() => navigate('/cart')} className="footer-link">السلة</button></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>مساعدة</h4>
              <ul>
                <li><button onClick={() => navigate('/faq')} className="footer-link">الأسئلة الشائعة</button></li>
                <li><button onClick={() => navigate('/privacy')} className="footer-link">سياسة الخصوصية</button></li>
                <li><button onClick={() => navigate('/terms')} className="footer-link">شروط الاستخدام</button></li>
                <li><button onClick={() => navigate('/shipping')} className="footer-link">الشحن والتوصيل</button></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>النشرة البريدية</h4>
              <p>اشترك ليصلك كل جديد</p>
              <div className="newsletter-form">
                <input type="email" placeholder="بريدك الإلكتروني" />
                <button type="button">اشترك</button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 CMT Tech. جميع الحقوق محفوظة. تصميم وتطوير بواسطة شكري محمد توفيق وأمين زدما</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;