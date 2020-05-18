import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import Login from './screens/auth/login';
import { View } from 'react-native';
import { globalStyles } from './styles/global';
import AuthRoute from './routes/authStack';

const MainComponent = () => {
  const [isReady, setIsReady] = useState(true);
  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <AuthRoute/>
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
