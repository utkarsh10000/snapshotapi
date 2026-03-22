'use client';
import { useState, useEffect } from 'react';
import styles from './billing.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BillingPage() {
  const [loading, setLoading] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('free');

  useEffect(() => {
    // Load Paddle.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (token) {
        window.Paddle.Initialize({ token });
      } else {
        console.error('Paddle client token is missing!');
      }
    };
    document.body.appendChild(script);

    // Get current plan from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setCurrentPlan(parsed.plan || 'free');
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
    <>
      <div className={styles.header}>
        <h1>Billing & Plans</h1>
        <p>Choose the plan that fits your needs</p>
      </div>

      <div className={styles.pricingGrid}>

        {/* Free Plan */}
        <div className={`${styles.planCard} ${currentPlan === 'free' ? styles.current : ''}`}>
          {currentPlan === 'free' && <span className={styles.currentBadge}>Current Plan</span>}
          <div className={styles.planTier}>Free</div>
          <div className={styles.planPrice}><sup>$</sup>0</div>
          <div className={styles.planPeriod}>per month</div>
          <ul className={styles.planFeatures}>
            <li>50 screenshots / month</li>
            <li>API key access</li>
            <li>Basic support</li>
          </ul>
          <button disabled className={styles.btnDisabled}>
            {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Starter Plan */}
        <div className={`${styles.planCard} ${currentPlan === 'starter' ? styles.current : ''}`}>
          {currentPlan === 'starter' && <span className={styles.currentBadge}>Current Plan</span>}
          <div className={styles.planTier}>Starter</div>
          <div className={styles.planPrice}><sup>$</sup>9</div>
          <div className={styles.planPeriod}>per month</div>
          <ul className={styles.planFeatures}>
            <li>500 screenshots / month</li>
            <li>API key access</li>
            <li>Priority support</li>
          </ul>
          {currentPlan === 'starter' ? (
            <button disabled className={styles.btnDisabled}>Current Plan</button>
          ) : (
            <button
              className={styles.btnFilled}
              onClick={() => handleUpgrade('starter')}
              disabled={loading === 'starter'}
            >
              {loading === 'starter' ? 'Loading...' : 'Upgrade to Starter'}
            </button>
          )}
        </div>

        {/* Pro Plan */}
        <div className={`${styles.planCard} ${styles.popular} ${currentPlan === 'pro' ? styles.current : ''}`}>
          {currentPlan === 'pro'
            ? <span className={styles.currentBadge}>Current Plan</span>
            : <span className={styles.popularBadge}>Most Popular</span>
          }
          <div className={styles.planTier}>Pro</div>
          <div className={styles.planPrice}><sup>$</sup>29</div>
          <div className={styles.planPeriod}>per month</div>
          <ul className={styles.planFeatures}>
            <li>5,000 screenshots / month</li>
            <li>API key access</li>
            <li>Priority support</li>
            <li>Higher rate limits</li>
          </ul>
          {currentPlan === 'pro' ? (
            <button disabled className={styles.btnDisabled}>Current Plan</button>
          ) : (
            <button
              className={styles.btnFilled}
              onClick={() => handleUpgrade('pro')}
              disabled={loading === 'pro'}
            >
              {loading === 'pro' ? 'Loading...' : 'Upgrade to Pro'}
            </button>
          )}
        </div>

      </div>
    </>
  );
}