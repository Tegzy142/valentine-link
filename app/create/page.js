"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { v4 as uuid } from "uuid"
import VideoUpload from "@/components/VideoUpload"

export default function Create() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔒 BLOCK ACCESS IF NOT PAID
  useEffect(() => {
    const paid = sessionStorage.getItem("valentine_paid")
    if (!paid) {
      router.replace("/pay")
    }
  }, [router])

  const submit = async () => {
    if (!name || !message) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)
    const slug = uuid().slice(0, 8)

    const { error } = await supabase.from("valentines").insert({
      slug,
      sender_name: name,
      message,
      images: [],
      video_url: videoUrl || null,
      paid: true, // ✅ REQUIRED FOR RLS
    })

    if (error) {
      console.error(error)
      alert("Failed to create Valentine")
      setLoading(false)
      return
    }

    // 🔐 Invalidate payment after use
    sessionStorage.removeItem("valentine_paid")
    window.location.href = `/v/${slug}`
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>💌 Create a Valentine</h1>
        <p style={styles.subtitle}>
          Send a personal message that comes from the heart
        </p>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.uploadBox}>
          <p style={styles.uploadText}>Optional: add a short video ❤️</p>
          <VideoUpload onUpload={setVideoUrl} />
          {videoUrl && (
            <p style={styles.success}>Video uploaded successfully ✓</p>
          )}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Creating..." : "Create Valentine 💖"}
        </button>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff0f6, #ffe3ec)",
    padding: 20,
    color: "black",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "white",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 20px 50px rgba(255,77,109,0.25)",
  },
  title: {
    textAlign: "center",
    marginBottom: 6,
    fontSize: 26,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "1px solid #ddd",
    fontSize: 15,
  },
  textarea: {
    width: "100%",
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    border: "1px solid #ddd",
    fontSize: 15,
    minHeight: 100,
  },
  uploadBox: {
    background: "#fff5f8",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 13,
    marginBottom: 8,
    opacity: 0.8,
  },
  success: {
    fontSize: 12,
    color: "green",
    marginTop: 6,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
}
