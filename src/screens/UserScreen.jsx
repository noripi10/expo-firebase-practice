import React, {useContext} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {Avatar, Header, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {UserRowItem} from '../component/UserRowItem';
import {UserContext} from '../context/UserContext';
import {signOut} from '../util/firebase';

import {AppButton} from '../component/AppButton';

export const UserScreen = ({}) => {
  const {user, setUser} = useContext(UserContext);

  const signOutHandler = async () => {
    const result = await signOut();
    if (result) {
      setUser(null);
      Alert.alert('ログアウトしました');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{text: 'ユーザー情報'}}
        rightComponent={{
          text: 'ログアウト',
          onPress: () => signOutHandler(),
        }}
      />
      <View style={styles.mainContainer}>
        <Avatar
          rounded
          size="large"
          icon={{name: 'user', type: 'font-awesome'}}
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: '#ddd',
            margin: 5,
          }}
          source={{uri: user.photoURL}}
        />
        <AppButton
          title="AppButton"
          onPress={() => alert('click')}
          loading={false}
          type="outline"
        />
        <ScrollView style={styles.userItems}>
          {Object.keys(user).map((key, index) => (
            <UserRowItem
              key={key}
              style={styles.userItem}
              number={index}
              title={key}
              value={user[key]}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItems: {
    // flex: 1,
    // backgroundColor: 'yellow',
  },
  userItem: {
    marginLeft: 8,
    flexWrap: 'wrap',
  },
});
