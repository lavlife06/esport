import React, { useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Editprofile from './editprofile';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  const {
    followers,
    following,
    // gameinterest,
    bio,
    name,
  } = myprofileinfo.myprofile;
  // const GI =
  //   gameinterest.length > 0
  //     ? gameinterest.join(' ')
  //     : 'No gameinterest provided';

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View
      style={{
        padding: 10,
        borderColor: 'coral',
        borderWidth: 2,
        height: '100%',
      }}
    >
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <Editprofile />
            <Button title="Go Back" onPress={() => setModalOpen(false)} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View
        style={{
          height: '12%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'yellow',
        }}
      ></View>
      <Avatar
        size={60}
        rounded
        overlayContainerStyle={{ backgroundColor: 'black' }}
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
        {/* <Text>
          Gameinterest:<Text>{GI}</Text>
        </Text> */}
      </View>
      <View style={{ position: 'relative', top: '5%' }}>
        <Button title="Edit" onPress={() => setModalOpen(true)} />
      </View>
    </View>
  );
};

export default Profile;
