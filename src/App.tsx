import './App.css'
import ThankYou from './ThankYou'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Stripe Payment Links
export const STRIPE_LINKS = {
  aiPrompts: 'https://buy.stripe.com/test_8x2dR9fqMfIZ9ss9B94ko00',
  contentGuide: 'https://buy.stripe.com/test_fZu6cH0vS8gxcEE4P4ko01',
  hospitalManager: 'https://buy.stripe.com/test_eVq9ATceAbsJeMM9B94ko02'
}

function HomePage() {
  return (
    <div>
      <div className="content">
        <h1>Welcome to Goolle Shop</h1>
        <p className="tagline">Discover Quality Products at Great Prices</p>
        <p>Work Smarter, Not Harder. Digitally.</p>

        <div className="product-showcase">
          <h2>Featured Products</h2>
          <div className="product-card">
            <h3>AI Prompt Pack</h3>
            <p>50 ChatGPT Prompts for productivity</p>
            <p className="product-price">$19.99</p>
            <a href={STRIPE_LINKS.aiPrompts} target="_blank" rel="noopener noreferrer" className="stripe-button">
              Get Now
            </a>
          </div>

          <div className="product-card">
            <h3>AI Content Guide 2025</h3>
            <p>Complete guide with 100+ prompts</p>
            <p className="product-price">$119.00</p>
            <a href={STRIPE_LINKS.contentGuide} target="_blank" rel="noopener noreferrer" className="stripe-button">
              Get Guide
            </a>
          </div>

          <div className="product-card">
            <h3>Hospital Manager App</h3>
            <p>One-click installer. Patient records, scheduling, billing all in one.</p>
            <p className="product-price">$299.00</p>
            <a href={STRIPE_LINKS.hospitalManager} target="_blank" rel="noopener noreferrer" className="stripe-button">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

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
