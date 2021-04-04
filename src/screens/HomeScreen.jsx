import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {UserContext} from '../context/UserContext';
import {logEvent} from '../util/firebase';

export const HomeScreen = ({}) => {
  const {user} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View>
        <Text>home</Text>
        <Button
          title="logEvent"
          onPress={() => logEvent('home_button_click', {uid: user.uid})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    padding: 15,
    margin: 8,
    backgroundColor: 'skyblue',
    borderRadius: 8,
  },
});
