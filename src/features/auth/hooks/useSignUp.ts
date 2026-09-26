import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { uploadAvatar } from "@/src/shared/lib/cloudinary";
import {
  isEmail,
  isPasswordFormat,
  isUsername,
} from "@/src/shared/utils/validators";

type SignUpStep = 1 | 2 | 3;

export const useSignUp = () => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState<SignUpStep>(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState<0 | SignUpStep>(0);
  const [hasRegistrationError, setHasRegistrationError] = useState(false);

  const dismissRegistrationError = useCallback(
    () => setHasRegistrationError(false),
    [],
  );

  const isEmailValid = isEmail(email);
  const isUsernameValid = isUsername(username);
  const isPasswordValid = isPasswordFormat(password);

  const isStepValid = (step: SignUpStep) => {
    switch (step) {
      case 1:
        return isEmailValid;
      case 2:
        return isUsernameValid && isPasswordValid;
      case 3:
        return true;
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 1) {
      return false;
    }

    setCurrentStep((step) => (step - 1) as SignUpStep);
    return true;
  };

  const handlePrimaryPress = async () => {
    if (isSubmitting) {
      return;
    }

    setAttemptedStep(currentStep);

    if (!isStepValid(currentStep)) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((step) => (step + 1) as SignUpStep);
      return;
    }

    setIsSubmitting(true);
    setHasRegistrationError(false);
    const registrationId = `reg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    if (__DEV__) {
      console.info("[Registration] Started", {
        registrationId,
        avatarSelected: Boolean(avatarUri),
      });
    }

    try {
      const avatarUrl = avatarUri
        ? await uploadAvatar(avatarUri, registrationId)
        : "";

      if (__DEV__) {
        console.info("[Registration] Avatar upload stage finished", {
          registrationId,
          avatarUploaded: Boolean(avatarUrl),
        });
      }

      await register(
        email.trim(),
        username.trim(),
        password,
        avatarUrl,
        registrationId,
      );

      if (__DEV__) {
        console.info("[Registration] Completed", { registrationId });
      }
    } catch (error) {
      if (__DEV__) {
        console.log("[Registration] Failed", { registrationId, error });
      }
      setHasRegistrationError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
