import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderHistoryScreen({ navigation, route }) {
  const { orderData } = route.params || {};

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {orderData ? (
          <View style={styles.card}>
            <Text style={styles.date}>
              {new Date(orderData.timestamp).toLocaleString()}
            </Text>

            {orderData.items.map((item, idx) => (
              <View key={idx} style={styles.orderRow}>
                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.image}
                />
                <View style={styles.orderDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSize}>
                    x{item.quantity} {item.size}
                  </Text>
                  <Text style={styles.status}>Delivered</Text>
                </View>
              </View>
            ))}

            <Text style={styles.total}>
              Total: ₱{orderData.total.toFixed(2)}
            </Text>

            <TouchableOpacity style={styles.reorderBtn}>
              <Text style={styles.reorderText}>REORDER</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noData}>No order data found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#6B3E2E' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B3E2E',
    marginBottom: 20,
  },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginLeft: 10 },
  scrollContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 24,
    paddingTop: 30,
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },
  date: { fontSize: 16, color: '#333', marginBottom: 12 },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  orderDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  itemSize: { fontSize: 14, color: '#555' },
  status: { marginTop: 5, fontSize: 14, color: '#444' },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
    marginTop: 10,
  },
  reorderBtn: {
    backgroundColor: '#6B3E2E',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  reorderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  noData: { textAlign: 'center', color: '#000', marginTop: 50 },
});
