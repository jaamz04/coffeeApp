import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = {};
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
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>

      {/* Email Input */}
      <View style={[styles.inputWrapper, emailFocused && styles.inputFocused]}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
        <Icon name="lock" size={18} color="#aaa" style={styles.inputIconRight} />
      </View>
      {errors.email && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.email}</Text>}

      {/* Password Input */}
      <View style={[styles.inputWrapper, passwordFocused && styles.inputFocused]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-slash' : 'eye'}
            size={18}
            color="#aaa"
            style={styles.inputIconRight}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={{ color: 'yellow', alignSelf: 'flex-start', marginBottom: 5 }}>{errors.password}</Text>}

      {/* Remember Me and Forgot Password */}
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
            {rememberMe && <Icon name="check" size={12} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerWrapper}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="instagram" size={24} color="#C13584" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>
          Don't have an account?{' '}
          <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f4e37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderColor:"none",
    paddingVertical: 0,
  },
  inputIconRight: {
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
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  orText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
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
  signUpText: {
    color: '#ffd700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 3,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#6f4e37',
    borderColor: '#fff',
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#ffd700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
