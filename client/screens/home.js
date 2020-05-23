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

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token);
      // dispatch(loadUser());
      if (token) {
        dispatch(fetchallevents());
        console.log('token verified by fetchallevents');
      }
      console.log('Home Page refreshed');
    };
    userLoad();
  }, [loadUser, fetchallevents]);

  return (
    <View>
      {allevents && (
        <FlatList
          data={allevents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Events item={[item]} />}
        />
      )}
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
};

export default Home;
