"use client";

import { useState } from "react";

export default function VideoUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setProgress(0);

    // 🔒 VALIDATIONS (important)
    const maxSize = 20 * 1024 * 1024; // 20MB
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only MP4, WebM or MOV videos are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("Video must be 20MB or less.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      onUpload(data.secure_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>Uploading… please wait</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
