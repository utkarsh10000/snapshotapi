'use client';
import { useState, useEffect } from 'react';
import styles from './billing.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BillingPage() {
  const [loading, setLoading] = useState(null); // 'starter' | 'pro' | null
  const [currentPlan, setCurrentPlan] = useState('free');

  useEffect(() => {
    // Load Paddle.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      // Initialize Paddle with your client token
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      });
    };
    document.body.appendChild(script);

    // Get current plan from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setCurrentPlan(parsed.plan || 'free');
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleUpgrade(plan) {
    setLoading(plan);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan })
      });

      const data = await res.json();

      if (data.url) {
        // Open Paddle embedded checkout popup
        window.Paddle.Checkout.open({
          url: data.url,
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            successUrl: `${window.location.origin}/dashboard/billing?success=true`
          }
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={styles.billingPage}>
      <h1>Billing & Plans</h1>
      <p className={styles.subtitle}>Choose the plan that fits your needs</p>

      <div className={styles.plans}>

        {/* Free Plan */}
        <div className={`${styles.planCard} ${currentPlan === 'free' ? styles.activePlan : ''}`}>
          <div className={styles.planHeader}>
            <h2>Free</h2>
            {currentPlan === 'free' && <span className={styles.badge}>Current Plan</span>}
          </div>
          <p className={styles.price}>$0 <span>/month</span></p>
          <ul>
            <li>50 screenshots / month</li>
            <li>API key access</li>
            <li>Basic support</li>
          </ul>
          <button disabled className={styles.disabledBtn}>
            {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Starter Plan */}
        <div className={`${styles.planCard} ${currentPlan === 'starter' ? styles.activePlan : ''}`}>
          <div className={styles.planHeader}>
            <h2>Starter</h2>
            {currentPlan === 'starter' && <span className={styles.badge}>Current Plan</span>}
          </div>
          <p className={styles.price}>$9 <span>/month</span></p>
          <ul>
            <li>500 screenshots / month</li>
            <li>API key access</li>
            <li>Priority support</li>
          </ul>
          {currentPlan === 'starter' ? (
            <button disabled className={styles.disabledBtn}>Current Plan</button>
          ) : (
            <button
              className={styles.upgradeBtn}
              onClick={() => handleUpgrade('starter')}
              disabled={loading === 'starter'}
            >
              {loading === 'starter' ? 'Loading...' : 'Upgrade to Starter'}
            </button>
          )}
        </div>

        {/* Pro Plan */}
        <div className={`${styles.planCard} ${currentPlan === 'pro' ? styles.activePlan : ''}`}>
          <div className={styles.planHeader}>
            <h2>Pro</h2>
            {currentPlan === 'pro' && <span className={styles.badge}>Current Plan</span>}
            <span className={styles.popularBadge}>Most Popular</span>
          </div>
          <p className={styles.price}>$29 <span>/month</span></p>
          <ul>
            <li>5,000 screenshots / month</li>
            <li>API key access</li>
            <li>Priority support</li>
            <li>Higher rate limits</li>
          </ul>
          {currentPlan === 'pro' ? (
            <button disabled className={styles.disabledBtn}>Current Plan</button>
          ) : (
            <button
              className={styles.upgradeBtn}
              onClick={() => handleUpgrade('pro')}
              disabled={loading === 'pro'}
            >
              {loading === 'pro' ? 'Loading...' : 'Upgrade to Pro'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}