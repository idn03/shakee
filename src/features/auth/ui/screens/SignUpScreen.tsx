import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import {
  isEmail,
  isPasswordFormat,
  isUsername,
} from "@/src/shared/utils/validators";
import {
  AuthHeader,
  ProgressBar,
  SignUpFooter,
  SignUpStep1,
  SignUpStep2,
  SignUpStep3,
} from "../components";

export const SignUpScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState<0 | 1 | 2 | 3>(0);

  const isEmailValid = isEmail(email);
  const isUsernameValid = isUsername(username);
  const isPasswordValid = isPasswordFormat(password);

  const isStepValid = (step: 1 | 2 | 3) => {
    switch (step) {
      case 1:
        return isEmailValid;
      case 2:
        return isUsernameValid && isPasswordValid;
      case 3:
        return true;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => (step - 1) as 1 | 2 | 3);
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login");
    }
  };

  const handlePrimaryPress = async () => {
    setAttemptedStep(currentStep);

    if (!isStepValid(currentStep)) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((step) => (step + 1) as 1 | 2 | 3);
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email.trim(), username.trim(), password, avatarUri ?? "");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUpStep1
            email={email}
            onChangeEmail={setEmail}
            emailError={
              attemptedStep === 1 && !isEmailValid
                ? t("auth.invalidEmail")
                : undefined
            }
          />
        );
      case 2:
        return (
          <SignUpStep2
            username={username}
            onChangeUsername={setUsername}
            password={password}
            onChangePassword={setPassword}
            usernameError={
              attemptedStep === 2 && !isUsernameValid
                ? t("auth.invalidUsername")
                : undefined
            }
            passwordError={
              attemptedStep === 2 && !isPasswordValid
                ? t("auth.invalidPassword")
                : undefined
            }
          />
        );
      case 3:
        return (
          <SignUpStep3 avatarUri={avatarUri} onChangeAvatar={setAvatarUri} />
        );
    }
  };

  return (
    <View className="flex-1">
      <AuthHeader title={t("auth.signUp")} />
      <View className="flex-1 justify-between px-3 pb-3">
        <ProgressBar currentStep={currentStep} />

        <View className="flex-1">{renderCurrentStep()}</View>

        <SignUpFooter
          currentStep={currentStep}
          onBack={handleBack}
          onPrimaryPress={handlePrimaryPress}
          isSubmitting={isSubmitting}
        />
      </View>
    </View>
  );
};
