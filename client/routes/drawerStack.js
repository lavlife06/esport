import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './tabStack';
import SettingStack from './otherStack/settingStack';
import Home from '../screens/home';
import HomeStack from './otherStack/homeStack';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Home" component={AuthStack} />
        <Drawer.Screen name="Setting" component={Setting} /> */}
        {/* <Drawer.Section >
        <Drawer.Item
          label="Logout"
          onPress={() => { 
            
            navigation.navigate('Login') 
            }}
        />
     </Drawer.Section> */}
        <Drawer.Screen name="Home" component={TabStack} />
        <Drawer.Screen name="Setting" component={SettingStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
