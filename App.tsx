/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const init = () => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   });
  //   // .then(
  //   //   Contacts.getAll()
  //   //     .then(contacts => {
  //   //       // work with contacts
  //   //       console.log(contacts);
  //   //     })
  //   //     .catch(e => {
  //   //       console.log(e);
  //   //     }),
  //   // );
  //   Contacts.getAll().then(contacts => {
  //     // contacts returned
  //     console.log(contacts);
  //   });
  // };
  // init();

  const [contacts, setContacts] = useState<any>([]);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      console.log('has permission');
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  // hasAndroidPermission();

  //load contact works
  const loadContacts = async () => {
    await Contacts.getAll().then(contacts => {
      setContacts(contacts);
      console.warn(contacts);
    });
    if (await hasAndroidPermission()) {
      Contacts.getAll().then(contacts => {
        setContacts(contacts);
        console.warn(contacts);
      });
    }
    return;
  };

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    loadContacts();
  }, [hasAndroidPermission]);

  //getContacts works
  const getAllContact = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'Cydene would like to access your contacts.',
      buttonPositive: 'Please accept bare mortal',
    });
    loadContacts();
    // .then(Contacts.getAll)
    // .then(contacts => {
    //   console.warn('???>>>>> contactsssss', contacts);
    // });
  };
  getAllContact();

  useEffect(() => {
    const getCon = async () => {
      console.log('statt get contacts');
      const allContant = await Contacts.getAll();
      console.error('allContact', allContant);
    };

    getCon();
    getAllContact();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Hello world</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
