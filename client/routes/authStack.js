import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import UserDetail from '../screens/userDetail/userDetail';
const Stack = createStackNavigator()

const AuthRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Auth'
          component={Login}
        />
        <Stack.Screen
          name='Your Detail'
          component={UserDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default AuthRoute;