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
import ContactsList from './components/ContactList';

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
  //Below a second parameter was passed to the request method so to customized the 'accept' or 'reject' button
  /*
    const status = await PermissionsAndroid.request(permission, {
      title: 'Contacts',
      message: 'Cydene would like to access your contacts.',
      buttonPositive: 'Accept',
      buttonNegative: 'Don\'t',
    });
    return status === 'granted';
  }
  */

  //load contact works
  const loadContacts = async () => {
    if (await hasAndroidPermission()) {
      Contacts.getAll().then(contacts => {
        setContacts(contacts);
        console.log(contacts);
      });
    }
    return;
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const aContactItem = {
    phoneNumbers: [
      {id: '180976', label: 'mobile', number: '0803 101 2115'},
      {id: '181031', label: 'mobile', number: '08031012115'},
    ],
    isStarred: false,
    postalAddresses: [],
    thumbnailPath: '',
    department: '',
    jobTitle: '',
    emailAddresses: [],
    urlAddresses: [],
    suffix: null,
    company: '',
    imAddresses: [],
    note: '',
    middleName: '',
    displayName: 'Dr. Stone Lion',
    familyName: 'Lion',
    givenName: 'Dr. Stone',
    prefix: null,
    hasThumbnail: false,
    rawContactId: '61079',
    recordID: '63130',
  };

  /*

  */

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
        <Text>CONTACTS</Text>

        {contacts && <ContactsList contacts={contacts} />}
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
