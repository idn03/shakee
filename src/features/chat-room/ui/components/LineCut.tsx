import { View } from "react-native";
import { CommonText } from "@/src/shared/components";
import { useTranslation } from "@/src/i18n";

interface LineCutProps {
  cutAt: Date;
}

export const LineCut: React.FC<LineCutProps> = ({ cutAt }) => {
  const { locale } = useTranslation();
  const validCutAt = Number.isNaN(cutAt.getTime()) ? null : cutAt;
  const extractedCutAt = validCutAt
    ? `${new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
        weekday: "long",
      }).format(validCutAt)}, ${new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }).format(validCutAt)}`
    : "";
  return (
    <View className="gap-1">
      <CommonText 
        value={extractedCutAt}
        color="#959595"
        sizeNumber={10}
      />

      <View className="w-full h-[2px] bg-gray-200" />
    </View>
  );
};