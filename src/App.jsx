import { useState } from 'react'
import './App.css'

const defaultBusiness = { areaSqm: 80, seats: 40, features: [] }

function App() {
  const [business, setBusiness] = useState(defaultBusiness)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const toggleFeature = (f) => {
    setBusiness((b) => {
      let features = b.features.slice()
      const has = features.includes(f)
      if (f === 'servesAlcohol') {
        features = features.filter((x) => x !== 'noAlcohol')
        if (!has) features.push('servesAlcohol')
        else features = features.filter((x) => x !== 'servesAlcohol')
      } else if (f === 'noAlcohol') {
        features = features.filter((x) => x !== 'servesAlcohol')
        if (!has) features.push('noAlcohol')
        else features = features.filter((x) => x !== 'noAlcohol')
      } else {
        features = has ? features.filter((x) => x !== f) : [...features, f]
      }
      return { ...b, features }
    })
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const resp = await fetch('http://localhost:4000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business })
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Request failed')
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Restaurant Licensing Checker</h1>
      
      <div className="form-section">
        <h2>Business Details</h2>
        
        <div className="form-group">
          <label>
            Area (sqm):
            <input 
              type="number" 
              value={business.areaSqm}
              onChange={(e)=>setBusiness({...business, areaSqm: Number(e.target.value)})}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Seats:
            <input 
              type="number" 
              value={business.seats}
              onChange={(e)=>setBusiness({...business, seats: Number(e.target.value)})}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Features:</label>
          
          <div className="feature-section">
            <div className="feature-category">
              <h4>Alcohol Service</h4>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="alcohol" 
                    checked={business.features.includes('servesAlcohol')} 
                    onChange={()=>toggleFeature('servesAlcohol')} 
                  />
                  Serves Alcohol
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="alcohol" 
                    checked={business.features.includes('noAlcohol')} 
                    onChange={()=>toggleFeature('noAlcohol')} 
                  />
                  No Alcohol
                </label>
              </div>
            </div>

            <div className="feature-category">
              <h4>Additional Services</h4>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={business.features.includes('deliveries')} 
                    onChange={()=>toggleFeature('deliveries')} 
                  />
                  Deliveries
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={business.features.includes('usesGas')} 
                    onChange={()=>toggleFeature('usesGas')} 
                  />
                  Uses Gas Cooking
                </label>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={submit} 
          disabled={loading || business.areaSqm <= 0 || business.seats <= 0}
        >
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {result && <div className="result">{JSON.stringify(result, null, 2)}</div>}
    </div>
  )
}

export default App