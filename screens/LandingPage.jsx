import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const images = [
  require('../assets/landingimages.png'),
  require('../assets/landingimages1.png'),
  require('../assets/landingimages2.png'),
   require('../assets/landingimages3.png'),
];

const LandingPage = ({ navigation }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a day with Coffee</Text>

      <Image
        source={images[imageIndex]}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: i === imageIndex ? 1 : 0.4 },
            ]}
          />
        ))}
      </View>

      <Text style={styles.subText}>Start your journey to a better brew</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Must match route name in App.jsx
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f4e37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 100,
    textAlign: 'center',
  },
  image: {
    width: 520,
    height: 520,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  subText: {
    fontSize: 10,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    width: 250,
    alignItems: 'center',
    marginBottom: 80,
  },
  buttonText: {
    color: '#6f4e37',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
