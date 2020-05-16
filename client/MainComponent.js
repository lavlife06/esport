import React, { useEffect, useState } from 'react';
// import Login from './screens/auth/login';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import SignUp from './screens/auth/signup';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import AuthNavigator from './routes/authStack'

const MainComponent = () => {
  const [isReady ,setIsReady] = useState(true)
  if(!isReady){
    return <AppLoading/>
  }
  else{
    return (
      <ThemeProvider theme={theme}>
        <AuthNavigator/>
      </ThemeProvider>
    );
  }
};



export default MainComponent;
