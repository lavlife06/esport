import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import { View } from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import { useSelector, useDispatch } from 'react-redux';
import DrawerStack from './routes/drawerStack';
import Alert from './shared/alert';
import { AsyncStorage } from 'react-native';
import setAuthToken from './Redux/setAuthToken';
import { loadUser } from './Redux/actions/auth';

const MainComponent = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token')
      setAuthToken(token);
      // dispatch(loadUser());
      console.log('App refreshed');
    }
    userLoad()
  }, [setAuthToken]);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <Alert />
          {!isAuthenticated ? (
            <AuthStack/>
          ): (
            <DrawerStack/>
          )}
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
