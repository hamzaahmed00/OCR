import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RotationGestureHandler } from "react-native-gesture-handler";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  icon,
  textStyle,
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default AppButton;
