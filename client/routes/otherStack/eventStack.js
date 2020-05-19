import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Events from '../../screens/events';
import Header from '../../shared/header';

const Stack = createStackNavigator()

const EventStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Events'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='Events'/>,
        })}
        component={Events}
      />
    </Stack.Navigator>
  );
}
 
export default EventStack;