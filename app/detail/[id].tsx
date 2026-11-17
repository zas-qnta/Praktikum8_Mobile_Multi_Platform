import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Alert } from "../../src/utils/alert";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { deleteDiary, toggleFavorite } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function DetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  if (!entry) {
    return <Text style={{ padding: 16 }}>Diary tidak ditemukan.</Text>;
  }

  const confirmDelete = () => {
    Alert.alert("Hapus Diary", "Diary akan dihapus dari Redux Store.", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          dispatch(deleteDiary(entry.id));
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mood}>{entry.mood}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.body}>{entry.body}</Text>

      <Pressable
        onPress={() => dispatch(toggleFavorite({ id: entry.id }))}
        style={styles.favoriteButton}
      >
        <Text style={styles.white}>
          {entry.liked ? "Hapus dari Favorite" : "Tambah ke Favorite"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/edit/[id]",
            params: { id: String(entry.id) },
          })
        }
        style={styles.editButton}
      >
        <Text style={styles.editText}>Edit Diary</Text>
      </Pressable>

      <Pressable onPress={confirmDelete} style={styles.deleteButton}>
        <Text style={styles.white}>Hapus Diary</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  mood: {
    fontSize: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },
  date: {
    color: COLORS.muted,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  favoriteButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  editButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surface,
  },
  editText: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  deleteButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  white: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});