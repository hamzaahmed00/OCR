import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../../Components/AppText";
import ListItem from "../../Components/ListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemSeparator from "../../Components/ListItemSeparator";
import colors from "../../config/colors";
import { Camera } from "expo-camera";

import { encode } from "base-64";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../config/config";
import "firebase/firestore";

// const listings = [
//   {
//     id: 1,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 2,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 3,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 4,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 5,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 6,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 7,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 8,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 9,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 10,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
//   {
//     id: 11,
//     title: "Store Name",
//     subtitle: "27 Jan 2021",
//     total: 38.0,
//   },
// ];

function Receipts(props) {
  const storageRef = firebase.storage().ref();
  const [hasPermission, setHasPermission] = useState(null);
  const [listings, setListings] = useState();

  async function loaddata() {
    const postRef = await firebase
      .firestore()
      .collection("receiptDetails")
      .orderBy("time", "desc")
      .get();
    setListings(postRef.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
  }

  async function getPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("receiptDetails")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          loaddata();
          getPermission();
        } else {
          // it's empty
        }
      });
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  const takePicture = () => {
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    }).then(async (response) => {
      if (response.cancelled) console.log("No Picture Taken");
      else {
        console.log(response.uri);
        UriToBlob(response.base64, response.uri);
      }
    });
  };

  const UriToBlob = (base64, uri) => {
    return new Promise(async (resolve, reject) => {
      const fileExtension = uri.split(".").pop();
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };

        xhr.onerror = function () {
          reject(new Error("uriToBlob failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);

        xhr.send(null);
      });
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 100000);
      uploadToFirebase(blob, fileExtension, time, random).then(async (t) => {
        startOCR(base64, time, random);
        resolve(blob);
      });
    });
  };

  const uploadToFirebase = (blob, fileExtension, time, random) => {
    return new Promise((resolve, reject) => {
      storageRef
        .child(`Receipts/uploads/${time}/${random}.${fileExtension}`)
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();

          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const startOCR = (url, time, random) => {
    var photo = {
      requests: [
        {
          image: {
            content: url,
          },
          features: [
            {
              type: "DOCUMENT_TEXT_DETECTION",
            },
          ],
        },
      ],
    };
    var data = new FormData();
    data.append("file", photo);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", async function () {
      console.log(this.readyState);
      if (this.readyState === this.DONE) {
        var obj = await JSON.parse(this.responseText);
        console.log(obj.responses);

        var data = await JSON.parse(JSON.stringify(obj.responses));
        const db = await firebase.firestore().collection("receipts");
        db.add({
          userId: "SXiRYjwOlGWQrriDlZn5",
          data: data,
        });
      }
    });

    //////Key Change here!!
    xhr.open(
      "POST",
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBblEpVbPf3CVxcjnyxMuoARAXe_liWLrw"
    );

    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(photo));
    xhr.send(JSON.stringify(photo));
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 25 }}>
          <View style={styles.header}>
            <AppText style={styles.heading}>Receipts</AppText>
            <MaterialCommunityIcons name="filter" size={30} />
          </View>
          <View style={styles.receiptContainer}>
            <FlatList
              data={listings}
              keyExtractor={(listings) => listings.id.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.data.storeName}
                  currency1={item.data.currency}
                  subTitle={new Date(
                    item.data.time.seconds * 1000
                  ).toDateString()}
                  chevron
                  total={item.data.ammount}
                  onPress={() => console.log("Pressed")}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
            <MaterialCommunityIcons
              size={40}
              name="qrcode-scan"
              color="white"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  receiptContainer: {
    flex: 1,
    marginHorizontal: 11,
    borderColor: colors.light,
    shadowColor: colors.medium,
    shadowOpacity: 0.1,
  },
  container: {
    flex: 1,
    zIndex: 1,
  },
  camera: {
    flex: 0.7,
    zIndex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  buttonCameraCancel: {
    backgroundColor: "tomato",
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "absolute",
    top: 30,
  },
  buttonTakePicture: {
    width: 90,
    height: 90,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: Dimensions.get("window").width / 3,
    bottom: 30,
  },
});

export default Receipts;
