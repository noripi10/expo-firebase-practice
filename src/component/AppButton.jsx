import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export const AppButton = (props) => {
  return (
    <Button
      style={styles.button}
      titleStyle={styles.buttonContainer}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 160,
  },
  buttonContainer: {
    fontSize: 18,
    // textTransform: 'uppercase',
  },
});
