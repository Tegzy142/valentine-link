export default function Home() {
  return (
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
          borderRadius: 16,
          padding: 30,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>
          💖 A Private Valentine Message
        </h1>

        <p style={{ fontSize: 16, color: "#555", marginBottom: 30 }}>
          Create a private Valentine link with a message and a short video.
          Only the person you send it to can see it.
        </p>

        <a href="/pay" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "14px 20px",
              fontSize: 16,
              borderRadius: 12,
              border: "none",
              background: "#ff4d6d",
              color: "white",
              cursor: "pointer",
            }}
          >
            Create Your Valentine — ₦2,500 💌
          </button>
        </a>

        <p style={{ marginTop: 15, fontSize: 12, color: "#888" }}>
          Takes less than 2 minutes
        </p>
      </div>
    </main>
  )
}
