const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryUploadResponse {
  secure_url?: string;
  error?: { message?: string };
}

const getImageMimeType = (uri: string) => {
  const extension = uri.split("?")[0].split(".").pop()?.toLowerCase();

  switch (extension) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
    case "heif":
      return "image/heic";
    default:
      return "image/jpeg";
  }
};

/** Uploads a local image-picker URI using a Cloudinary unsigned upload preset. */
export const uploadAvatar = async (
  uri: string,
  registrationId: string,
): Promise<string> => {
  if (__DEV__) {
    console.info("[Cloudinary] Avatar upload started", { registrationId });
  }

  try {
    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
      );
    }

    const extension = uri.split("?")[0].split(".").pop()?.toLowerCase();
    const fileName = `avatar.${extension || "jpg"}`;
    const formData = new FormData();

    formData.append("file", {
      uri,
      name: fileName,
      type: getImageMimeType(uri),
    } as unknown as Blob);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
      { method: "POST", body: formData },
    );

    const result = (await response.json()) as CloudinaryUploadResponse;

    if (!response.ok || !result.secure_url) {
      throw new Error(
        result.error?.message ?? "Cloudinary avatar upload failed.",
      );
    }

    if (__DEV__) {
      console.info("[Cloudinary] Avatar upload succeeded", { registrationId });
    }

    return result.secure_url;
  } catch (error) {
    if (__DEV__) {
      console.log("[Cloudinary] Avatar upload failed", {
        registrationId,
        error,
      });
    }
    throw error;
  }
};
