import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SignUpSteps } from "../../types";
import { CommonText } from "@/src/shared/components/CommonText";

interface ProgressBarProps extends SignUpSteps {}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 3,
}) => {
  const progressPercentage = Math.min(
    100,
    Math.max(0, (currentStep / totalSteps) * 100)
  );
  const animatedProgress = useSharedValue(progressPercentage);

  useEffect(() => {
    animatedProgress.value = withTiming(progressPercentage, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [animatedProgress, progressPercentage]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  return (
    <View className="w-full gap-1">
      <View className="h-[6px] w-full overflow-hidden rounded-full bg-white">
        <Animated.View
          className="h-full rounded-full bg-[#76C457]"
          style={animatedProgressStyle}
        />
      </View>

      <CommonText
        value={`${currentStep}/${totalSteps}`}
        className="text-right text-xs font-bold"
      />
    </View>
  );
};
