import React, { useEffect, useState } from 'react';
import { Input , Button, Text, Icon} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {StyleSheet, View} from 'react-native'
import { login } from '../../Redux/actions/auth';
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

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const checkError = async () => {
    const user = await auth.payload;
    if(user.length < 100){
      setError(user)
    }
  }

  return (
    <View style={styles.container}>
      <SignUp visible={visible} setVisible={setVisible} navigation={navigation}/>
      <Formik 
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={async ({email, password}) => {
          dispatch(login(email, password));
          await checkError()
          console.log(isAuthenticated)
          if(isAuthenticated) navigation.navigate('Home')
          
        }}
      >
      {(props) => (
        <View>
          <Input
            leftIcon={<Icon name='email' size={24} color='#4ecca3' />}
            style={styles.input}
            placeholder="Email"
            onChangeText={props.handleChange('email')}
            value={props.values.email}
            onBlur={props.handleBlur('email')}
            errorMessage={props.touched.email && props.errors.email }
          />

          <Input
            leftIcon={<Icon name='lock' size={24} color='#4ecca3' />}
            secureTextEntry={true} 
            style={styles.input}
            placeholder="Password"
            onChangeText={props.handleChange('password')}
            value={props.values.password}
            onBlur={props.handleBlur('password')}
            errorMessage={props.touched.password && props.errors.password}
          />
          <Text style={styles.errorText}>{error}</Text>
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
          <Text onPress={toggleOverlay} style={{color: '#4ecca3'}}>{' '}Sign Up</Text>
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
  button:{
    marginHorizontal: 40,
    marginVertical: 40,
    width: 100,
    alignSelf: 'center',
    marginTop: 5,
  },  
  errorText: {
    color: 'crimson',
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3
  },
});

export default Login;