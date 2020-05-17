import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/login'
import SignUp from '../screens/auth/signup';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          // options={({ navigation, route }) => ({
          //   headerTitle: () => <Header navigation={navigation} title='About GameZone'/>,
          // })}
          component={Login} 
        />
        <Stack.Screen 
          name="Sign Up"
          // options={({ navigation, route }) => ({
          //   headerTitle: () => <Header navigation={navigation} title='About GameZone'/>,
          // })}
          component={SignUp} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default AuthNavigator;