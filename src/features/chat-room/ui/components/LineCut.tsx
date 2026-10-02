import { View } from "react-native";
import { CommonText } from "@/src/shared/components";

interface LineCutProps {
  cutAt: Date;
}

export const LineCut: React.FC<LineCutProps> = ({ cutAt }) => {
  const extractedCutAt = "Friday, 02/10"; // On the UI, will display Week day + DD/MM by extract cutAt, example: Thursday, 20/08 (both VI and EN for week day)
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