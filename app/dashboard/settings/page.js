'use client'
import { useState, useEffect } from 'react'
import styles from './settings.module.css'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function Settings() {
  const [user, setUser] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notifications, setNotifications] = useState({
    usageAlerts: true,
    monthlySummary: false,
    productUpdates: true,
  })
  const [savedProfile, setSavedProfile] = useState(false)
  const [savedPassword, setSavedPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  if (!user) return null

  const handleSaveProfile = async () => {
    setProfileLoading(true)
    setTimeout(() => {
      setSavedProfile(true)
      setProfileLoading(false)
      setTimeout(() => setSavedProfile(false), 2000)
    }, 500)
  }

  const handleUpdatePassword = async () => {
    setPasswordError('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }

    setPasswordLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()

      if (!data.success) {
        setPasswordError(data.error)
      } else {
        setSavedPassword(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setSavedPassword(false), 2000)
      }
    } catch (err) {
      setPasswordError('Something went wrong. Please try again.')
    }

    setPasswordLoading(false)
  }

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${BASE_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account settings and preferences.</p>
      </div>

      {/* PROFILE */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Profile</div>
        <div className={styles.cardDesc}>Update your account information</div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" value={user.email} disabled />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Display name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        {savedProfile && <div className={styles.successMsg}>✓ Profile saved!</div>}
        <button className={styles.btnAccent} onClick={handleSaveProfile} disabled={profileLoading}>
          {profileLoading ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {/* PASSWORD */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Change password</div>
        <div className={styles.cardDesc}>Update your password to keep your account secure</div>
        <div className={styles.field}>
          <label className={styles.label}>Current password</label>
          <input className={styles.input} type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>New password</label>
          <input className={styles.input} type="password" placeholder="min. 6 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Confirm new password</label>
          <input className={styles.input} type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {passwordError && <div className={styles.errorMsg}>{passwordError}</div>}
        {savedPassword && <div className={styles.successMsg}>✓ Password updated!</div>}
        <button className={styles.btnAccent} onClick={handleUpdatePassword} disabled={passwordLoading}>
          {passwordLoading ? 'Updating...' : 'Update password'}
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Notifications</div>
        <div className={styles.cardDesc}>Choose what emails you want to receive</div>
        {[
          { key: 'usageAlerts', title: 'Usage alerts', desc: 'Get notified when you reach 80% of your limit' },
          { key: 'monthlySummary', title: 'Monthly summary', desc: 'Receive a monthly usage report' },
          { key: 'productUpdates', title: 'Product updates', desc: 'News about new features and improvements' },
        ].map((item) => (
          <div key={item.key} className={styles.notifRow}>
            <div className={styles.notifInfo}>
              <div className={styles.notifTitle}>{item.title}</div>
              <div className={styles.notifDesc}>{item.desc}</div>
            </div>
            <div
              className={`${styles.toggle} ${notifications[item.key] ? styles.toggleOn : ''}`}
              onClick={() => toggleNotification(item.key)}
            />
          </div>
        ))}
      </div>

      {/* DANGER ZONE */}
      <div className={styles.dangerCard}>
        <div className={styles.dangerTitle}>Delete account</div>
        <div className={styles.dangerDesc}>
          Permanently delete your account and all data. This cannot be undone.
        </div>
        {!showDeleteConfirm ? (
          <button className={styles.btnDanger} onClick={() => setShowDeleteConfirm(true)}>
            Delete my account
          </button>
        ) : (
          <div>
            <div className={styles.errorMsg} style={{ marginBottom: '12px' }}>
              Are you sure? This cannot be undone.
            </div>
            <div className={styles.dangerActions}>
              <button className={styles.btnDangerFilled} onClick={handleDeleteAccount}>
                Yes, delete everything
              </button>
              <button className={styles.btnGhost} onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}