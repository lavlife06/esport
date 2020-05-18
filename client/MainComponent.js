import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import { View } from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import { useSelector } from 'react-redux';
import TabStack from './routes/tabStack';
import DrawerStack from './routes/drawerStack';

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
