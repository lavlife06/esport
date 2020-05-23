import React, { useEffect } from 'react';
import { View, Button, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';
import { AsyncStorage } from 'react-native';
import { fetchallevents } from '../Redux/actions/event';
import Events from './EventHandling/events';
import setAuthToken from '../Redux/setAuthToken';

const Home = () => {
  const dispatch = useDispatch();

  

  const allevents = useSelector((state) => state.event.allevents);

  return (
    <View>
      <FlatList
        data={allevents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Events item={[item]} />}
      />
    </View>
  );
};

export default Home;
