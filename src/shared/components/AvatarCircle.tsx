import { useEffect, useState } from "react";
import { Image } from "react-native";

const defaultAvatar = require("@/assets/images/default-avatar.jpg");

interface AvatarCircleProps {
  avatarUri: string;
  size: "md" | "lg";
  className?: string;
}

export const AvatarCircle: React.FC<AvatarCircleProps> = ({
  size,
  className,
  avatarUri,
}) => {
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    setHasLoadError(false);
  }, [avatarUri]);

  return (
    <Image
      source={avatarUri && !hasLoadError ? { uri: avatarUri } : defaultAvatar}
      className={`${size === "md" ? "h-12 w-12" : "h-16 w-16"} rounded-full border-2 border-white ${className ?? ""}`}
      resizeMode="cover"
      onError={() => setHasLoadError(true)}
      accessibilityLabel="Avatar image"
    />
  );
};
