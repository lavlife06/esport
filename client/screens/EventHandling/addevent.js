import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addmyevent } from '../../Redux/actions/event';
import { getCurrentProfile } from '../../Redux/actions/profile';

const eventSchema = yup.object({
  description: yup.string().required(),
  game: yup.string().required(),
  // from: yup.date(),
  // to: yup.date(),
  hours: yup.string(),
  gamelink: yup.string(),
  title: yup.string().required(),
  prizepool: yup.number(),
  teamsize: yup.number(),
});

const Addevent = () => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <Formik
        initialValues={{
          description: '',
          game: '',
          hours: '',
          // from: 0,
          // to: 0,
          prizepool: 0,
          teamsize: 0,
          title: '',
          gamelink: '',
        }}
        validationSchema={eventSchema}
        onSubmit={(values) => {
          dispatch(addmyevent(values));
          // dispatch(getCurrentProfile());
          // values here is an object containing form data
        }}
      >
        {(formikprops) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="game -> e.g. PUBG,COC etc..."
              onChangeText={formikprops.handleChange('game')}
              value={formikprops.values.game}
              onBlur={formikprops.handleBlur('game')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.game && formikprops.errors.game}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="title -> e.g. Your coompany or organization name"
              onChangeText={formikprops.handleChange('title')}
              value={formikprops.values.title}
              onBlur={formikprops.handleBlur('title')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.title && formikprops.errors.title}
            </Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Your game desciption"
              onChangeText={formikprops.handleChange('description')}
              value={formikprops.values.description}
              onBlur={formikprops.handleBlur('description')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.description &&
                formikprops.errors.description}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Hours -> e.g. 3,4,17"
              onChangeText={formikprops.handleChange('hours')}
              value={formikprops.values.hours}
              onBlur={formikprops.handleBlur('hours')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.hours && formikprops.errors.hours}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="prizepool -> e.g. 4000,5000"
              onChangeText={formikprops.handleChange('prizepool')}
              value={formikprops.values.prizepool}
              onBlur={formikprops.handleBlur('prizepool')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.prizepool && formikprops.errors.prizepool}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="teamsize -> e.g. 2,3,4,16"
              onChangeText={formikprops.handleChange('teamsize')}
              value={formikprops.values.teamsize}
              onBlur={formikprops.handleBlur('teamsize')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.teamsize && formikprops.errors.teamsize}
            </Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="gamelink -> e.g. your website where player visits and get more details"
              onChangeText={formikprops.handleChange('gamelink')}
              value={formikprops.values.gamelink}
              onBlur={formikprops.handleBlur('gamelink')}
            />
            <Text style={styles.errorText}>
              {formikprops.touched.gamelink && formikprops.errors.gamelink}
            </Text>
            <Button onPress={formikprops.handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Addevent;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
    fontSize: 18,
    borderRadius: 6,
    color: 'black',
  },
  errorText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 6,
    textAlign: 'center',
  },
});
