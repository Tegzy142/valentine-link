"use client"

import Script from "next/script"

export default function Pay() {
  const pay = (e) => {
    e.preventDefault()

    if (!window.PaystackPop) {
      alert("Paystack not loaded yet, please try again")
      return
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: "customer@example.com",
      amount: 2500 * 100,
      currency: "NGN",
      callback: function () {
        // ✅ Mark user as paid
        sessionStorage.setItem("valentine_paid", "true")
        window.location.href = "/create"
      },
      onClose: function () {
        alert("Payment cancelled")
      },
    })

    handler.openIframe()
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />

      <form onSubmit={pay}>
        <main style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.badge}>🔒 Secure One-Time Payment</div>

            <h2 style={styles.title}>Create Your Valentine 💖</h2>

            <p style={styles.subtitle}>
              Make your message special with words and a short video.
              Only the person you send it to can see it.
            </p>

            <div style={styles.priceBox}>
              <span style={styles.price}>₦2,500</span>
              <span style={styles.priceNote}>One-time payment</span>
            </div>

            <button type="submit" style={styles.button}>
              Pay & Continue 💌
            </button>

            <p style={styles.footerText}>
              ✔ Instant access after payment <br />
              ✔ No subscription • No hidden fees
            </p>
          </div>
        </main>
      </form>
    </>
  )
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff0f6, #ffe6ec)",
    padding: 20,
  },
  card: {
    maxWidth: 420,
    width: "100%",
    background: "white",
    padding: 32,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "#ffe0e8",
    color: "#ff4d6d",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 24,
    lineHeight: 1.5,
  },
  priceBox: {
    background: "#fff0f6",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  price: {
    display: "block",
    fontSize: 28,
    fontWeight: 800,
    color: "#ff4d6d",
  },
  priceNote: {
    fontSize: 13,
    color: "#777",
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255,77,109,0.35)",
  },
  footerText: {
    marginTop: 18,
    fontSize: 12,
    color: "#888",
    lineHeight: 1.5,
  },
}
