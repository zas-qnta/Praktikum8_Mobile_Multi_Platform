import { Alert as RNAlert, Platform } from "react-native";

type AlertButton = {
  text?: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void;
};

// Di web, Alert.alert bawaan React Native tidak melakukan apa-apa.
// Helper ini memakai window.alert / window.confirm saat berjalan di browser,
// dan tetap memakai Alert asli di Android/iOS.
export const Alert = {
  alert(title: string, message?: string, buttons?: AlertButton[]) {
    if (Platform.OS !== "web") {
      RNAlert.alert(title, message, buttons);
      return;
    }

    const text = message ? title + "\n\n" + message : title;

    if (!buttons || buttons.length <= 1) {
      window.alert(text);
      buttons?.[0]?.onPress?.();
      return;
    }

    if (window.confirm(text)) {
      buttons.find((b) => b.style !== "cancel")?.onPress?.();
    } else {
      buttons.find((b) => b.style === "cancel")?.onPress?.();
    }
  },
};