import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';

const Home = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
