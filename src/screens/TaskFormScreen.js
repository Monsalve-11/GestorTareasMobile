import { useState } from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";
import { addTask, updTask } from "../api/tasks";

export default function TaskFormScreen({ navigation, route }) {
  const existing = route.params?.task;
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");

  const onSave = async () => {
    if (!title.trim()) {
      Alert.alert("El título es obligatorio");
      return;
    }
    try {
      if (existing) {
        await updTask(existing.id, { title, description });
      } else {
        await addTask({ title, description });
      }
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Error al guardar la tarea");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button
        style={styles.botton}
        title={existing ? "Actualizar" : "Crear"}
        onPress={onSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  botton: {
    backgroundColor: "#077b0a",
  },
});
