import React, { useEffect, useState } from 'react';
import { Input , Button, Text, Icon} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View} from 'react-native'
import { register } from '../../Redux/actions/auth';
import { globalStyles } from '../../styles/global';
import { Formik} from 'formik';
import * as yup from 'yup'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SignUp from './signup';

const LoginSchema = yup.object({
  email: yup.string()
    .required()
    .email(),
  password: yup.string()
    .required('No password provided.') 
})

const Login = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <SignUp visible={visible} setVisible={setVisible}/>
      <Formik 
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={({email, password}) => {
          console.log(values)
          dispatch(login(email, name));
        }}
      >
      {(props) => (
        <View>
          <Input
            leftIcon={<Icon name='email' size={24} color='black' />}
            style={styles.input}
            placeholder="Email"
            onChangeText={props.handleChange('email')}
            value={props.values.email}
            onBlur={props.handleBlur('email')}
            errorMessage={props.touched.email && props.errors.email}
          />

          <Input
            leftIcon={<Icon name='lock' size={24} color='black' />}
            secureTextEntry={true} 
            style={styles.input}
            placeholder="Password"
            onChangeText={props.handleChange('password')}
            value={props.values.password}
            onBlur={props.handleBlur('password')}
            errorMessage={props.touched.password && props.errors.password}
          />
          <Button
            title='Login'
            buttonStyle={styles.button}
            onPress={props.handleSubmit}
          />
        </View>
      )}
      </Formik>
      <View style={{flexDirection:'row'}}>
        <Text>
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text onPress={toggleOverlay} style={{color: '#5c9aff'}}>{' '}Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  button:{
    marginTop: 20,
    marginHorizontal: 40,
    marginVertical: 40,
  },  
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Login;