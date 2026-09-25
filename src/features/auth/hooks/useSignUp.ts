import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import {
  isEmail,
  isPasswordFormat,
  isUsername,
} from "@/src/shared/utils/validators";
import { emailExistsInFirestore } from "@/src/features/auth/lib/emailExistsInFirestore";

type SignUpStep = 1 | 2 | 3;

export const useSignUp = () => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState<SignUpStep>(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [emailCheckFailed, setEmailCheckFailed] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState<0 | SignUpStep>(0);
  const [hasRegistrationError, setHasRegistrationError] = useState(false);

  const dismissRegistrationError = useCallback(
    () => setHasRegistrationError(false),
    [],
  );

  const updateEmail = (value: string) => {
    setEmail(value);
    setEmailAlreadyExists(false);
    setEmailCheckFailed(false);
  };

  const isEmailValid = isEmail(email);
  const isUsernameValid = isUsername(username);
  const isPasswordValid = isPasswordFormat(password);

  const isStepValid = (step: SignUpStep) => {
    switch (step) {
      case 1:
        return isEmailValid && !isCheckingEmail;
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
    if (isSubmitting || isCheckingEmail) {
      return;
    }

    setAttemptedStep(currentStep);
    setEmailAlreadyExists(false);
    setEmailCheckFailed(false);

    if (!isStepValid(currentStep)) {
      return;
    }

    if (currentStep === 1) {
      setIsCheckingEmail(true);
      try {
        const exists = await emailExistsInFirestore(email.trim());
        if (exists) {
          setEmailAlreadyExists(true);
          return;
        }
      } catch {
        setEmailCheckFailed(true);
        return;
      } finally {
        setIsCheckingEmail(false);
      }
    }

    if (currentStep < 3) {
      setCurrentStep((step) => (step + 1) as SignUpStep);
      return;
    }

    setIsSubmitting(true);
    setHasRegistrationError(false);

    try {
      await register(email.trim(), username.trim(), password, avatarUri ?? "");
    } catch {
      setHasRegistrationError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    email,
    setEmail: updateEmail,
    username,
    setUsername,
    password,
    setPassword,
    avatarUri,
    setAvatarUri,
    isSubmitting,
    isCheckingEmail,
    emailAlreadyExists,
    emailCheckFailed,
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
