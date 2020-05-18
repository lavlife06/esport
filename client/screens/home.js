import React, { useEffect } from 'react';
import { View } from "react-native";
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../Redux/actions/auth';
const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state=> state.auth);
  useEffect(()=>{
    dispatch(loadUser);
  },[])
  return (
    <View>
      <Text>
        Home Screen
      </Text>
    </View>
  );
}
 
export default Home;