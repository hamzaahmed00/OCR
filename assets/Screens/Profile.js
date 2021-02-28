import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../../Components/AppText";
import ListItem from "../../Components/ListItem";
import colors from "../../config/colors";
import { firebase } from "../../config/config";
import "firebase/firestore";

const address =
  "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

function Profile(props) {
  const [activity, setActivity] = useState(true);
  const [user, setUser] = useState(false);
  async function loaddata() {
    const userRef = await firebase
      .firestore()
      .collection("users")
      .doc("SXiRYjwOlGWQrriDlZn5")
      .get();
    setUser({ id: userRef.id, data: userRef.data() });
  }

  useEffect(() => {
    loaddata();
  }, []);
  return (
    <SafeAreaView>
      {user && (
        <View style={{ margin: 20 }}>
          <ListItem
            imageStyle={{ height: 120, width: 120, borderRadius: 25 }}
            image={address}
            title={user.data.Name}
            subTitle={user.data.email}
          />
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setActivity(true)}
          style={{
            width: "50%",
            alignItems: "center",
            borderBottomColor: activity ? colors.primary : colors.light,
            borderBottomWidth: 2,
          }}
        >
          <AppText style={styles.text}>My activities</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActivity(false)}
          style={{
            width: "50%",
            alignItems: "center",
            borderBottomColor: activity ? colors.light : colors.primary,
            borderBottomWidth: 2,
          }}
        >
          <AppText style={styles.text}>Account Settings</AppText>
        </TouchableOpacity>
      </View>
      {activity && (
        <View>
          <ListItem
            title="Purchase"
            subTitle="Mon. 19 Nov 2021"
            total="+ 730"
          />
          <ListItem title="Claimed" subTitle="Mon. 19 Nov 2021" total="+ 36" />
          <ListItem
            title="Purchase"
            subTitle="Mon. 19 Nov 2021"
            total="+ 730"
          />
        </View>
      )}
      {!activity && user && (
        <View>
          <ListItem title="Name" total={user.data.Name} />
          <ListItem title="Surname" total={user.data.surname} />
          <ListItem title="Email" total={user.data.email} />
          <ListItem title="Phone" total={user.data.phone} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 25,

    paddingBottom: 5,
  },

  buttons1: {
    width: "50%",
    alignItems: "center",
    borderBottomWidth: 2,
  },
  buttons2: {
    width: "50%",
    alignItems: "center",
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Profile;
