import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./translations";

type SupportedLocale = keyof typeof translations;

const i18n = new I18n(translations);
i18n.enableFallback = true;

const getDeviceLocale = (): SupportedLocale =>
  getLocales()[0]?.languageCode === "vi" ? "vi" : "en";

i18n.locale = getDeviceLocale();

const LocaleContext = createContext<SupportedLocale>(getDeviceLocale());

export function I18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<SupportedLocale>(getDeviceLocale);

  i18n.locale = locale;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        setLocale(getDeviceLocale());
      }
    });

    return () => subscription.remove();
  }, []);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useTranslation() {
  const locale = useContext(LocaleContext);

  return {
    locale,
    t: i18n.t.bind(i18n),
  };
}
