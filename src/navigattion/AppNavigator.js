import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import TaskFormScreen from "../screens/TaskFormScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Mis Tareas" }}
        />
        <Stack.Screen
          name="Form"
          component={TaskFormScreen}
          options={{ title: "Crear / Editar Tarea" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
