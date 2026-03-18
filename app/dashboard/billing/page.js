'use client'
import styles from './billing.module.css'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever free',
    features: ['50 screenshots / month', '1280×720 resolution', 'PNG format', 'Community support'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    period: 'per month',
    popular: true,
    features: ['500 screenshots / month', 'Full page capture', 'PNG + JPG formats', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'per month',
    features: ['5000 screenshots / month', 'Mobile emulation', 'Priority support', 'Custom resolution'],
  },
]

export default function Billing() {

  // Dummy data — replace with real user data later
  const currentPlan = 'free'
  const billingHistory = [] // empty for free users

  const handleUpgrade = (planId) => {
    // We will connect Stripe here later
    alert(`Stripe checkout for ${planId} plan coming soon!`)
  }

  return (
    <>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Billing</h1>
        <p>Manage your plan and billing information.</p>
      </div>

      {/* CURRENT PLAN BANNER */}
      <div className={styles.currentPlan}>
        <div>
          <div className={styles.planTag}>Current plan</div>
          <div className={styles.planName}>
            {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            <span className={styles.activeBadge}>ACTIVE</span>
          </div>
          <div className={styles.planDetail}>
            {currentPlan === 'free' && '50 screenshots / month · no credit card required'}
            {currentPlan === 'starter' && '500 screenshots / month · billed monthly'}
            {currentPlan === 'pro' && '5000 screenshots / month · billed monthly'}
          </div>
        </div>
      </div>

      {/* PRICING GRID */}
      <div className={styles.pricingGrid}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.planCard} ${plan.popular ? styles.popular : ''} ${plan.id === currentPlan ? styles.current : ''}`}
          >
            {plan.popular && <div className={styles.popularBadge}>Most popular</div>}
            {plan.id === currentPlan && <div className={styles.currentBadge}>Current plan</div>}

            <div className={styles.planTier}>{plan.name}</div>
            <div className={styles.planPrice}><sup>$</sup>{plan.price}</div>
            <div className={styles.planPeriod}>{plan.period}</div>

            <ul className={styles.planFeatures}>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {plan.id === currentPlan ? (
              <button className={styles.btnDisabled} disabled>Current plan</button>
            ) : (
              <button
                className={plan.popular ? styles.btnFilled : styles.btnGhost}
                onClick={() => handleUpgrade(plan.id)}
              >
                Upgrade → ${plan.price}/mo
              </button>
            )}
          </div>
        ))}
      </div>

      {/* BILLING HISTORY */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Billing history</div>
        <div className={styles.cardDesc}>Your past invoices and payments</div>

        {billingHistory.length === 0 ? (
          <div className={styles.emptyState}>
            {currentPlan === 'free'
              ? 'You are on the free plan — no billing history yet.'
              : 'No invoices yet.'}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item, i) => (
                <tr key={i}>
                  <td>{item.date}</td>
                  <td>{item.plan}</td>
                  <td>${item.amount}</td>
                  <td><span className={styles.paidBadge}>Paid</span></td>
                  <td><a href={item.invoiceUrl} className={styles.invoiceLink}>Download</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}