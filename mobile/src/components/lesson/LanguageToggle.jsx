// LanguageToggle.jsx
// React Native / Expo version
//
// Uses AsyncStorage to persist choice. If not installed yet:
//   npx expo install @react-native-async-storage/async-storage
//
// SETUP:
// 1. Wrap your App root (App.js or _layout.js) with <LanguageProvider>
// 2. Add <LanguageToggle /> to your Dashboard header or a settings screen
// 3. In any screen: const { lang } = useLanguage();

import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "ta", label: "தமிழ்" },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    AsyncStorage.getItem("elevateher_lang").then((saved) => {
      if (saved) setLang(saved);
    });
  }, []);

  const changeLang = (code) => {
    setLang(code);
    AsyncStorage.setItem("elevateher_lang", code);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageToggle() {
  const { lang, changeLang } = useLanguage();

  return (
    <View style={styles.row}>
      {LANGUAGES.map((l) => (
        <TouchableOpacity
          key={l.code}
          onPress={() => changeLang(l.code)}
          style={[styles.btn, lang === l.code && styles.btnActive]}
        >
          <Text style={[styles.text, lang === l.code && styles.textActive]}>
            {l.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#2a1a2a",
    borderRadius: 8,
    padding: 4,
    alignSelf: "flex-start",
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnActive: {
    backgroundColor: "#ec4899",
  },
  text: {
    fontSize: 13,
    color: "#c9a3c9",
  },
  textActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
