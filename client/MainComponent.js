import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import Login from './screens/auth/login';
import { View } from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import DrawerStack from './routes/drawer';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const MainComponent = () => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const [isReady, setIsReady] = useState(true);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          {isAuthenticated ? (
            <DrawerStack/>
          ): (
            <NavigationContainer>
              <AuthStack/>
            </NavigationContainer>
          )}
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
