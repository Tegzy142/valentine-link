"use client";

import { useState } from "react";

export default function VideoUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // 🔒 HARD VALIDATION
    const maxSize = 20 * 1024 * 1024; // 20MB
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only MP4, WebM, or MOV videos are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("Video must be 20MB or less.");
      return;
    }

    const cloudName = "dbylwf8gd"
    const uploadPreset = "valentine_video"


    if (!cloudName || !uploadPreset) {
      setError("Cloudinary environment variables missing.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("resource_type", "video");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Cloudinary error:", data);
        throw new Error(
          data?.error?.message || "Cloudinary upload failed"
        );
      }

      // ✅ SUCCESS
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
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>Uploading video…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

