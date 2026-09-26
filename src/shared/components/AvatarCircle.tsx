import { Image } from "react-native";

interface AvatarCircleProps {
  avatarUri: string;
  size: "md" | "lg";
  className?: string;
}

export const AvatarCircle: React.FC<AvatarCircleProps> = ({ size, className, avatarUri }) => {
  // if size == "md": 36px, if size == "lg": 48px
  const extractedSize = 0;
  return (
    <Image 
      className={`h-[${extractedSize}px] w-[${extractedSize}] rounded-full border-2 border-white`}
      accessibilityLabel={"Avatar image"}
    />
  );
};