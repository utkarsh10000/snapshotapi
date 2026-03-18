'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getMe, logout } from '../utils/api'
import '../globals.css'
import './dashboard.css'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLogout, setShowLogout] = useState(false)

  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Always fetch fresh data from backend
    const userData = await getMe()
    if (!userData) {
      router.push('/login')
      return
    }

    // Update localStorage with fresh data
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setLoading(false)
  }
  fetchUser()
}, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#7a7990', fontSize: '14px' }}>
        Loading...
      </div>
    )
  }

  const navItems = [
    { href: '/dashboard', icon: '◈', label: 'Overview' },
    { href: '/dashboard/keys', icon: '⌘', label: 'API Keys' },
    { href: '/dashboard/usage', icon: '◎', label: 'Usage' },
    { href: '/dashboard/billing', icon: '◇', label: 'Billing' },
    { href: '/dashboard/docs', icon: '○', label: 'Docs' },
    { href: '/dashboard/settings', icon: '◉', label: 'Settings' },
  ]

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Link href="/" className="sidebar-logo">snap<span>shot</span>.api</Link>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-pill">
            <div className="avatar">{user.email[0].toUpperCase()}</div>
            <div className="user-info">
              <div className="user-email">{user.email}</div>
              <div className="user-plan">{user.plan} plan</div>
            </div>
          </div>
          {showLogout && (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
  }}>
    <div style={{
      background: '#13131c', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px', padding: '32px', maxWidth: '380px', width: '90%'
    }}>
      <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Sign out?</div>
      <div style={{ fontSize: '13px', color: '#7a7990', marginBottom: '24px', lineHeight: '1.6' }}>
        You will be redirected to the home page. Your API key and data will remain safe.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/'
          }}
          style={{
            flex: 1, padding: '10px', background: '#7B6EF6', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit'
          }}
        >
          Yes, sign out
        </button>
        <button
          onClick={() => setShowLogout(false)}
          style={{
            flex: 1, padding: '10px', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px',
            color: '#f0eff8', fontSize: '13px', fontWeight: '700',
            cursor: 'pointer', fontFamily: 'inherit'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

<button
  onClick={() => setShowLogout(true)}
  style={{
    marginTop: '12px', width: '100%', padding: '8px',
    background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px', color: '#7a7990', fontSize: '12px',
    cursor: 'pointer', fontFamily: 'inherit'
  }}
>
  Sign out
</button>
        </div>
      </aside>

      <main className="dash-main">
        {children}
      </main>
    </div>
  )
}