import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from '../screens/setting';

const Stack = createStackNavigator()

const AuthStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Setting'
        component={Setting}
      />
    </Stack.Navigator>
  );
}
 
export default AuthStack;