import { useEffect } from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/src/i18n";
import { useSignUp } from "@/src/features/auth/hooks/useSignUp";
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
  const {
    currentStep,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    avatarUri,
    setAvatarUri,
    isSubmitting,
    attemptedStep,
    isEmailValid,
    isUsernameValid,
    isPasswordValid,
    isStepValid,
    goToPreviousStep,
    handlePrimaryPress,
    hasRegistrationError,
    dismissRegistrationError,
  } = useSignUp();

  useEffect(() => {
    if (!hasRegistrationError) {
      return;
    }

    Alert.alert(t("auth.signUpFailedTitle"), t("auth.signUpFailedMessage"), [
      { text: "OK", onPress: dismissRegistrationError },
    ]);
  }, [dismissRegistrationError, hasRegistrationError, t]);

  const handleBack = () => {
    if (goToPreviousStep()) {
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login");
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
          isPrimaryDisabled={!isStepValid(currentStep)}
          isSubmitting={isSubmitting}
        />
      </View>
    </View>
  );
};
