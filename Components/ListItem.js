import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import AppText from "../Components/AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppButton from "./AppButton";

function ListItem({
  total,
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  renderLeftActions,
  style,
  badge = false,
  count = 0,
  imageStyle,
  chevron,
  settingIcon,
  onSettingPress,
  awardsButton,
  awardsButtonPress,
  awardButtonStyle,
  subTitleStyle,
  titleStyle,
  storeName,
  currency,
  currency1,
  buttonTitle,
  textStyle,
  pointstoClaim,
}) {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
    >
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && (
            <Image style={[styles.image, imageStyle]} source={{ uri: image }} />
          )}
          <View style={[styles.detailsContainer]}>
            {storeName && (
              <AppText
                style={{
                  fontSize: 12,
                  marginLeft: Dimensions.get("window").width / 3,
                }}
              >
                {storeName}
              </AppText>
            )}

            <AppText style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
              {currency && (
                <AppText
                  style={{
                    color: colors.primary,
                    fontWeight: "100",
                    fontSize: 14,
                  }}
                >
                  {currency}
                </AppText>
              )}
            </AppText>
            {subTitle && (
              <AppText
                style={[styles.subTitle, subTitleStyle]}
                numberOfLines={2}
              >
                {subTitle}
              </AppText>
            )}
            {pointstoClaim && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "150%",
                  justifyContent: "flex-end",
                }}
              >
                <MaterialCommunityIcons
                  name="circle-outline"
                  color="#FCB514"
                  size={15}
                />
                <AppText
                  style={{ fontSize: 15, marginLeft: 10, fontWeight: "700" }}
                >
                  {pointstoClaim} Points to Claim
                </AppText>
              </View>
            )}
          </View>
          {count > 0 && <AppText>In Cart: {count}</AppText>}
          {total && (
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {total}
              {currency1}
            </AppText>
          )}
          {chevron && (
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-right"
              size={25}
            ></MaterialCommunityIcons>
          )}
          {awardsButton && (
            <AppButton
              title={buttonTitle}
              style={awardButtonStyle}
              onPress={awardsButtonPress}
              textStyle={textStyle}
            ></AppButton>
          )}
          {settingIcon && (
            <MaterialCommunityIcons
              onPress={onSettingPress}
              color={colors.primary}
              name="lead-pencil"
              size={25}
            ></MaterialCommunityIcons>
          )}
          {badge && (
            <View
              style={{
                backgroundColor: colors.light,
                alignItems: "center",
                padding: 10,
                borderRadius: 50,
                borderColor: colors.primary,
                borderWidth: 2,
              }}
            ></View>
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 13,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
