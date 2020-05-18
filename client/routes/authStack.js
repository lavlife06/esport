import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import Home from '../screens/home';
import TabStack from './tabStack';
import { useSelector, useDispatch } from 'react-redux';
const Stack = createStackNavigator()

const AuthStack = () => {
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  return (
    // <NavigationContainer>
      <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name='Auth'
          component={Login}
        />
      ): (
        <Stack.Screen
          name='Home'
          component={TabStack}
        />
      )}
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
 
export default AuthStack;