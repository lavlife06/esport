import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../Redux/actions/profile';
import Loading from '../shared/loading';
import { Button, Input } from 'react-native-elements';

const profileSchema = yup.object({
  name: yup.string().required().min(4),
  bio: yup.string(),
  gameinterest: yup.string(),
});

const Editprofile = () => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  const loading = myprofileinfo.loading;
  const { bio, name } = myprofileinfo.myprofile;

  useEffect(() => {
    if (!myprofileinfo) {
      dispatch(getCurrentProfile());
    }
  }, [myprofileinfo, getCurrentProfile]);

  if (!myprofileinfo) {
    return <Loading />;
  } else {
    return (
      <View
        style={styles.content}
      >
        <Formik
          initialValues={{ name, bio }}
          validationSchema={profileSchema}
          onSubmit={(values) => {
            dispatch(createProfile(values));
            // values here is an object containing form data
          }}
        >
          {(formikprops) => (
            <View>
              <Input
                style={styles.input}
                placeholder={name ? name : 'Username'}
                onChangeText={formikprops.handleChange('name')}
                value={formikprops.values.name}
                onBlur={formikprops.handleBlur('name')}
                errorMessage={formikprops.touched.name && formikprops.errors.name}
              />
              <Input
                style={styles.input}
                multiline
                placeholder={bio ? bio : 'Your Bio'}
                onChangeText={formikprops.handleChange('bio')}
                value={formikprops.values.bio}
                onBlur={formikprops.handleBlur('bio')}
                errorMessage={formikprops.touched.bio && formikprops.errors.bio}
              />
              
              <Button onPress={formikprops.handleSubmit} title="Save" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
};

const styles = StyleSheet.create({

  content: {
    backgroundColor: 'white',
    padding: 22,
    borderTopStartRadius:30,
    borderTopEndRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});

export default Editprofile;
