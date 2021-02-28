import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import AppText from "../../Components/AppText";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QRCode } from "react-native-custom-qr-codes-expo";

const address =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png";

function CodeScreen({ navigation, route }) {
  const d = route.params;
  return (
    <SafeAreaView>
      <MaterialCommunityIcons
        name="chevron-left"
        size={40}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <AppText style={{ fontSize: 35, color: colors.medium }}>
          Store Logo
        </AppText>
      </View>
      <View style={styles.containerHeading}>
        <AppText style={styles.headingStyle}>
          Discount For Your Next Order
        </AppText>
        <AppText style={styles.amountStyle}>
          {d.ammount}
          <AppText style={{ fontWeight: "100", fontSize: 25 }}>
            {d.currency}
          </AppText>
        </AppText>
      </View>
      <View style={styles.imageContainer}>
        <QRCode content={d.qr} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    width: "70%",
    alignSelf: "center",
    height: "15%",
    borderRadius: 10,
  },
  containerHeading: {
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  headingStyle: { fontWeight: "500" },
  amountStyle: { fontWeight: "800", fontSize: 50 },
  imageContainer: {
    width: "80%",
    height: "45%",
    backgroundColor: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: colors.medium,
  },
  image: { aspectRatio: 1 },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
  },
});
export default CodeScreen;
