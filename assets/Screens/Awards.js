import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../../Components/AppText";
import ListItem from "../../Components/ListItem";
import ListItemSeparator from "../../Components/ListItemSeparator";
import colors from "../../config/colors";
import { firebase } from "../../config/config";
import "firebase/firestore";

// const listings = [
//   {
//     id: 1,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 2,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 3,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 4,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 5,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 6,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
//   {
//     id: 7,
//     title: "Store Name",
//     subtitle: "Discount for your next order",
//     total: 38.0,
//   },
// ];

function Awards({ navigation }) {
  const [rewards, setRewards] = useState(true);
  const [listings, setListings] = useState(null);
  const [user, setUser] = useState(null);
  function rewardFunction(points, itemId) {
    if (points > user.data.points) {
      alert("Oops, You don't have enough points");
    } else {
      firebase.firestore().collection("discountDetails").doc(itemId).update({
        reward: false,
      });
      firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update({
          points: user.data.points - points,
        });

      alert("CLAIMED!");
    }
  }

  async function loadListingData() {
    const postRef = await firebase
      .firestore()
      .collection("discountDetails")
      .get();

    let data = [];

    if (rewards) {
      console.log("Rewards True");
      postRef.forEach((doc) => {
        if (doc.data().reward === true)
          data.push({ id: doc.id, data: doc.data() });
      });

      setListings(data);
      return;
    } else if (!rewards) {
      console.log("Rewards False");
      postRef.forEach((doc) => {
        if (doc.data().reward === false)
          data.push({ id: doc.id, data: doc.data() });
      });

      setListings(data);
      return;
    }
  }

  async function loadUserdata() {
    const userRef = await firebase
      .firestore()
      .collection("users")
      .doc("SXiRYjwOlGWQrriDlZn5")
      .get();
    setUser({ id: userRef.id, data: userRef.data() });
  }

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("discountDetails")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          loadListingData();
          loadUserdata();
        } else {
          // it's empty
        }
      });
    return () => {
      unsubscribe();
    };
  }, [firebase, rewards]);

  if (user == null) {
    return <AppText>Please Wait, Loading Data</AppText>;
  } else
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 25 }}>
          <View style={styles.container}>
            <AppText style={{ fontSize: 14 }}>CURRENT POINTS</AppText>
            {user && (
              <AppText style={{ fontSize: 50, fontWeight: "700" }}>
                {user.data.points}
              </AppText>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              height: 54,
              padding: 2,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 8,
              backgroundColor: colors.light,
            }}
          >
            <View
              style={{
                backgroundColor: rewards ? "transparent" : colors.light,
                padding: 5,
                borderRadius: 8,
                borderWidth: rewards ? 1 : 0,
                borderColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setListings(null);
                  setRewards(true);
                }}
              >
                <AppText
                  style={{
                    color: rewards ? colors.primary : colors.black,
                  }}
                >
                  Rewards
                </AppText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: rewards ? colors.light : "transparent",
                padding: 5,
                borderRadius: 8,
                borderWidth: rewards ? 0 : 1,
                borderColor: colors.primary,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setListings(null);
                  setRewards(false);
                }}
              >
                <AppText
                  style={{ color: rewards ? colors.black : colors.primary }}
                >
                  Claimed
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          {listings && (
            <View style={styles.receiptContainer}>
              <FlatList
                data={listings}
                keyExtractor={(listings) => listings.id.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.data.amount}
                    storeName={item.data.storeName}
                    titleStyle={styles.titleStyle}
                    subTitleStyle={styles.subTitleStyle}
                    subTitle="Discount For Your Next Order"
                    onPress={() => console.log("Pressed")}
                    currency={item.data.currency}
                    awardsButton
                    textStyle={rewards ? styles.textStyle : styles.textStyle2}
                    buttonTitle={rewards ? "Claim" : "Show"}
                    awardButtonStyle={
                      rewards ? styles.listButton : styles.listButton2
                    }
                    pointstoClaim={rewards ? item.data.points : false}
                    awardsButtonPress={
                      rewards
                        ? () => rewardFunction(item.data.points, item.id)
                        : () =>
                            navigation.navigate("Code", {
                              ammount: item.data.amount,
                              currency: item.data.currency,
                              qr: item.data.qrContent,
                            })
                    }
                  />
                )}
                ItemSeparatorComponent={ListItemSeparator}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 25,
  },
  receiptContainer: {
    flex: 1,
    marginHorizontal: 11,
    borderColor: colors.light,
    marginTop: 10,
  },
  textStyle: { color: colors.white },
  textStyle2: { color: colors.primary },
  listButton: { width: "30%", borderRadius: 8 },
  listButton2: {
    width: "30%",
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  titleStyle: { fontSize: 30, color: colors.primary, fontWeight: "600" },
  subTitleStyle: { fontSize: 13, fontWeight: "bold", color: colors.black },
});
export default Awards;
