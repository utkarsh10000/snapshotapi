'use client'
import { useState, useEffect } from 'react'
import styles from './keys.module.css'

export default function ApiKeys() {
  const [copied, setCopied] = useState(false)
  const [showRegen, setShowRegen] = useState(false)
  const [regenLoading, setRegenLoading] = useState(false)
  const [regenDone, setRegenDone] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  if (!user) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(user.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegen = async () => {
    setRegenLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/auth/regen-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data.success) {
        const updatedUser = { ...user, apiKey: data.apiKey }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setRegenDone(true)
        setShowRegen(false)
        setTimeout(() => setRegenDone(false), 3000)
      }
    } catch (err) {
      console.error(err)
    }
    setRegenLoading(false)
  }

  const createdDate = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <>
      <div className={styles.header}>
        <h1>API Keys</h1>
        <p>Manage your API keys. Keep them secret — never share them publicly.</p>
      </div>

      {/* YOUR API KEY */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>Your API Key</div>
            <div className={styles.cardDesc}>Use this key in the x-api-key header of every request</div>
          </div>
          <button className={styles.btnGhost} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className={styles.keyRow}>
          <div className={styles.keyBox}>{user.apiKey}</div>
        </div>

        <div className={styles.keyMeta}>
          <div className={styles.metaItem}>Created <span>{createdDate}</span></div>
          <div className={styles.metaItem}>Plan <span className={styles.planText}>{user.plan}</span></div>
        </div>
      </div>

      {/* HOW TO USE */}
      <div className={styles.card}>
        <div className={styles.cardTitle} style={{ marginBottom: '6px' }}>How to use your key</div>
        <div className={styles.cardDesc} style={{ marginBottom: '16px' }}>Add this header to every API request</div>

        <div className={styles.sectionLabel}>Javascript</div>
        <div className={styles.codeBox}>
          <span className={styles.cKey}>const</span> response = <span className={styles.cKey}>await</span> fetch(<span className={styles.cVal}>&apos;https://api.snapshot.api/screenshot?url=https://google.com&apos;</span>, {'{'}
          <br />&nbsp;&nbsp;headers: {'{ '}<span className={styles.cVal}>&apos;x-api-key&apos;</span>: <span className={styles.cVal}>&apos;{user.apiKey}&apos;</span>{' }'}
          <br />{'}'}
          );
        </div>

        <div className={styles.sectionLabel} style={{ marginTop: '16px' }}>Python</div>
        <div className={styles.codeBox}>
          <span className={styles.cKey}>import</span> requests<br />
          response = requests.get(<br />
          &nbsp;&nbsp;<span className={styles.cVal}>&apos;https://api.snapshot.api/screenshot&apos;</span>,<br />
          &nbsp;&nbsp;params={'{'}<span className={styles.cVal}>&apos;url&apos;</span>: <span className={styles.cVal}>&apos;https://google.com&apos;</span>{'}'}, <br />
          &nbsp;&nbsp;headers={'{'}<span className={styles.cVal}>&apos;x-api-key&apos;</span>: <span className={styles.cVal}>&apos;{user.apiKey}&apos;</span>{'}'}<br />
          )
        </div>
      </div>

      {/* REGENERATE */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>Regenerate API Key</div>
            <div className={styles.cardDesc}>Generate a new key if your current one is compromised</div>
          </div>
        </div>

        {regenDone && (
          <div className={styles.successBox}>
            ✓ New API key generated! Make sure to update your apps.
          </div>
        )}

        {!showRegen ? (
          <button className={styles.regenBtn} onClick={() => setShowRegen(true)}>
            Regenerate Key
          </button>
        ) : (
          <div>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>⚠</div>
              <div className={styles.warningText}>
                <strong>Warning:</strong> This will immediately invalidate your current key.
                Any apps using the old key will stop working until updated.
              </div>
            </div>
            <div className={styles.regenActions}>
              <button className={styles.regenConfirm} onClick={handleRegen} disabled={regenLoading}>
                {regenLoading ? 'Regenerating...' : 'Yes, regenerate'}
              </button>
              <button className={styles.btnGhost} onClick={() => setShowRegen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}