import styles from './legal.module.css'

export const metadata = {
  title: 'Refund Policy — snapshot.api',
  description: 'Refund Policy for snapshot.api',
}

export default function RefundPolicy() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Back to Home</a>
        <h1>Refund Policy</h1>
        <p className={styles.updated}>Last updated: June 2025</p>

        <p>We want you to be happy with snapshot.api. Please read our refund policy carefully.</p>

        <h2>1. Free Plan</h2>
        <p>The Free plan is completely free of charge. No payment is required and no refunds are applicable.</p>

        <h2>2. Paid Plans (Starter & Pro)</h2>
        <p>We offer a <strong>7-day refund window</strong> from the date of your first payment. If you are not satisfied with the service within the first 7 days of subscribing, you may request a full refund by contacting us.</p>

        <h2>3. How to Request a Refund</h2>
        <p>To request a refund, please email us at <strong>support@snapshotapi.dev</strong> within 7 days of your payment with:</p>
        <ul>
          <li>Your registered email address</li>
          <li>The reason for your refund request</li>
        </ul>
        <p>We will process your refund within 5–7 business days.</p>

        <h2>4. Renewals</h2>
        <p>Monthly subscription renewals are generally non-refundable. If you do not wish to be charged for the next month, please cancel your subscription before the renewal date from your dashboard Billing page.</p>

        <h2>5. Cancellations</h2>
        <p>You can cancel your subscription at any time from your dashboard. After cancellation, you will retain access to your paid plan until the end of the current billing period, after which your account will revert to the Free plan.</p>

        <h2>6. Exceptions</h2>
        <p>We reserve the right to deny refund requests if we determine that the service was misused or if the request falls outside the 7-day refund window.</p>

        <h2>7. Contact Us</h2>
        <p>For any refund-related queries, please contact us at: <strong>support@snapshotapi.dev</strong></p>
      </div>
    </div>
  )
}