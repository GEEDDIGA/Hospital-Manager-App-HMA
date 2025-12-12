import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Welcome to Goolle Shop</h1>
        <p className="tagline">Discover Quality Products at Great Prices</p>
        
        <div className="hero-section">
          <p>We're coming soon with an amazing selection of products curated just for you.</p>
          <p>Get notified when we launch!</p>
        </div>

        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Notify Me</button>
        </form>

        {submitted && (
          <div className="success-message">
            Thanks for subscribing! We'll be in touch soon.
          </div>
        )}

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
    </div>
  )
}

export default App
