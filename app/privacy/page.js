import styles from './legal.module.css'

export const metadata = {
  title: 'Privacy Policy — snapshot.api',
  description: 'Privacy Policy for snapshot.api',
}

export default function PrivacyPolicy() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Back to Home</a>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: June 2025</p>

        <p>snapshot.api ("we", "us", or "our") operates the website snapshotapi-2qj9.vercel.app and provides the snapshot.api service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following information when you create an account or use our service:</p>
        <ul>
          <li>Email address</li>
          <li>Name (if provided via Google or GitHub OAuth)</li>
          <li>Usage data (number of API requests made)</li>
          <li>Payment information (processed securely by Paddle — we do not store card details)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected data to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Manage your account and API key</li>
          <li>Track your usage against your plan limits</li>
          <li>Process payments via our payment provider, Paddle</li>
          <li>Send important service-related emails</li>
        </ul>

        <h2>3. Data Storage</h2>
        <p>Your data is stored securely in a MongoDB database. We do not sell, trade, or share your personal data with third parties except as necessary to provide the service (e.g., payment processing via Paddle).</p>

        <h2>4. Cookies</h2>
        <p>We use minimal cookies necessary for authentication and session management. We do not use tracking or advertising cookies.</p>

        <h2>5. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Paddle</strong> — payment processing</li>
          <li><strong>Google OAuth</strong> — optional login via Google</li>
          <li><strong>GitHub OAuth</strong> — optional login via GitHub</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>We retain your personal data for as long as your account is active. You can request deletion of your account and all associated data at any time from the Settings page in your dashboard.</p>

        <h2>7. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information at any time. You can do this directly from your dashboard Settings page or by contacting us.</p>

        <h2>8. Security</h2>
        <p>We take reasonable measures to protect your personal information. Passwords are hashed using bcrypt and API keys are stored securely. However, no method of transmission over the internet is 100% secure.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our service is not directed to anyone under the age of 13. We do not knowingly collect personal data from children.</p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: <strong>support@snapshotapi.dev</strong></p>
      </div>
    </div>
  )
}