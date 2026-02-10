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
          background: "#000",
          color: "white",
        }}
      >
        <h2>Valentine not found 💔</h2>
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
        background: "#fff0f6",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          background: "white",
          padding: 30,
          borderRadius: 16,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1>💖 A Valentine for You 💖</h1>

        {data.video_url && (
            <video
            src={data.video_url}
            controls
            playsInline
            muted
            style={{
              width: "100%",
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
        )}

        <p style={{ fontSize: 18 }}>{data.message}</p>
        <h4 style={{ marginTop: 20 }}>— {data.sender_name}</h4>
      </div>
    </main>
  )
}
