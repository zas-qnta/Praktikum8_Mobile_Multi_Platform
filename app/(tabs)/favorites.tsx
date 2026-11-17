import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Alert } from "../../src/utils/alert";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  // Eksperimen 1: perhatikan kapan komponen ini render (lihat terminal Metro)
  console.log("Favorites render");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked)
  );

  const confirmClear = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Semua diary akan dilepas dari daftar favorite. Diary tidak ikut terhapus.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Favorite",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>
      <Text style={styles.counter}>{favoriteEntries.length} diary favorite</Text>

      {favoriteEntries.length > 0 && (
        <Pressable onPress={confirmClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Hapus Semua Favorite</Text>
        </Pressable>
      )}

      <FlatList
        data={favoriteEntries}
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
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada favorite. Tekan ikon hati pada diary di halaman Home
            untuk menambahkannya ke daftar ini.
          </Text>
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
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
  clearButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.danger,
    marginBottom: SPACE.m,
  },
  clearText: {
    color: COLORS.danger,
    fontSize: TYPO.body,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 40,
    paddingHorizontal: SPACE.xl,
    lineHeight: 20,
  },
});