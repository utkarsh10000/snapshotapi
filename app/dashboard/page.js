'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PLAN_LIMITS = { free: 50, starter: 500, pro: 5000 }

export default function Dashboard() {
  const [copied, setCopied] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
  const stored = localStorage.getItem('user')
  if (stored) {
    const parsed = JSON.parse(stored)
    const limits = { free: 50, starter: 500, pro: 5000 }
    setUser({
      ...parsed,
      limit: limits[parsed.plan] || 50
    })
    setLoading(false)
  }
}, [])

  if (loading || !user) return null

  const usagePercent = Math.round((user.usage / user.limit) * 100) || 0
  const barColor = usagePercent >= 90 ? 'danger' : usagePercent >= 70 ? 'warning' : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(user.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="page-header">
        <h1>Overview <span className="plan-badge">{user.plan.toUpperCase()}</span></h1>
        <p>Welcome back! Here's your API usage for this month.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Screenshots used</div>
          <div className="stat-value">{user.usage}<span>/{user.limit}</span></div>
          <div className="stat-sub">This month · resets in 13 days</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Remaining</div>
          <div className="stat-value">{user.limit - user.usage}</div>
          <div className="stat-sub">screenshots left on {user.plan} plan</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current plan</div>
          <div className="stat-value plan-text">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</div>
          <div className="stat-sub">upgrade for more screenshots</div>
        </div>
      </div>

      <div className="usage-card">
        <div className="usage-header">
          <div className="usage-title">Monthly usage</div>
          <div className="usage-count"><span>{user.usage}</span> / {user.limit} screenshots</div>
        </div>
        <div className="bar-track">
          <div className={`bar-fill ${barColor}`} style={{ width: `${usagePercent}%` }}></div>
        </div>
        <div className="usage-footer">
          <span>0</span>
          <span>{usagePercent}% used</span>
          <span>{user.limit}</span>
        </div>
      </div>

      <div className="apikey-card">
        <div className="apikey-title">Your API Key</div>
        <div className="apikey-desc">
          Use this key in every request as the <code>x-api-key</code> header. Keep it secret!
        </div>
        <div className="apikey-row">
          <div className="apikey-box">{user.apiKey}</div>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="plan-card">
  <div className="plan-info">
    <div className="plan-label">Current plan</div>
    <div className="plan-name">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</div>
    <div className="plan-detail">{user.limit} screenshots / month · community support</div>
  </div>
  {user.plan === 'free' && (
    <button className="upgrade-btn" onClick={() => router.push('/dashboard/billing')}>
      Upgrade to Starter →
    </button>
  )}
  {user.plan === 'starter' && (
    <button className="upgrade-btn" onClick={() => router.push('/dashboard/billing')}>
      Upgrade to Pro →
    </button>
  )}
  {user.plan === 'pro' && (
    <button className="upgrade-btn" style={{ background: 'var(--accent2)', cursor: 'default' }}>
      ✓ You are on Pro
    </button>
  )}
</div>
    </>
  )
}