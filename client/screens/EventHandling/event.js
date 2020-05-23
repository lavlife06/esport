// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
// import { addmyevent } from '../../Redux/actions/event';
import Addevent from './addevent';
import Events from './events';

const Event = ({ navigation }) => {
  const dispatch = useDispatch();
  const myevents = useSelector((state) => state.profile.myprofile.myevents);

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <FlatList
        data={myevents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Events item={[item]} />}
      />
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <Addevent navigation={navigation} />
            <Button title="Go Back" onPress={() => setModalOpen(false)} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Button title="Add Event" onPress={() => setModalOpen(true)} />
    </View>
  );
};

export default Event;

// const styles = StyleSheet.create({});
