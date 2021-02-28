import React, { useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Awards from "../assets/Screens/Awards";
import Receipts from "../assets/Screens/Receipts";
import Profile from "../assets/Screens/Profile";
import { Dimensions } from "react-native";
import AwardNavigator from "./AwardNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        tabStyle: { backgroundColor: "black" },
        labelStyle: { fontSize: 12, fontWeight: "400", marginBottom: 20 },
        safeAreaInsets: { bottom: 0 },
        style: { height: Dimensions.get("window").height / 12 },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="text-box-outline"
            />
          ),
        }}
        name="Receipts"
        component={Receipts}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} size={size} name="medal" />
          ),
        }}
        name="Awards"
        component={AwardNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="account-outline"
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
