import React, { useEffect, useState } from 'react';
import { Input , Button,Text, Overlay, Icon} from 'react-native-elements';
import {MaterialIcons} from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View} from 'react-native'
import { register } from '../../Redux/actions/auth';
import { Formik} from 'formik';
import * as yup from 'yup';
// import GoogleSignin from './GoogleSigin';

const SignUp = ({visible,setVisible}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  
  const signUpSchema = yup.object({
    name: yup.string()
      .required()
      .min(4),
    email: yup.string()
      .required()
      .email(),
    password: yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
  })

  return (
    <Overlay overlayStyle={styles.overlay} isVisible={visible} animationType='fade'>
      <View>
        <MaterialIcons 
          name='close'
          size={24}
          style={styles.modalClose}
          onPress={() => setVisible(false)}
        />
      </View>
      <Formik 
        initialValues={{name: '', email: '', password: ''}}
        validationSchema={signUpSchema}
        onSubmit={({ name, email, password }) => {
          dispatch(register({ name, email, password }));
        }}
      >
      {(props) => (
        <View>
          <Input
            leftIcon={<Icon name='face' size={24} color='black' />}
            placeholder="Enter your name"
            onChangeText={props.handleChange('name')}
            value={props.values.name}
            onBlur={props.handleBlur('name')}
            errorMessage={props.touched.name && props.errors.name}
          />
          <Input
            leftIcon={<Icon name='email' size={24} color='black' />}
            placeholder="Email"
            onChangeText={props.handleChange('email')}
            value={props.values.email}
            onBlur={props.handleBlur('email')}
            errorMessage={props.touched.email && props.errors.email}
          />
          <Input
            leftIcon={<Icon name='lock' size={24} color='black' />}
            secureTextEntry={true} 
            placeholder="Password"
            onChangeText={props.handleChange('password')}
            value={props.values.password}
            onBlur={props.handleBlur('password')}
            errorMessage={props.touched.password && props.errors.password}
          />
          <Button
            title='Sign Up'
            buttonStyle={styles.button}
            onPress={props.handleSubmit}
          />
        </View>
      )}
      </Formik>
    </Overlay>
  );
}
 
const styles = StyleSheet.create({
  errorText: {
    marginTop: 0,
    color: 'crimson',
    textAlign: 'center'
  },
  overlay: {
    width: 300,
    // height: 100
  },
  
  modalClose: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  button:{
    marginTop: 10,
  }, 
});

export default SignUp;

  