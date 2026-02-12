import Link from "next/link"
import React from "react"
import CountdownBanner from "@/components/CountdownBanner"


export default function Home() {
  return (
    <main style={styles.page}>
      {/* Background decorations */}
      <div style={styles.hearts} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.container}>
        {/* Trust badge */}
        <div style={styles.badge}>
          💖 Trusted Digital Valentine Experience
        </div>

        <h1 style={styles.title}>
          A Beautiful Way to Say <br />
          <span style={styles.highlight}>&quot;I Love You&quot;</span>
        </h1>

        <p style={styles.subtitle}>
          Don&apos;t just send a message. Create a{" "}
          <strong>private Valentine page</strong> with a heartfelt note and a
          personal video — made just for one special person.
        </p>

        {/* Value props */}
        <div style={styles.features}>
          <div style={styles.feature}>🎥 Personal Video Message</div>
          <div style={styles.feature}>🔒 Private & Secure Link</div>
          <div style={styles.feature}>💌 Romantic Gift Experience</div>
        </div>
         <CountdownBanner />

        {/* CTA Card */}
        <div style={styles.card}>
          <div style={styles.price}>
            <span style={styles.oldPrice}>₦3,000</span>
            <span style={styles.newPrice}> ₦2,500</span>
          </div>

          <Link href="/pay" style={{ textDecoration: "none" }}>
            <div style={styles.button}>
              Create Your Valentine — ₦2,500 💌
            </div>
          </Link>

          <p style={styles.note}>
            ⏱ Takes less than 2 minutes • 🔒 Secure payment
          </p>
        </div>

        <p style={styles.socialProof}>
          ❤️ Thousands of heartfelt Valentines already sent
        </p>
      </div>
     
    </main>
  )
}

/* ================= STYLES ================= */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff0f6, #ffe3ec)",
    padding: 20,
    position: "relative",
    overflow: "hidden",
    color: "black",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  hearts: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 30%, rgba(255,77,109,0.12) 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, rgba(255,77,109,0.12) 0 2px, transparent 3px)",
    backgroundSize: "120px 120px",
    pointerEvents: "none",
  },

  glowLeft: {
    position: "absolute",
    left: "-10%",
    top: "10%",
    width: 300,
    height: 300,
    background: "rgba(255,77,109,0.15)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },

  glowRight: {
    position: "absolute",
    right: "-10%",
    bottom: "10%",
    width: 300,
    height: 300,
    background: "rgba(255,117,143,0.15)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },

  container: {
    maxWidth: 600,
    width: "100%",
    textAlign: "center",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    background: "white",
    padding: "6px 16px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    color: "#ff4d6d",
    marginBottom: 24,
    boxShadow: "0 4px 15px rgba(255,77,109,0.15)",
  },

  title: {
    fontSize: 36,
    fontWeight: 800,
    marginBottom: 16,
    lineHeight: 1.2,
  },

  highlight: {
    color: "#ff4d6d",
  },

  subtitle: {
    fontSize: 18,
    color: "#333",
    lineHeight: 1.6,
    marginBottom: 28,
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 36,
  },

  feature: {
    background: "white",
    padding: "10px 14px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  card: {
    background: "white",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 50px rgba(255,77,109,0.25)",
    marginBottom: 20,
  },

  price: {
    marginBottom: 12,
    fontSize: 14,
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
  },

  newPrice: {
    fontWeight: 800,
    color: "#ff4d6d",
    fontSize: 18,
  },

  button: {
    width: "100%",
    padding: "16px 22px",
    fontSize: 18,
    borderRadius: 18,
    border: "none",
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },

  note: {
    marginTop: 12,
    fontSize: 12,
    color: "#666",
  },

  socialProof: {
    fontSize: 13,
    color: "#555",
    opacity: 0.85,
  },
}
