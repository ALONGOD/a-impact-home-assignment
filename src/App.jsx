import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

const defaultBusiness = { areaSqm: 80, seats: 40, features: [] }

function App() {
  const [business, setBusiness] = useState(defaultBusiness)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('report')
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
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>בדיקת דרישות רישוי למסעדה</h1>
          <p className="hero-description">
            כלי חכם לבדיקת דרישות הרישוי והתאמה לתקנות עבור עסקי מזון. 
            פשוט הזינו את פרטי העסק שלכם וקבלו דוח מפורט עם כל הדרישות הרלוונטיות.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🏢</span>
              <span>בדיקת דרישות משטרה</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏥</span>
              <span>תקנות משרד הבריאות</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚒</span>
              <span>דרישות כבאות והצלה</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-card">
          <h3>איך זה עובד?</h3>
          <div className="info-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>הזינו פרטי העסק</h4>
                <p>גודל, מספר מקומות ישיבה ומאפיינים נוספים</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>קבלו דוח מותאם</h4>
                <p>רשימה מפורטת של כל הדרישות הרלוונטיות</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>פעלו לפי ההנחיות</h4>
                <p>צעדים ברורים לביצוע הדרישות</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h2>פרטי העסק</h2>
        <p className="form-description">הזינו את הפרטים הבסיסיים של העסק כדי לקבל דוח מותאם אישית</p>
        
        <div className="card form-card">
          <div className="form-group">
            <label className="form-label">
              <span className="label-text">גודל העסק (מ"ר)</span>
              <input 
                type="number" 
                value={business.areaSqm}
                onChange={(e)=>setBusiness({...business, areaSqm: Number(e.target.value)})}
                className="form-input"
                placeholder="לדוגמה: 80"
                min="1"
              />
            </label>
            <div className="input-help">השטח הכולל של העסק במטר רבוע</div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">מספר מקומות ישיבה</span>
              <input 
                type="number" 
                value={business.seats}
                onChange={(e)=>setBusiness({...business, seats: Number(e.target.value)})}
                className="form-input"
                placeholder="לדוגמה: 40"
                min="1"
              />
            </label>
            <div className="input-help">מספר המקומות הזמינים ללקוחות</div>
          </div>

          <div className="form-group">
            <div className="form-label">
              <span className="label-text">מאפיינים נוספים</span>
            </div>
            
            <div className="feature-section">
              <div className="feature-category">
                <h4>הגשת אלכוהול</h4>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="alcohol" 
                      checked={business.features.includes('servesAlcohol')} 
                      onChange={()=>toggleFeature('servesAlcohol')} 
                    />
                    <span className="radio-text">מגיש אלכוהול</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="alcohol" 
                      checked={business.features.includes('noAlcohol')} 
                      onChange={()=>toggleFeature('noAlcohol')} 
                    />
                    <span className="radio-text">ללא אלכוהול</span>
                  </label>
                </div>
              </div>

              <div className="feature-category">
                <h4>שירותים נוספים</h4>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={business.features.includes('deliveries')} 
                      onChange={()=>toggleFeature('deliveries')} 
                    />
                    <span className="checkbox-text">משלוחים</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={business.features.includes('usesGas')} 
                      onChange={()=>toggleFeature('usesGas')} 
                    />
                    <span className="checkbox-text">שימוש בגז בישול</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={submit} 
            disabled={loading || business.areaSqm <= 0 || business.seats <= 0}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                מחשב דרישות...
              </>
            ) : (
              'צור דוח דרישות'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <div>
            <strong>שגיאה:</strong> {error}
          </div>
        </div>
      )}

      {result && (
        <div style={{marginTop:16}}>
          <div className="tabs">
            <button className={`tab ${tab==='report'?'active':''}`} onClick={()=>setTab('report')}>דוח AI</button>
            <button className={`tab ${tab==='matches'?'active':''}`} onClick={()=>setTab('matches')}>דרישות</button>
          </div>
          <div className="panel">
            {tab === 'report' ? (
              <div className="report">
                <ReactMarkdown>{result.report || ''}</ReactMarkdown>
              </div>
            ) : (
              <div className="matches">
                <div className="muted">דרישות שנמצאו עבור הפרופיל שלך</div>
                <ul>
                  {result.matched.map((r)=> (
                    <li key={r.id} className="match-item">
                      <div style={{fontWeight:600}}>{r.category} — {r.title}</div>
                      <div className="muted" style={{marginTop:4}}>{r.description}</div>
                      {r.actions?.length ? (
                        <div style={{marginTop:8}}>
                          {r.actions.map((a,i)=> (
                            <div key={i} style={{marginTop:4}}>• {a}</div>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App