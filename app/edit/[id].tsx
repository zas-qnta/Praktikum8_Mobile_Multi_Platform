import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Alert } from "../../src/utils/alert";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { editDiary } from "../../src/features/diary/diarySlice";
import { MOODS } from "../../src/constants/moods";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  // Nilai awal form diambil dari Redux, selanjutnya jadi local state
  const [title, setTitle] = useState(entry?.title ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [mood, setMood] = useState(entry?.mood ?? MOODS[0]);

  if (!entry) {
    return <Text style={{ padding: 16 }}>Diary tidak ditemukan.</Text>;
  }

  const saveChanges = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul minimal 3 karakter");
      return;
    }
    if (!body.trim()) {
      Alert.alert("Validasi", "Isi diary wajib diisi");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
      })
    );
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Diary</Text>

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

      <Pressable onPress={saveChanges} style={styles.button}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
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