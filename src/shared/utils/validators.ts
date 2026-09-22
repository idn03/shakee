export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isUsername = (value: string) =>
  /^[A-Za-z0-9._]+$/.test(value.trim());

export const isPasswordFormat = (value: string) =>
  value.length >= 8 &&
  /[A-Za-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value);
