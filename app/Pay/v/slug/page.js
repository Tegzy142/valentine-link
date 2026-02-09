"use client"
import Script from "next/script"


export default function Pay() {
  const pay = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxxx",
      email: "test@email.com",
      amount: 2500 * 100,
      currency: "NGN",
      callback: function () {
        window.location.href = "/create"
      }
    })

    handler.openIframe()
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Pay ₦2,500 to continue</h2>
      <p>This creates your private Valentine link 💖</p>

      <button onClick={pay}>Pay Now</button>

     <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />

    </div>
  )
}
