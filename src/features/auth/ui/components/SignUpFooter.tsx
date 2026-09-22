import { Pressable, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useTranslation } from "@/src/i18n";
import { CommonText } from "@/src/shared/components";
import type { SignUpSteps } from "../../types";

interface SignUpFooterProps extends SignUpSteps {
  onBack: () => void;
  onPrimaryPress: () => void;
  isPrimaryDisabled?: boolean;
  isSubmitting?: boolean;
}

export const SignUpFooter: React.FC<SignUpFooterProps> = ({
  currentStep,
  totalSteps = 3,
  onBack,
  onPrimaryPress,
  isPrimaryDisabled = false,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();
  const isLastStep = currentStep === totalSteps;
  const isDisabled = isPrimaryDisabled || isSubmitting;

  return (
    <View className="flex-row items-center justify-between gap-3">
      <Pressable
        className="h-10 w-10 items-center justify-center rounded-lg border border-white"
        onPress={onBack}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ChevronLeft
          size={24}
          color="#FFFFFF"
        />
      </Pressable>

      <Pressable
        className={`flex-1 h-10 w-full flex-row items-center justify-center gap-1 rounded-lg bg-white border border-white px-4 ${isDisabled ? "opacity-50" : ""}`}
        onPress={onPrimaryPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={isLastStep ? t("auth.finalSignUp") : t("auth.nextStep")}
      >
        <CommonText
          value={isSubmitting ? "..." : isLastStep ? t("auth.finalSignUp") : t("auth.nextStep")}
          color="#000000"
        />
        {!isLastStep && <ChevronRight size={24} color="#000000" />}
      </Pressable>
    </View>
  );
};
