/**
 * Uploads a file to Cloudinary via unsigned direct upload.
 *
 * Uses the unsigned upload preset configured in the Cloudinary dashboard.
 * This is safe for admin-only forms protected behind JWT authentication.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The secure CDN URL of the uploaded image.
 * @throws {Error} If the upload request fails or Cloudinary returns a non-OK status.
 */
export async function uploadImage(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Build multipart form data — Cloudinary expects "file" and "upload_preset" fields
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // POST directly to Cloudinary's REST API — no backend proxy needed
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Upload failed");

  // secure_url is always HTTPS regardless of the original upload source
  const data = await res.json();
  return data.secure_url;
}
