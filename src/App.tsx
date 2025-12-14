import { FormEvent, useState } from 'react'
import './App.css'
import ThankYou from './ThankYou'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// PayPal Payment Links
export const PAYPAL_LINKS = {
  aiPrompts: 'https://www.paypal.com/ncp/links/KBNRKDUS8XW4G',
  contentGuide: 'https://www.paypal.com/ncp/links/32TXF98GC9L8J',
  hospitalManager: 'https://www.paypal.com/ncp/links/XGUCFWJ3A47AY'
};

// Stripe Payment Links
export const STRIPE_LINKS = {
  aiPrompts: 'https://buy.stripe.com/test_8x2dR9fqMfIZ9ss9B94ko00',
  contentGuide: 'https://buy.stripe.com/test_fZu6cH0vS8gxcEE4P4ko01',
  hospitalManager: 'https://buy.stripe.com/test_eVq9ATceAbsJeMM9B94ko02'
};


// HomePage Component
function HomePage() {
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }
  return (
    <div>
      <div className="content">
        <h1>Welcome to Goolle Shop</h1>
        <p className="tagline">Discover Quality Products at Great Prices</p>
        

        )}
        {/* Product Showcase Section */}
        <div className="product-showcase">
          <h2>Featured Product</h2>
          <div className="product-card">
            <h3>AI Prompt Pack for Business Owners</h3>
            <p className="product-description">
              50 ChatGPT Prompts designed to boost your productivity and save time on daily tasks.
            </p>
            <div className="product-features">
              <span className="badge">50 Prompts</span>
              <span className="badge">Instant Access</span>
              <span className="badge">No Subscription</span>
            </div>
            <p className="product-price">$19.99</p>
<a href={STRIPE_LINKS.aiPrompts} target="_blank" rel="noopener noreferrer" className="stripe-button">
 Get Prompts Now
 </a>          </div>
           <div className="product-card">
 <h3>AI Content Writing Mastery Guide 2025</h3>
 <p className="product-description">
 Complete guide to AI content writing with ChatGPT, including 100+ prompts, templates, and real-world strategies for creators and businesses.
 </p>
 <div className="product-features">
 <span className="badge">100+ Prompts</span>
 <span className="badge">Step-by-Step Guide</span>
 <span className="badge">Templates Included</span>
 </div>
 <p className="product-price">$119.00</p>
 <a href={STRIPE_LINKS.contentGuide} target="_blank" rel="noopener noreferrer" className="stripe-button">
 Get Guide Now
 </a>
 </div>
          <div className="product-card">
            <h3>Hospital Manager App</h3>
            <p className="product-description">
              Comprehensive hospital management system with patient records, appointment scheduling, referrals, and billing all in one place.
            </p>
            <div className="product-features">
              <span className="badge">Patient Records</span>
              <span className="badge">Appointments</span>
              <span className="badge">Billing System</span>
              <span className="badge">Referrals</span>
            </div>
            <p className="product-price">$299.00</p>
<a href={STRIPE_LINKS.hospitalManager} target="_blank" rel="noopener noreferrer" className="stripe-button">
 Buy Now
 </a>          </div>
        </div>
        <div className="features">
          <div className="feature">
            <h3>Quality</h3>
            <p>Premium products you can trust</p>
          </div>
          <div className="feature">
            <h3>Value</h3>
            <p>Best prices for exceptional quality</p>
          </div>
          <div className="feature">
            <h3>Service</h3>
            <p>Fast delivery and customer support</p>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions? Contact us directly at <a href="mailto:admin@goolle.shop">admin@goolle.shop</a></p>
        <form className="contact-form" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name');
          const email = formData.get('email');
          const message = formData.get('message');
          
          // Send email alert to admin@goolle.shop
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: 'service_goolle_shop',
              template_id: 'template_contact_form',
              user_id: 'YOUR_EMAILJS_PUBLIC_KEY',
              template_params: {
                to_email: 'admin@goolle.shop',
                from_name: name,
                from_email: email,
                message: message,
                reply_to: email
              }
            })
          }).then(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            e.currentTarget.reset();
          }).catch(err => {
            console.error('Error sending message:', err);
            alert('Error sending message. Please try again.');
          })
        }}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

// Main App Component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  )
}

export default App
