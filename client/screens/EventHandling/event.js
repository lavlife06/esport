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
import Loading from '../../shared/loading';

const Event = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileinfo = useSelector((state) => state.profile);
  const myevents = profileinfo.myprofile.myevents;
  const loading = profileinfo.loading;

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return <Loading />;
  } else {
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
  }
};

export default Event;

// const styles = StyleSheet.create({});
