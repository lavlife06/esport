import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Editprofile from './editprofile';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { addmyevent } from '../Redux/actions/event';
import Loading from '../shared/loading';
import { getCurrentProfile } from '../Redux/actions/profile';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  const loading = myprofileinfo.loading;
  const { followers, following, bio, name, myevents } = myprofileinfo.myprofile;

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!myprofileinfo.myprofile) {
      dispatch(getCurrentProfile);
      console.log('getCurrentProfile triggerred from profile screen');
    }
  }, [getCurrentProfile]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View
        style={{
          padding: 10,
          borderColor: 'coral',
          borderWidth: 2,
          height: '100%',
        }}
      >
        <Modal
          style={styles.overlay}
          isVisible={modalOpen}
          backdropColor="#3e3f42"
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          animationInTiming={200}
          animationOutTiming={200}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackButtonPress={() => setModalOpen(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
              <Editprofile />
            </ScrollView>
          </TouchableWithoutFeedback>
        </Modal>
        <View
          style={{
            padding: 10,
            borderColor: 'coral',
            borderWidth: 2,
            height: '100%',
          }}
        >
          <View
            style={{
              height: '12%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'gray',
            }}
          ></View>
          <Avatar
            size={60}
            rounded
            overlayContainerStyle={{ backgroundColor: 'black' }}
            size="medium"
            overlayContainerStyle={{ backgroundColor: 'violet' }}
            icon={{ name: 'user', type: 'font-awesome-5' }}
            onPress={() => console.log('Works!')}
            activeOpacity={1}
            containerStyle={{
              position: 'absolute',
              top: '6%',
              left: '44%',
              // alignItems: 'center',
            }}
          />
          <View style={{ position: 'relative', top: '5%' }}>
            <View style={{ alignItems: 'center' }}>
              <Text>{name}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>
                Followers:<Text>{followers ? followers.length : 0}</Text>
              </Text>
              <Text>
                Following:<Text>{following ? following.length : 0}</Text>
              </Text>
            </View>
            <Text>
              About:
              <Text>
                {bio ? bio : 'Please fill this pepole want to know about you'}
              </Text>
            </Text>
          </View>
          <View style={{ position: 'relative', top: '5%' }}>
            <Button title="Edit" onPress={() => setModalOpen(true)} />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
  },
});

export default Profile;
