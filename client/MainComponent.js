import React, { /*useEffect,*/ useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GoogleSignin from './GoogleSigin'
import { register } from './Redux/actions/auth';
import axios from 'axios';

const MainComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //mapStateToProps replacement

  const [registerinfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = registerinfo;

  const changeHandler = (item, input) => {
    setRegisterInfo({ ...registerinfo, [input]: item });
    console.log(item);
  };

  const googleLogin = () =>{
    
  }

  return (
    <View style={styles.container}>
      <GoogleSignin/>
      {!isAuthenticated && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={(name) => changeHandler(name, 'name')}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(email) => changeHandler(email, 'email')}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(password) => changeHandler(password, 'password')}
            value={password}
          />
          <Button
            color="coral"
            onPress={() => {
              // console.log('pressed');
              dispatch(register({ name, email, password }));
            }}
            title="Submit"
          />
        </View>
      )}

      {isAuthenticated && <Text>'True'</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});

export default MainComponent;
