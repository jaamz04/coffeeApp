import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, CommonActions } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(null);
  // State for modal fields
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [address, setAddress] = useState('123 Main St, City');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifOrder, setNotifOrder] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifNews, setNotifNews] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Logout function (no AsyncStorage used)
  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  // Modal content map
  const modalContent = {
    personal: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>Personal Information</Text>
        <Text style={styles.modalLabel}>Full Name</Text>
        <TextInput style={styles.modalInput} value={fullName} onChangeText={setFullName} />
        <Text style={styles.modalLabel}>Email</Text>
        <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Text style={styles.modalLabel}>Address</Text>
        <TextInput style={styles.modalInput} value={address} onChangeText={setAddress} />
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </View>
    ),
    language: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>Language</Text>
        <Text style={styles.modalLabel}>Select Language</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Filipino" value="fil" />
            <Picker.Item label="Cebuano" value="ceb" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="Chinese" value="zh" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Okay</Text>
        </TouchableOpacity>
      </View>
    ),
    notification: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>Notifications</Text>
        <View style={styles.switchRow}>
          <Text style={styles.modalLabel}>Order Updates</Text>
          <Switch value={notifOrder} onValueChange={setNotifOrder} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.modalLabel}>Promotions</Text>
          <Switch value={notifPromo} onValueChange={setNotifPromo} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.modalLabel}>App News</Text>
          <Switch value={notifNews} onValueChange={setNotifNews} />
        </View>
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </View>
    ),
    help: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>Help & Support</Text>
        <Text style={styles.modalLabel}>Email</Text>
        <Text style={styles.modalText}>support@splitbill.com</Text>
        <Text style={styles.modalLabel}>Phone</Text>
        <Text style={styles.modalText}>+63 912 345 6789</Text>
        <Text style={styles.modalLabel}>FAQ</Text>
        <Text style={styles.modalText}>Visit our website for frequently asked questions.</Text>
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </View>
    ),
    updatePassword: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>Update Password</Text>
        <Text style={styles.modalLabel}>Current Password</Text>
        <TextInput style={styles.modalInput} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry />
        <Text style={styles.modalLabel}>New Password</Text>
        <TextInput style={styles.modalInput} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry />
        <Text style={styles.modalLabel}>Confirm New Password</Text>
        <TextInput style={styles.modalInput} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm New Password" secureTextEntry />
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </View>
    ),
    settings: (
      <View style={styles.modalContentBox}>
        <Text style={styles.modalTitle}>App Settings</Text>
        <Text style={styles.modalLabel}>Theme</Text>
        <Text style={styles.modalText}>Light / Dark (coming soon)</Text>
        <Text style={styles.modalLabel}>Notifications</Text>
        <Text style={styles.modalText}>Manage in Notification tab</Text>
        <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModal(null)}>
          <Text style={styles.closeModalText}>Close</Text>
        </TouchableOpacity>
      </View>
    ),
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

      {/* Modals */}
      {modal && (
        <View style={styles.modalOverlay}>
          {modalContent[modal]}
        </View>
      )}

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
          <SettingButton icon="user" label="Personal Information" onPress={() => setModal('personal')} />
          <SettingButton icon="paint-brush" label="Theme" />
          <SettingButton icon="globe" label="Language" onPress={() => setModal('language')} />
          <SettingButton icon="bell" label="Notification" onPress={() => setModal('notification')} />
          <SettingButton icon="question-circle" label="Help" onPress={() => setModal('help')} />
          <SettingButton icon="lock" label="Update Password" onPress={() => setModal('updatePassword')} />
          <SettingButton icon="cog" label="Settings" onPress={() => setModal('settings')} />
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContentBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    minWidth: 280,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#592B1F',
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
    color: '#592B1F',
    marginTop: 10,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  dropdownContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    width: '100%',
    height: 44,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  closeModalBtn: {
    backgroundColor: '#592B1F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Settings;
