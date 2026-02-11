export default function Home() {
  return (
    <main style={styles.page}>
      {/* soft background hearts */}
      <div style={styles.hearts} />

      <div style={styles.card}>
        <h1 style={styles.title}>💖 A Private Valentine Message</h1>

        <p style={styles.subtitle}>
          Create a private Valentine link with a heartfelt message and a short
          video. Only the person you send it to can see it.
        </p>

        <a href="/pay" style={{ textDecoration: "none" }}>
          <button style={styles.button}>
            Create Your Valentine — ₦2,500 💌
          </button>
        </a>

        <p style={styles.note}>Takes less than 2 minutes</p>
      </div>
    </main>
  )
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff0f6, #ffe3ec)",
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },

  hearts: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 25% 30%, rgba(255,77,109,0.12) 0 2px, transparent 3px), radial-gradient(circle at 75% 70%, rgba(255,77,109,0.12) 0 2px, transparent 3px)",
    backgroundSize: "120px 120px",
    pointerEvents: "none",
  },

  card: {
    maxWidth: 440,
    width: "100%",
    background: "white",
    borderRadius: 22,
    padding: "36px 30px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(255,77,109,0.25)",
    zIndex: 1,
  },

  title: {
    fontSize: 30,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    lineHeight: 1.6,
  },

  button: {
    width: "100%",
    padding: "16px 22px",
    fontSize: 17,
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },

  note: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
}
