import axios from "axios";
import { useState } from "react";

/**
 * Custom hook for uploading images to ImgBB
 * @returns {Object} An object containing:
 *   - uploadImage: Function to upload an image
 *   - uploading: Boolean indicating upload status
 *   - uploadError: String containing error message if upload fails
 */
const useImgbbUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  /**
   * Uploads an image file to ImgBB
   * @param {File} file - The image file to upload
   * @returns {Promise<string>} URL of the uploaded image
   * @throws {Error} If upload fails
   */
  const uploadImage = async (file) => {
    // Validate input
    if (!(file instanceof File)) {
      throw new Error("Invalid file provided. Expected a File object.");
    }

    // Check file size (optional - ImgBB has 32MB limit)
    if (file.size > 32 * 1024 * 1024) {
      throw new Error("File size exceeds 32MB limit");
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setUploadError(null);

    try {
      const apiKey = import.meta.env.VITE_imgbb_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is not configured");
      }

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.error?.message || "Image upload failed");
      }

      return response.data.data.url;
    } catch (error) {
      let errorMessage = "Failed to upload image";

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.error?.message ||
          error.response.statusText ||
          `Server responded with ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "No response from server. Check your network connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || errorMessage;
      }

      setUploadError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadError };
};

export default useImgbbUploader;
