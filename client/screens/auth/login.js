import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Login = () => {
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});

export default Login;