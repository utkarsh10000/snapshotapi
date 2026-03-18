import styles from './legal.module.css'

export const metadata = {
  title: 'Terms & Conditions — snapshot.api',
  description: 'Terms and Conditions for snapshot.api',
}

export default function Terms() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <a href="/" className={styles.back}>← Back to Home</a>
        <h1>Terms & Conditions</h1>
        <p className={styles.updated}>Last updated: June 2025</p>

        <p>Please read these Terms and Conditions carefully before using snapshot.api. By accessing or using our service, you agree to be bound by these terms.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By creating an account and using snapshot.api, you agree to these Terms and Conditions. If you do not agree, please do not use the service.</p>

        <h2>2. Description of Service</h2>
        <p>snapshot.api is a Website Screenshot API that allows developers to capture pixel-perfect screenshots of any website URL via a simple API call. The service is provided on a subscription basis with different plan tiers.</p>

        <h2>3. Account Registration</h2>
        <p>You must create an account to use snapshot.api. You are responsible for maintaining the confidentiality of your API key and account credentials. You must notify us immediately of any unauthorized use of your account.</p>

        <h2>4. API Usage & Limits</h2>
        <p>Each plan has a monthly screenshot limit:</p>
        <ul>
          <li><strong>Free:</strong> 50 screenshots/month</li>
          <li><strong>Starter:</strong> 500 screenshots/month</li>
          <li><strong>Pro:</strong> 5,000 screenshots/month</li>
        </ul>
        <p>Usage resets on the 1st of each month. Exceeding your plan limit will result in requests being rejected until the next reset or an upgrade.</p>

        <h2>5. Acceptable Use</h2>
        <p>You agree not to use snapshot.api to:</p>
        <ul>
          <li>Screenshot websites without proper authorization</li>
          <li>Capture illegal, harmful, or copyrighted content for redistribution</li>
          <li>Attempt to reverse engineer, hack, or abuse the API</li>
          <li>Resell or redistribute the API service without permission</li>
          <li>Overload or intentionally disrupt our servers</li>
        </ul>

        <h2>6. Payment & Billing</h2>
        <p>Paid plans are billed monthly. Payments are processed securely by Paddle. By subscribing to a paid plan, you authorize Paddle to charge your payment method on a recurring monthly basis.</p>

        <h2>7. Refunds</h2>
        <p>Please refer to our <a href="/refund">Refund Policy</a> for information about refunds.</p>

        <h2>8. Termination</h2>
        <p>We reserve the right to suspend or terminate your account at any time if you violate these terms. You may also delete your account at any time from your dashboard Settings page.</p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>snapshot.api is provided "as is" without any warranties of any kind. We do not guarantee 100% uptime or that the service will be error-free at all times.</p>

        <h2>10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, snapshot.api shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the service.</p>

        <h2>11. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

        <h2>12. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at: <strong>support@snapshotapi.dev</strong></p>
      </div>
    </div>
  )
}