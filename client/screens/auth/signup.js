import React, { useEffect, useState } from 'react';
import { Input , Button,Text} from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View} from 'react-native'
import { register } from '../../Redux/actions/auth';
import { globalStyles } from '../../styles/global';
import { Formik} from 'formik';
import * as yup from 'yup';
import GoogleSignin from './GoogleSigin';

const SignUp = () => {
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
        <View style={globalStyles.container}>
          <GoogleSignin/>
          <Formik 
            initialValues={{name: '', email: '', password: ''}}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
              dispatch(register({ name, email, password }));
            }}
          >
          {(props) => (
            <View>
              <Input
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
              <Input
                style={styles.input}
                placeholder="email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
              <Input
                style={styles.input}
                placeholder="password"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
              <Button
                title='Sign Up'
                onPress={props.handleSubmit}
              />
            </View>
          )}
          </Formik>
        </View>
  );
}
 
const styles = StyleSheet.create({
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default SignUp;