import { useState } from 'react'
import './App.css'

const defaultBusiness = { areaSqm: 80, seats: 40, features: [] }

function App() {
  const [business, setBusiness] = useState(defaultBusiness)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

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