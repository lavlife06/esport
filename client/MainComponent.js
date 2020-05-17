import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GoogleSignin from './GoogleSigin';
import { register } from './Redux/actions/auth';
import { login } from './Redux/actions/auth';
import axios from 'axios';
// import Login from './screens/auth/login';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import SignUp from './screens/auth/signup';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import Login from './screens/auth/login';
import { View } from 'react-native';
import { globalStyles } from './styles/global';
// import AuthNavigator from './routes/authStack'

const MainComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //mapStateToProps replacement

  const [registerinfo, setRegisterInfo] = useState({
    // name: '',
    email: '',
    password: '',
  });

  const { /*name,*/ email, password } = registerinfo;

  const changeHandler = (item, input) => {
    setRegisterInfo({ ...registerinfo, [input]: item });
    // console.log(item);
  };

  return (
    <View style={globalStyles.container}>
      <GoogleSignin />
      {!isAuthenticated && (
        <View style={styles.container}>
          {/* <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={(name) => changeHandler(name, 'name')}
            value={name}
          /> */}
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
              // console.log(name, email, password);
              dispatch(login(email, password));
              dispatch(register({ name, email, password }));
            }}
            title="Submit"
          />
        </View>
      )}

      {isAuthenticated && <Text>'True'</Text>}
    </View>
  );
  const [isReady, setIsReady] = useState(true);
  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <Login />
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
