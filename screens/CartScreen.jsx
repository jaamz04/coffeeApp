import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CartScreen({ route, navigation }) {
  const { cartItems: initialCartItems = [] } = route.params || {};
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [orderType, setOrderType] = useState('Dine In');
  const [paymentMethod, setPaymentMethod] = useState('GCash');

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceString = item.price?.toString().replace(/[^0-9.]/g, '') || '0';
    const price = parseFloat(priceString);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const handleDeleteItem = (indexToRemove) => {
    setCartItems(items => items.filter((_, i) => i !== indexToRemove));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty.");
      return;
    }

    const orderData = {
      items: cartItems,
      total: totalPrice,
      orderType,
      paymentMethod,
      timestamp: new Date().toISOString(),
    };

    // 1) Clear the cart first:
    setCartItems([]);

    // 2) Navigate to OrderHistory (screen name must match your navigator)
    navigation.navigate('OrderHistory', { orderData });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.image}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>x{item.quantity} {item.size}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(index)}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Items in Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
        />

        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal:</Text>
          <Text style={styles.subtotalAmount}>₱{totalPrice.toFixed(2)}</Text>
        </View>

        {/* Order Type */}
        <Text style={styles.sectionTitle}>Order Type</Text>
        <View style={styles.orderTypeRow}>
          {['Pick Up', 'Delivery', 'Dine In'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.orderTypeButton,
                orderType === type && styles.selectedOrderType
              ]}
              onPress={() => setOrderType(type)}
            >
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === type && styles.selectedOrderTypeText
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethodRow}>
          {['GCash', 'PayPal', 'Card', 'Cash'].map(method => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentButton,
                paymentMethod === method && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              {/* Remove the circle, just show the icon and label inline */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {method === 'GCash' && <MaterialCommunityIcons name="cash-multiple" size={24} color="#0070ba" style={{ marginRight: 8 }} />}
                {method === 'PayPal' && <FontAwesome5 name="paypal" size={24} color="#003087" style={{ marginRight: 8 }} />}
                {method === 'Card' && <FontAwesome5 name="credit-card" size={24} color="#6c757d" style={{ marginRight: 8 }} />}
                {method === 'Cash' && <Ionicons name="cash-outline" size={24} color="#388e3c" style={{ marginRight: 8 }} />}
                <Text
                  style={[
                    styles.paymentText,
                    paymentMethod === method && styles.selectedPaymentText
                  ]}
                >
                  {method}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#592B1F' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginLeft: 20 },
  container: { flex: 1, backgroundColor: '#592B1F', padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
  emptyText: { color: '#fff', textAlign: 'center', marginTop: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5a4336',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  itemSize: { fontSize: 14, color: '#ddd' },
  itemPrice: { fontSize: 16, color: '#ffdab9', marginTop: 5 },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#7d5d4b',
    paddingTop: 10,
    marginVertical: 20,
  },
  subtotalLabel: { fontSize: 18, fontWeight: '600', color: '#fff' },
  subtotalAmount: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  orderTypeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  orderTypeButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  orderTypeText: { color: '#fff', fontWeight: '500' },
  selectedOrderType: { backgroundColor: '#fff' },
  selectedOrderTypeText: { color: '#3c2e25', fontWeight: 'bold' },
  paymentMethodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    width: '48%',
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paymentText: { color: '#fff', fontWeight: '500' },
  selectedPayment: { backgroundColor: '#fff' },
  selectedPaymentText: { color: '#3c2e25', fontWeight: 'bold' },
  orderButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  orderButtonText: { color: '#3c2e25', fontSize: 18, fontWeight: 'bold' },
  paymentIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
