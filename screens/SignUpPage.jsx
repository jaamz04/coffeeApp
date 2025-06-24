import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerUser } from './api';

const SignUpPage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};
    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required (min 2 characters)';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    if (!address) {
      newErrors.address = 'Address is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        await registerUser(fullName, email, password, address);
        // Optionally, send address to backend if you want to store it
        navigation.navigate('Login');
      } catch (err) {
        setErrors({ ...errors, api: err.message });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {/* Full Name Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Icon name="user" size={20} color="#aaa" style={styles.iconRight} />
      </View>
      {errors.fullName && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.fullName}</Text>}

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Icon name="lock" size={20} color="#aaa" style={styles.iconRight} />
      </View>
      {errors.email && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.email}</Text>}

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
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
      {errors.password && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.password}</Text>}

      {/* Address Field */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Address"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <Icon name="map-marker" size={20} color="#aaa" style={styles.iconRight} />
      </View>
      {errors.address && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.address}</Text>}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {errors.api && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.api}</Text>}

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
