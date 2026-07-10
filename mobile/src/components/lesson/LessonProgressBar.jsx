// LessonProgressBar.jsx
// React Native / Expo version
// Drop into src/components/LessonProgressBar.jsx (or wherever your other components live)
//
// Usage:
//   <LessonProgressBar current={2} total={5} />

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LessonProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>Step {current} of {total}</Text>
        <Text style={styles.labelText}>{pct}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 12,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  labelText: {
    fontSize: 13,
    color: "#c9a3c9", // adjust to match your theme
  },
  track: {
    width: "100%",
    height: 10,
    borderRadius: 6,
    backgroundColor: "#2a1a2a", // dark track matching your screenshot's palette
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#ec4899", // pink, matches your existing buttons
  },
});

// --- Example usage in SnackLesson screen ---
// import LessonProgressBar from "../components/LessonProgressBar";
//
// export default function SnackLessonScreen() {
//   const [step, setStep] = useState(1);
//   const totalSteps = 5;
//   return (
//     <View>
//       <LessonProgressBar current={step} total={totalSteps} />
//       {/* rest of lesson content */}
//     </View>
//   );
// }
