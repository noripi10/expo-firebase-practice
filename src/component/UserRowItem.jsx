import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const UserRowItem = ({title, value, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{(value || '').toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 3,
  },
  title: {
    backgroundColor: 'skyblue',
    width: '30%',
    padding: 8,
  },
  value: {
    width: '70%',
    padding: 8,
  },
});
