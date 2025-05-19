import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { delTask, getTasks, updTask } from "../api/tasks";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchTasks();
  }, [isFocused]);

  const toggleDone = async (task) => {
    await updTask(task.id, { done: !task.done });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await delTask(id);
    fetchTasks();
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleDone(item)}>
              <Text style={[styles.titleText, item.done && styles.titleDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {item.description ? (
              <Text style={styles.descriptionText}>{item.description}</Text>
            ) : null}
            <View style={styles.buttonsContainer}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate("Form", { task: item })}
              />
              <Button
                title="Eliminar"
                color="red"
                onPress={() => removeTask(item.id)}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Form")}
        style={styles.fab}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  titleText: {
    fontSize: 16,
    textDecorationLine: "none",
  },
  titleDone: {
    textDecorationLine: "line-through",
  },
  descriptionText: {
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 60,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#077b0a",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
  },
});
