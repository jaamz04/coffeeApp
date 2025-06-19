import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, CommonActions } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  // Logout function (no AsyncStorage used)
  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace with your Login screen name
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backArrow}
      >
        <Icon name="chevron-left" size={24} color="#592B1F" />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Profile</Text>

        {/* Profile Section */}
        <View style={styles.profileSection}>
              <Image
                source={require('../assets/profile.jpg')}
                style={styles.avatar}
              />
              <View style={styles.profileText}>
                <Text style={styles.username}>John Doe</Text>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:john.doe@gmail.com')}>
                  <Text style={styles.email}>john.doe@gmail.com</Text>
                </TouchableOpacity>
              </View>
            </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <SettingButton icon="user" label="Personal Information" />
          <SettingButton icon="paint-brush" label="Theme" />
          <SettingButton icon="globe" label="Language" />
          <SettingButton icon="bell" label="Notification" />
          <SettingButton icon="question-circle" label="Help" />
          <SettingButton icon="lock" label="Update Password" />
          <SettingButton icon="cog" label="Settings" />
          <SettingButton icon="power-off" label="Logout" danger onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
};

const SettingButton = ({ icon, label, danger, onPress }) => (
  <TouchableOpacity
    style={[styles.button, danger && styles.dangerButton]}
    onPress={onPress}
  >
    <Icon
      name={icon}
      size={20}
      color={danger ? '#e74c3c' : '#7b3f00'}
      style={styles.buttonIcon}
    />
    <Text style={[styles.buttonText, danger && styles.dangerText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    bottom:20,
    zIndex: 10,
    color: '#592B1F',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#592B1F',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  dangerButton: {
    backgroundColor: '#ffecec',
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  dangerText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

export default Settings;
