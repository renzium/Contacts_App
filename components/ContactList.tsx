import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import Contact from './Contact';

const ContactsList = ({contacts}: any) => {
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx?.toString();
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default ContactsList;
