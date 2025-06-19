import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const favorites = [
  {
    id: '1',
    name: 'Cappuccino',
    size: 'x1 Large',
    image: require('../assets/cappuccino.png'), // replace with your actual image
  },
  {
    id: '2',
    name: 'Bread',
    size: 'x1 Large',
    image: require('../assets/cook.png'), // replace with your actual image
  },
  {
    id: '3',
    name: 'Ice Coffee',
    size: 'x1 Large',
    image: require('../assets/americano.png'), // replace with your actual image
  },
];

const Favorite = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <FlatList 
        data={favorites}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.size}>{item.size}</Text>
            </View>
            <Ionicons name="heart" size={24} color="#7B3F00" />
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B3F00',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  size: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
