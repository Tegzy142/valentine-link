"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
import VideoUpload from "@/components/VideoUpload";

export default function Create() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const slug = uuid().slice(0, 8);

    const { error } = await supabase.from("valentines").insert({
      slug,
      sender_name: name,
      message,
      images: [],
      video_url: videoUrl || null,
    });

    if (error) {
      alert("Something went wrong");
      console.error(error);
      setLoading(false);
      return;
    }

    window.location.href = `/v/${slug}`;
  };

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
          {loading ? "Creating..." : "Generate Valentine Link"}
        </button>
      </div>
    </main>
  );
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
    resize: "vertical",
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
};




// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { v4 as uuid } from "uuid";
// import VideoUpload from "@/components/VideoUpload";

// export default function Create() {
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async () => {
//     if (!name || !message) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     const slug = uuid().slice(0, 8);

//     const { error } = await supabase.from("valentines").insert({
//       slug,
//       sender_name: name,
//       message,
//       images: [],
//       video_url: videoUrl || null,
//     });

//     if (error) {
//       alert("Something went wrong");
//       console.error(error);
//       setLoading(false);
//       return;
//     }

//     window.location.href = `/v/${slug}`;
//   };

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#fff0f6",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           background: "white",
//           padding: 30,
//           borderRadius: 16,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>
//           Create Your Valentine 💌
//         </h2>

//         <input
//           placeholder="Your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ width: "100%", padding: 10, marginBottom: 10 }}
//         />

//         <textarea
//           placeholder="Your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           style={{ width: "100%", padding: 10, marginBottom: 10 }}
//         />

//         <p style={{ fontSize: 14 }}>Add a short video (optional)</p>

//         {/* ✅ CLOUDINARY VIDEO UPLOAD */}
//         <VideoUpload onUpload={setVideoUrl} />

//         {videoUrl && (
//           <p style={{ fontSize: 12, color: "green", marginTop: 6 }}>
//             Video uploaded successfully ✓
//           </p>
//         )}

//         <button
//           onClick={submit}
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: 12,
//             borderRadius: 12,
//             border: "none",
//             background: "#ff4d6d",
//             color: "white",
//             cursor: "pointer",
//             marginTop: 20,
//           }}
//         >
//           {loading ? "Creating..." : "Generate Valentine Link"}
//         </button>
//       </div>
//     </main>
//   );
// }
























































// "use client";

// import { useState } from "react";

// export default function VideoUpload({ onUpload }) {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleUpload(e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     setError("");

//     // Basic validation
//     const maxSize = 20 * 1024 * 1024; // 20MB
//     const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

//     if (!allowedTypes.includes(file.type)) {
//       setError("Only MP4, WebM, or MOV videos are allowed.");
//       return;
//     }

//     if (file.size > maxSize) {
//       setError("Video must be 20MB or less.");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
//     );
//     formData.append(
//       "cloud_name",
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//     );

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error?.message || "Upload failed");
//       }

//       // Send video URL back to parent
//       onUpload(data.secure_url);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div style={{ marginTop: 20 }}>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleUpload}
//         disabled={uploading}
//       />

//       {uploading && <p>Uploading… please wait</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }





















































// "use client"
// import VideoUpload from "@/components/VideoUpload";


// import { useState } from "react"
// import { supabase } from "@/lib/supabase"
// import { v4 as uuid } from "uuid"

// export default function Create() {
//   const [name, setName] = useState("")
//   const [message, setMessage] = useState("")
//   const [videoUrl, setVideoUrl] = useState("")
//   const [loading, setLoading] = useState(false)

//   const uploadVideo = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Video too large (max 5MB)")
//       return
//     }

//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("upload_preset", "YOUR_PRESET_NAME")

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload",
//       { method: "POST", body: formData }
//     )

//     const data = await res.json()
//     setVideoUrl(data.secure_url)
//   }

//   const submit = async () => {
//     if (!name || !message) {
//       alert("Please fill all fields")
//       return
//     }

//     setLoading(true)
//     const slug = uuid().slice(0, 8)

//     const { error } = await supabase.from("valentines").insert({
//       slug,
//       sender_name: name,
//       message,
//       images: [],
//       video_url: videoUrl,
//     })

//     if (error) {
//       alert("Something went wrong")
//       console.error(error)
//       setLoading(false)
//       return
//     }

//     window.location.href = `/v/${slug}`
//   }
  

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#fff0f6",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           background: "white",
//           padding: 30,
//           borderRadius: 16,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>
//           Create Your Valentine 💌
//         </h2>

//         <input
//           placeholder="Your name"
//           onChange={(e) => setName(e.target.value)}
//           style={{ width: "100%", padding: 10, marginBottom: 10 }}
//         />

//         <textarea
//           placeholder="Your message"
//           onChange={(e) => setMessage(e.target.value)}
//           style={{ width: "100%", padding: 10, marginBottom: 10 }}
//         />

//         <p style={{ fontSize: 14 }}>Add a short video (optional)</p>

//         <input
//           type="file"
//           accept="video/mp4,video/mov"
//           onChange={uploadVideo}
//           style={{ marginBottom: 15 }}
//         />

//         <button
//           onClick={submit}
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: 12,
//             borderRadius: 12,
//             border: "none",
//             background: "#ff4d6d",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Creating..." : "Generate Valentine Link"}
//         </button>
//       </div>
//     </main>
//   )
// }
