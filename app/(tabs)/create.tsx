import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Alert } from "../../src/utils/alert";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../src/store/hooks";
import { addDiary } from "../../src/features/diary/diarySlice";
import { MOODS } from "../../src/constants/moods";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(MOODS[0]);

  const saveDiary = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul minimal 3 karakter");
      return;
    }
    if (!body.trim()) {
      Alert.alert("Validasi", "Isi diary wajib diisi");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    dispatch(
      addDiary({
        title: title.trim(),
        date: today,
        preview: body.trim().slice(0, 100),
        body: body.trim(),
        mood,
      })
    );

    setTitle("");
    setBody("");
    setMood(MOODS[0]);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tambah Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary (minimal 3 karakter)"
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.selectedMood]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={saveDiary} style={styles.button}>
        <Text style={styles.buttonText}>Simpan ke Redux</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  mood: {
    fontSize: 28,
  },
  button: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});