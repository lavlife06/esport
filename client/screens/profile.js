import React from 'react';
import { View } from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  console.log(myprofileinfo);
  const { followers, following, gameinterest, bio, name } = myprofileinfo;
  const GI = gameinterest ? gameinterest.join(' ') : 'No gameinterest provided';
  return (
    <View>
      <Avatar
        size="medium"
        overlayContainerStyle={{ backgroundColor: 'yellow' }}
        icon={{ name: 'user', type: 'font-awesome-5' }}
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
        // containerStyle={{ flex: 1 }}
      />
      <Text>{name}</Text>
      <Text>Followers:{followers ? followers.length : 0}</Text>
      <Text>Following:{following ? following.length : 0}</Text>
      <Text>
        About:{bio ? bio : 'Please fill this pepole want to know about you'}
      </Text>
      <Text>Gameinterest:{GI}</Text>
    </View>
  );
};

export default Profile;
