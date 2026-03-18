'use client'
import { useState } from 'react'
import styles from './docs.module.css'

const codeExamples = {
  javascript: `const response = await fetch(
  'https://api.snapshot.api/screenshot?url=https://google.com',
  { headers: { 'x-api-key': 'your-api-key' } }
);
const { image } = await response.json();
// image is a base64 PNG string`,

  python: `import requests

response = requests.get(
  'https://api.snapshot.api/screenshot',
  params={'url': 'https://google.com'},
  headers={'x-api-key': 'your-api-key'}
)
data = response.json()
# data['image'] is a base64 PNG string`,

  curl: `curl -X GET \\
  'https://api.snapshot.api/screenshot?url=https://google.com' \\
  -H 'x-api-key: your-api-key'`,
}

export default function Docs() {
  const [activeTab, setActiveTab] = useState('javascript')

  return (
    <>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Documentation</h1>
        <p>Everything you need to integrate snapshot.api into your project.</p>
      </div>

      {/* AUTHENTICATION */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Authentication</div>
        <div className={styles.cardDesc}>
          All API requests require an API key. Pass it in the{' '}
          <code className={styles.inline}>x-api-key</code> request header.
        </div>
        <div className={styles.sectionLabel}>Example</div>
        <div className={styles.codeBox}>
          <span className={styles.ck}>fetch</span>(<span className={styles.cv}>&apos;https://api.snapshot.api/screenshot?url=https://google.com&apos;</span>, {'{'}
          <br />&nbsp;&nbsp;headers: {'{ '}<span className={styles.cv}>&apos;x-api-key&apos;</span>: <span className={styles.cv}>&apos;your-api-key&apos;</span>{' }'}
          <br />{'}'}
          )
        </div>
      </div>

      {/* ENDPOINT */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Take a screenshot</div>
        <div className={styles.cardDesc}>
          Capture a pixel-perfect screenshot of any public webpage.
        </div>

        <div className={styles.endpoint}>
          <span className={styles.method}>GET</span>
          <span className={styles.endpointUrl}>/api/screenshot</span>
        </div>

        {/* PARAMS */}
        <div className={styles.sectionLabel}>Parameters</div>
        <table className={styles.paramsTable}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.param}>url</span> <span className={styles.required}>required</span></td>
              <td>string</td>
              <td>The full URL of the page to screenshot</td>
            </tr>
            <tr>
              <td><span className={styles.param}>width</span> <span className={styles.optional}>optional</span></td>
              <td>number</td>
              <td>Viewport width in px. Default: 1280</td>
            </tr>
            <tr>
              <td><span className={styles.param}>height</span> <span className={styles.optional}>optional</span></td>
              <td>number</td>
              <td>Viewport height in px. Default: 720</td>
            </tr>
            <tr>
              <td><span className={styles.param}>fullPage</span> <span className={styles.optional}>optional</span></td>
              <td>boolean</td>
              <td>Capture full page. Default: false</td>
            </tr>
          </tbody>
        </table>

        {/* CODE EXAMPLES */}
        <div className={styles.sectionLabel}>Code examples</div>
        <div className={styles.tabs}>
          {['javascript', 'python', 'curl'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.codeBox}>
          <pre>{codeExamples[activeTab]}</pre>
        </div>

        {/* RESPONSE */}
        <div className={styles.sectionLabel}>Response</div>
        <div className={styles.codeBox}>
          <pre>{`{
  "success": true,
  "url": "https://google.com",
  "image": "data:image/png;base64,...",
  "takenAt": "2026-03-18T10:00:00.000Z",
  "usage": { "used": 1, "plan": "free" }
}`}</pre>
        </div>
      </div>

      {/* ERROR CODES */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Error codes</div>
        <div className={styles.cardDesc}>
          All errors return a JSON object with <code className={styles.inline}>success: false</code> and an error message.
        </div>

        {[
          { code: '400', desc: 'Bad request — missing or invalid URL parameter' },
          { code: '401', desc: 'Unauthorized — missing or invalid API key' },
          { code: '429', desc: 'Too many requests — monthly limit reached or rate limit hit' },
          { code: '500', desc: 'Server error — failed to take screenshot' },
        ].map((err) => (
          <div key={err.code} className={styles.errorRow}>
            <div className={styles.errorCode}>{err.code}</div>
            <div className={styles.errorDesc}>{err.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}