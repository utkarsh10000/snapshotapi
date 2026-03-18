'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          snap<span>shot</span>.api
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <ul className="nav-links">
            <li>
              <Link href="/docs">Docs</Link>
            </li>
            <li>
              <a
                href="#pricing"
                className="nav-link-a"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Pricing
              </a>
            </li>
          </ul>
          <Link href="/login" className="nav-login">
            Login
          </Link>
          <Link href="/signup" className="nav-cta">
            Get API Key →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Live · 99.9% uptime
        </div>
        <h1>
          Turn any URL into a <span className="highlight">screenshot</span>{" "}
          instantly
        </h1>
        <p className="hero-desc">
          One API call. Get a pixel-perfect screenshot of any webpage in under 2
          seconds. No setup, no headaches.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="btn-primary">
            Start for free →
          </Link>
          <Link href="/docs" className="btn-ghost">
            View docs ↗
          </Link>
        </div>

        {/* CODE BLOCK */}
        <div className="code-block">
          <div className="code-bar">
            <span className="dot dot-r"></span>
            <span className="dot dot-y"></span>
            <span className="dot dot-g"></span>
            <span className="code-label">example · javascript</span>
          </div>
          <pre>
            <span className="c-comment">
              {"// Get a screenshot in 3 lines of code"}
            </span>
            {"\n"}
            <span className="c-key">const </span>response ={" "}
            <span className="c-key">await </span>fetch({"\n"}
            {"  "}
            <span className="c-str">
              'https://api.snapshot.api/screenshot?url=https://google.com'
            </span>
            ,{"\n"}
            {"  "}
            {"{ headers: { "}
            <span className="c-str">'x-api-key'</span>
            {": "}
            <span className="c-str">'your_api_key'</span>
            {" } }"}
            {"\n"}
            );{"\n"}
            <span className="c-key">const </span>
            {"{ "}
            <span>image</span>
            {" } = "}
            <span className="c-key">await </span>response.json();{"\n"}
            <span className="c-comment">
              {"// → returns base64 PNG, ready to use"}
            </span>
          </pre>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat">
          <div className="stat-num">
            2<span>s</span>
          </div>
          <div className="stat-label">avg response time</div>
        </div>
        <div className="stat">
          <div className="stat-num">
            75<span>+</span>
          </div>
          <div className="stat-label">languages supported</div>
        </div>
        <div className="stat">
          <div className="stat-num">
            99<span>.9%</span>
          </div>
          <div className="stat-label">uptime guarantee</div>
        </div>
        <div className="stat">
          <div className="stat-num">
            1<span>M+</span>
          </div>
          <div className="stat-label">screenshots served</div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="section">
        <div className="section-tag">// features</div>
        <div className="section-title">Everything you need</div>
        <div className="features-grid">
          {[
            {
              icon: "⚡",
              title: "Lightning fast",
              desc: "Screenshots delivered in under 2 seconds. Built on headless Chrome with optimized cold starts.",
            },
            {
              icon: "📐",
              title: "Full page capture",
              desc: "Capture the entire page — not just the viewport. Set custom width, height and device type.",
            },
            {
              icon: "🔑",
              title: "Simple API keys",
              desc: "One key, one endpoint. Integrate in minutes. Works with any language — JS, Python, PHP and more.",
            },
            {
              icon: "📱",
              title: "Mobile emulation",
              desc: "Render pages as mobile, tablet or desktop. Perfect for responsive design testing.",
            },
            {
              icon: "🔒",
              title: "Secure & private",
              desc: "Screenshots are never stored beyond delivery. Your data stays yours. HTTPS only.",
            },
            {
              icon: "📊",
              title: "Usage dashboard",
              desc: "Track every API call in real time. Monitor usage, set alerts and never hit limits by surprise.",
            },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div className="section" id = "pricing">
        <div className="section-tag">// pricing</div>
        <div className="section-title">Simple, honest pricing</div>
        <div className="pricing-grid">
          {/* Free */}
          <div className="price-card">
            <div className="price-plan">Free</div>
            <div className="price-amount">
              <sup>$</sup>0
            </div>
            <div className="price-period">forever free</div>
            <ul className="price-features">
              <li>50 screenshots / month</li>
              <li>1280×720 resolution</li>
              <li>PNG format</li>
              <li>Community support</li>
            </ul>
            <button
              onClick={() => router.push("/signup")}
              className="btn-plan btn-plan-ghost"
            >
              Get started
            </button>
          </div>

          {/* Starter */}
          <div className="price-card featured">
            <div className="price-badge">Most popular</div>
            <div className="price-plan">Starter</div>
            <div className="price-amount">
              <sup>$</sup>9
            </div>
            <div className="price-period">per month</div>
            <ul className="price-features">
              <li>500 screenshots / month</li>
              <li>Full page capture</li>
              <li>PNG + JPG formats</li>
              <li>Email support</li>
            </ul>
            <button
              onClick={() => router.push("/signup")}
              className="btn-plan btn-plan-filled"
            >
              Start free trial
            </button>
          </div>

          {/* Pro */}
          <div className="price-card">
            <div className="price-plan">Pro</div>
            <div className="price-amount">
              <sup>$</sup>29
            </div>
            <div className="price-period">per month</div>
            <ul className="price-features">
              <li>5000 screenshots / month</li>
              <li>Mobile emulation</li>
              <li>Priority support</li>
              <li>Custom resolution</li>
            </ul>
            <button
              onClick={() => router.push("/signup")}
              className="btn-plan btn-plan-ghost"
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-banner">
        <div className="cta-inner">
          <h2>Ready to ship faster?</h2>
          <p>
            Join developers already using snapshot.api. Free to start, no credit
            card needed.
          </p>
          <Link href="/signup" className="btn-primary">
            Get your free API key →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="nav-logo">
          snap<span>shot</span>.api
        </div>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/refund">Refund Policy</a>
        <p>Built with ☕ · © 2025</p>
      </footer>
    </>
  );
}