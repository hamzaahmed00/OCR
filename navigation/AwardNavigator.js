import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Awards from "../assets/Screens/Awards";
import CodeScreen from "../assets/Screens/CodeScreen";

const Stack = createStackNavigator();

const AwardNavigator = () => (
  <Stack.Navigator mode="card" headerMode="none">
    <Stack.Screen name="Awards" component={Awards} />
    <Stack.Screen name="Code" component={CodeScreen} />
  </Stack.Navigator>
);

export default AwardNavigator;
