import { supabase } from "@/lib/supabase"

export default async function Valentine({ params }) {
  const { slug } = params

  const { data, error } = await supabase
    .from("valentines")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000, #1a1a1a)",
          color: "white",
          padding: 20,
          textAlign: "center",
        }}
      >
        <div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>💔 Valentine not found</h2>
          <p style={{ opacity: 0.8 }}>
            This message may have expired or never existed.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background:
          "radial-gradient(circle at top, #ffe4ec, #fff0f6 40%, #ffd6e5)",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "white",
          padding: "36px 28px",
          borderRadius: 24,
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(255,77,109,0.25)",
          position: "relative",
        }}
      >
        {/* Decorative hearts */}
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 28,
          }}
        >
          💗
        </div>

        <h1
          style={{
            fontSize: 28,
            marginBottom: 16,
            color: "#ff4d6d",
            fontWeight: 700,
          }}
        >
          A Valentine for You
        </h1>

        {data.video_url && (
          <div
            style={{
              marginBottom: 20,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <video
              src={data.video_url}
              controls
              playsInline
              muted
              style={{
                width: "100%",
                display: "block",
              }}
            />
          </div>
        )}

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#333",
            marginBottom: 28,
            whiteSpace: "pre-wrap",
          }}
        >
          {data.message}
        </p>

        <div
          style={{
            fontSize: 16,
            color: "#ff4d6d",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          — {data.sender_name}
        </div>
      </div>
    </main>
  )
}
