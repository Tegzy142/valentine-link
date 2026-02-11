"use client"

import Script from "next/script"

export default function Pay() {
  const pay = () => {
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
      {/* ✅ Correct way to load Paystack */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff0f6",
          padding: 20,
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            background: "white",
            padding: 30,
            borderRadius: 16,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h2>💳 Pay to Create Your Valentine</h2>

          <p style={{ margin: "20px 0", color: "#555" }}>
            One-time payment of <strong>₦2,500</strong> to create a private
            Valentine message.
          </p>

          <button
            onClick={pay}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: "#ff4d6d",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Pay ₦2,500
          </button>
        </div>
      </main>
    </>
  )
}

