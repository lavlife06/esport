import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../Redux/actions/profile';

const reviewSchema = yup.object({
  name: yup.string().required().min(4),
  bio: yup.string(),
  gameinterest: yup.string(),
});

const Editprofile = () => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile.myprofile);
  const { name, bio } = myprofileinfo;

  useEffect(() => {
    if (!myprofileinfo) {
      dispatch(getCurrentProfile());
    }
  }, [myprofileinfo, getCurrentProfile]);

  if (myprofileinfo) {
    return (
      <View
        style={{
          // flex: 1,
          padding: 15,
          // backgroundColor: 'lightgreen',
        }}
      >
        <Formik
          initialValues={{ name, bio }}
          validationSchema={reviewSchema}
          onSubmit={(values) => {
            dispatch(createProfile(values));
            // values here is an object containing form data
          }}
        >
          {(formikprops) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder={name ? name : 'Username'}
                onChangeText={formikprops.handleChange('name')}
                value={formikprops.values.name}
                onBlur={formikprops.handleBlur('name')}
              />
              <Text style={styles.errorText}>
                {formikprops.touched.name && formikprops.errors.name}
              </Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder={bio ? bio : 'Your Bio'}
                onChangeText={formikprops.handleChange('bio')}
                value={formikprops.values.bio}
                onBlur={formikprops.handleBlur('bio')}
              />
              <Text style={styles.errorText}>
                {formikprops.touched.bio && formikprops.errors.bio}
              </Text>
              <Button onPress={formikprops.handleSubmit} title="Save" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: 'black',
  },
  errorText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default Editprofile;
