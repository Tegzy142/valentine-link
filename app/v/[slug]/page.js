"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Valentine({ params }) {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For the envelope reveal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { slug } = await params;
      const { data: valentine } = await supabase
        .from("valentines")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      setData(valentine);
      setLoading(false);
    }
    fetchData();
  }, [params]);

  const handleOpen = () => {
    setIsOpen(true);
    // Trigger Confetti Explosion
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ffb3c1", "#ff0000", "#000000"]
    });
  };

  if (loading) return null;

  if (!data) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", color: "white" }}>
        <h2>💔 Valentine not found</h2>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background: "radial-gradient(circle at top, #ffe4ec, #fff0f6 40%, #ffd6e5)",
    }}>
      {!isOpen ? (
        /* 💌 THE ENVELOPE (BEFORE OPENING) */
        <div 
          onClick={handleOpen}
          style={{
            textAlign: "center",
            cursor: "pointer",
            animation: "bounce 2s infinite"
          }}
        >
          <div style={{ fontSize: 100 }}>💌</div>
          <h2 style={{ color: "black", marginTop: 20, fontWeight: "800" }}>
            You have a secret message from {data.sender_name}
          </h2>
          <p style={{ color: "black", fontWeight: "600" }}>Tap the envelope to open</p>
          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
              40% {transform: translateY(-20px);}
              60% {transform: translateY(-10px);}
            }
          `}</style>
        </div>
      ) : (
        /* 💖 THE ACTUAL CONTENT (AFTER OPENING) */
        <div style={{
          maxWidth: 520,
          width: "100%",
          background: "white",
          padding: "36px 28px",
          borderRadius: 24,
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(255,77,109,0.3)",
          position: "relative",
          animation: "fadeIn 1s ease-in"
        }}>
          <h1 style={{ fontSize: 28, marginBottom: 16, color: "#ff4d6d", fontWeight: "900" }}>
            A Valentine for You
          </h1>

          {data.video_url && (
            <div style={{ marginBottom: 20, borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <video
                src={data.video_url}
                controls
                playsInline
                autoPlay
                style={{ width: "100%", display: "block" }}
              />
            </div>
          )}

          <p style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: "black", // Changed to solid black
            marginBottom: 28,
            whiteSpace: "pre-wrap",
            fontWeight: "700" // Made bolder for better visibility
          }}>
            {data.message}
          </p>

          <div style={{
            fontSize: 18,
            color: "black", // Changed to solid black
            fontStyle: "italic",
            fontWeight: "900",
            borderTop: "1px solid #eee",
            paddingTop: 15
          }}>
            — {data.sender_name}
          </div>
          
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}

































































// import { createClient } from "@supabase/supabase-js"


// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

// export default async function Valentine({ params }) {
//   // ✅ FIX: In Next.js 15, params is a promise and MUST be awaited
//   const { slug } = await params;

//   const { data, error } = await supabase
//     .from("valentines")
//     .select("*")
//     .eq("slug", slug)
//     .maybeSingle()

//   if (!data) {
//     return (
//       <main
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "linear-gradient(135deg, #000, #1a1a1a)",
//           color: "white",
//           padding: 20,
//           textAlign: "center",
//         }}
//       >
//         <div>
//           <h2 style={{ fontSize: 28, marginBottom: 10 }}>💔 Valentine not found</h2>
//           <p style={{ opacity: 0.8 }}>
//             This message may have expired or never existed.
//           </p>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//         background:
//           "radial-gradient(circle at top, #ffe4ec, #fff0f6 40%, #ffd6e5)",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 520,
//           width: "100%",
//           background: "white",
//           padding: "36px 28px",
//           borderRadius: 24,
//           textAlign: "center",
//           boxShadow: "0 20px 60px rgba(255,77,109,0.25)",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: -14,
//             left: "50%",
//             transform: "translateX(-50%)",
//             fontSize: 28,
//           }}
//         >
//           💗
//         </div>

//         <h1
//           style={{
//             fontSize: 28,
//             marginBottom: 16,
//             color: "#ff4d6d",
//             fontWeight: 700,
//           }}
//         >
//           A Valentine for You
//         </h1>

//         {data.video_url && (
//           <div
//             style={{
//               marginBottom: 20,
//               borderRadius: 16,
//               overflow: "hidden",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//             }}
//           >
//             <video
//               src={data.video_url}
//               controls
//               playsInline
//               style={{
//                 width: "100%",
//                 display: "block",
//               }}
//             />
//           </div>
//         )}

//         <p
//           style={{
//             fontSize: 18,
//             lineHeight: 1.6,
//             color: "#333",
//             marginBottom: 28,
//             whiteSpace: "pre-wrap",
//           }}
//         >
//           {data.message}
//         </p>

//         <div
//           style={{
//             fontSize: 16,
//             color: "#ff4d6d",
//             fontStyle: "italic",
//             fontWeight: 500,
//           }}
//         >
//           — {data.sender_name}
//         </div>
//       </div>
//     </main>
//   )
// }











