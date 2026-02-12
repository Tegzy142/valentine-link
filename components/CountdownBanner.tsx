"use client"

import { useEffect, useState } from "react"

export default function CountdownBanner() {
  // ⏰ Set deadline (change if needed)
  const DEADLINE = new Date("2026-02-14T23:59:59").getTime()

  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = DEADLINE - now

      if (diff <= 0) {
        setTimeLeft("Offer has ended 💔")
        clearInterval(interval)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft(
        `${hours}h ${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={styles.banner}>
      ⏳ Valentine offer ends in{" "}
      <span style={styles.time}>{timeLeft}</span>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  banner: {
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    display: "inline-block",
    marginBottom: 20,
    boxShadow: "0 8px 25px rgba(255,77,109,0.35)",
  },

  time: {
    fontWeight: 800,
    marginLeft: 6,
  },
}
