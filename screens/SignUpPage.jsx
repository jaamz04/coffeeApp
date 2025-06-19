import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpPage = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {/* Full Name Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Icon name="user" size={20} color="#aaa" style={styles.iconRight} />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Icon name="lock" size={20} color="#aaa" style={styles.iconRight} />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#aaa"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      {/* Address Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Address"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Icon name="map-marker" size={20} color="#aaa" style={styles.iconRight} />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Or Divider */}
      <Text style={styles.orText}>Or sign up with</Text>

      {/* Social Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconCircle}>
          <Icon name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
          <Icon name="facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
          <Icon name="instagram" size={24} color="#C13584" />
        </TouchableOpacity>
      </View>

      {/* Link to Login */}
      <Text style={styles.link}>
        Already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SignUpPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f4e37',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconRight: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#6f4e37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    marginVertical: 20,
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  link: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  loginText: {
    color: '#ffd700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
