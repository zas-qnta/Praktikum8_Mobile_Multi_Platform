import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Alert } from "../../src/utils/alert";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import { resetDiaries, toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { MOODS } from "../../src/constants/moods";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function HomeScreen() {
  // Eksperimen 1: perhatikan kapan komponen ini render (lihat terminal Metro)
  console.log("Home render");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);

  // Eksperimen 4 / Tugas statistik: selector tanpa membuat state baru
  const totalDiary = useAppSelector((state) => state.diary.entries.length);
  const totalFavorite = useAppSelector(
    (state) => state.diary.entries.filter((item) => item.liked).length
  );

  // Filter mood bersifat lokal (hanya dipakai di screen ini)
  const [moodFilter, setMoodFilter] = useState<string>("all");

  const filteredEntries = useMemo(
    () =>
      moodFilter === "all"
        ? entries
        : entries.filter((item) => item.mood === moodFilter),
    [entries, moodFilter]
  );

  const confirmReset = () => {
    Alert.alert(
      "Reset Data",
      "Semua perubahan akan dikembalikan ke data awal. Lanjutkan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch(resetDiaries());
            setMoodFilter("all");
          },
        },
      ]
    );
  };

  const emptyMessage =
    totalDiary === 0
      ? "Belum ada diary. Buka tab Tambah untuk menulis diary pertamamu."
      : "Tidak ada diary dengan mood ini. Pilih mood lain atau tekan Semua.";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalFavorite}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {["all", ...MOODS].map((item) => (
          <Pressable
            key={item}
            onPress={() => setMoodFilter(item)}
            style={[styles.chip, moodFilter === item && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, moodFilter === item && styles.chipTextActive]}
            >
              {item === "all" ? "Semua" : item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite({ id: item.id }))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        ListFooterComponent={
          <Pressable onPress={confirmReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset ke Data Awal</Text>
          </Pressable>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statCard: {
    flex: 1,
    padding: SPACE.m,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
    marginBottom: SPACE.m,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 40,
    paddingHorizontal: SPACE.xl,
    lineHeight: 20,
  },
  resetButton: {
    marginTop: SPACE.s,
    marginBottom: SPACE.xl,
    padding: 12,
    alignItems: "center",
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetText: {
    color: COLORS.muted,
  },
});