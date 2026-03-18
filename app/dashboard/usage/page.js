'use client'
import { useState, useEffect } from 'react'
import styles from './usage.module.css'

const PLAN_LIMITS = { free: 50, starter: 500, pro: 5000 }

export default function Usage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser({
        ...parsed,
        limit: PLAN_LIMITS[parsed.plan] || 50
      })
    }
  }, [])

  if (!user) return null

  const usagePercent = Math.round((user.usage / user.limit) * 100) || 0
  const remaining = user.limit - user.usage
  const successRate = 94 // will connect to real data later

  // Get reset date (1st of next month)
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const resetDays = Math.ceil((resetDate - now) / (1000 * 60 * 60 * 24))
  const resetDateStr = resetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <>
      <div className={styles.header}>
        <h1>Usage</h1>
        <p>Track your API usage and request history this month.</p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Used this month</div>
          <div className={styles.statVal}>{user.usage}<span>/{user.limit}</span></div>
          <div className={styles.statSub}>{usagePercent}% of {user.plan} plan</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Remaining</div>
          <div className={styles.statVal}>{remaining}</div>
          <div className={styles.statSub}>resets in {resetDays} days</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Success rate</div>
          <div className={styles.statVal}>{successRate}<span>%</span></div>
          <div className={styles.statSub}>based on all requests</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Monthly usage</div>
        <div className={styles.cardDesc}>Your usage resets on the 1st of every month</div>
        <div className={styles.barWrap}>
          <div className={styles.barLabel}>
            <span>{user.usage} screenshots used</span>
            <span>{user.limit} limit</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{
                width: `${usagePercent}%`,
                background: usagePercent >= 90 ? '#E24B4A' : usagePercent >= 70 ? '#EF9F27' : 'var(--accent)'
              }}
            ></div>
          </div>
          <div className={styles.barSub}>{usagePercent}% used · {remaining} remaining</div>
        </div>
        <div className={styles.resetInfo}>
          <span>Next reset</span>
          <strong>{resetDateStr} · in {resetDays} days</strong>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Recent requests</div>
        <div className={styles.cardDesc}>Your last API calls will appear here</div>
        {user.usage === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)', fontSize: '13px' }}>
            No requests yet. Make your first API call to see history here.
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)', fontSize: '13px' }}>
            You have made {user.usage} requests this month.
          </div>
        )}
      </div>
    </>
  )
}