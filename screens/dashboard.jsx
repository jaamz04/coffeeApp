import React, { useState, useEffect } from 'react';
import OrderHistoryScreen from './OrderHistory';
import Favorite from './favorite';
import Settings from './setting';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
  ScrollView,
   Modal,
   FlatList,
   Picker 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const recommendedCoffees = [
  {
    name: 'Cappuccino',
    price: '$4.20',
    description: 'Smooth and creamy espresso with steamed milk and foam.',
    image: require('../assets/cappuccino.png'),
  },
  {
    name: 'Espresso',
    price: '$3.00',
    description: 'Strong, bold shot of coffee for a quick energy boost.',
    image: require('../assets/espresso.png'),
  },
  {
    name: 'Latte',
    price: '$4.50',
    description: 'Creamy espresso with plenty of steamed milk.',
    image: require('../assets/latte.png'),
  },
];

const coffeeFlavors = [
  {
    id: '1',
    name: 'Latte',
    price: '$4.50',
    image: require('../assets/latte.png'),
    description:
      'A smooth and creamy blend of rich espresso and steamed milk. ',
  },
  {
    id: '2',
    name: 'Espresso',
    price: '$3.00',
    image: require('../assets/espresso.png'),
    description:
      'A bold shot of coffee with intense flavor and aroma. ',
  },
  {
    id: '3',
    name: 'Mocha',
    price: '$4.80',
    image: require('../assets/americano.png'),
    description:
      'A rich and indulgent mix of espresso, chocolate, and steamed milk.',
  },
  {
    id: '4',
    name: 'Affogato',
    price: '$5.00',
    image: require('../assets/Affogato.png'),
    description:
      'A delightful dessert-coffee made by espresso over a scoop of vanilla ice cream.',
  },
  {
    id: '5',
    name: 'Flat White',
    price: '$4.70',
    image: require('../assets/flatWhite.png'),
    description:
      'A velvety coffee made with espresso and smooth, micro-foamed milk.',
  },
  {
    id: '6',
    name: 'Matcha',
    price: '$4.30',
    image: require('../assets/matcha.png'),
    description:
      'Creamy, antioxidant-rich, and naturally energizing.',
  },
  {
    id: '7',
    name: 'Ristretto',
    price: '$3.50',
    image: require('../assets/Ristretto.png'),
    description:
      'Bolder, richer, and less bitter than regular espresso.',
  },
];
const bakeryItems = [
  {
    id: '1',
    name: 'Chocolate Chip',
    price: '$2.00',
    image: require('../assets/cook.png'),
    description: 'Crispy on the edges, chewy in the middle.',
  },
  {
    id: '2',
    name: 'Croissant',
    price: '$2.50',
    image: require('../assets/croissant.png'),
    description: 'Flaky, buttery, and freshly baked.',
  },
  {
    id: '3',
    name: 'Banana Bread',
    price: '$3.00',
    image: require('../assets/banana.png'),
    description: 'Moist, sweet, and perfect with any coffee.',
  },
   {
    id: '4',
    name: 'Roll Donot',
    price: '$3.00',
    image: require('../assets/roll.png'),
    description: 'Moist, sweet, and perfect with any coffee.',
  },
   {
    id: '5',
    name: 'Cinnamon Roll',
    price: '$3.00',
    image: require('../assets/cinnamonroll.png'),
    description: 'Moist, sweet, and perfect with any coffee.',
  },
];

const nearbyShops = [
  {
    id: '1',
    name: 'Brew & Beans',
    store: 'Main Branch',
    address: '123 Espresso St, Cebu City',
    contact: '0917-123-4567',
    rating: 4,
    image: require('../assets/coffee1.jpg'), // update path accordingly
  },
  {
    id: '2',
    name: 'Cafe Aroma',
    store: 'SM Seaside',
    address: '2nd Floor, SM Seaside, Cebu',
    contact: '0922-456-7890',
    rating: 5,
    image: require('../assets/coffee2.jpg'),
  },
  {
    id: '3',
    name: 'Latte Love',
    store: 'Downtown',
    address: '456 Latte Ave, Minglanilla',
    contact: '0906-987-6543',
    rating: 5,
    image: require('../assets/coffee3.jpg'),
  },
];
const feedbacks = [
  {
    id: '1',
    name: 'Maria Santos',
    comment: 'Love the caramel macchiato! Hope you add more pastries soon.',
    image: require('../assets/profile2.jpg'),
  },
  {
    id: '2',
    name: 'Juan Dela Cruz',
    comment: 'Great ambiance and fast service. I’ll come back again!',
    image: require('../assets/profile3.jpg'),
  },
  {
    id: '3',
    name: 'Ana Lopez',
    comment: 'The coffee was a bit strong for me. Maybe offer mild options too?',
    image: require('../assets/profile4.jpg'),
  },
];

const icedCoffee = [
  {
    id: '1',
    name: 'Iced Americano',
    price: '$3.50',
    description: 'Bold espresso poured over ice.',
    image: require('../assets/ice-americano.png'),
  },
  {
    id: '2',
    name: 'Iced Latte',
    price: '$4.00',
    description: 'Smooth espresso blended with cold milk and ice.',
    image: require('../assets/ice-latte.png'),
  },
  {
    id: '3',
    name: 'Iced Mocha',
    price: '$4.50',
    description: 'Chilled chocolate and coffee combo topped with cream.',
    image: require('../assets/ice-mocha.png'),
  },
  {
    id: '4',
    name: 'Caramel Macchiato',
    price: '$4.75',
    description: 'Vanilla, milk, espresso, and caramel drizzle.',
    image: require('../assets/ice-caramel.png'),
  },
  {
    id: '5',
    name: 'Cold Brew',
    price: '$3.75',
    description: 'Slow-steeped cold brew for a smooth finish.',
    image: require('../assets/cold-brew.png'),
  },
  {
    id: '6',
    name: 'Iced Vanilla Latte',
    price: '$4.25',
    description: 'Creamy vanilla flavor with iced espresso and milk.',
    image: require('../assets/ice-vanilla.png'),
  },
];
const coffeeHistoryData = [
  {
    id: 1,
    title: "Origins in Ethiopia",
    image: require('../assets/ethiopia.jpg'),
    history:
      "Coffee was first discovered in Ethiopia in the 9th century. A goat herder named Kaldi noticed his goats became energetic after eating coffee berries.",
  },
  {
    id: 2,
    title: "Roasting in Yemen",
    image: require('../assets/yemen.jpg'),
    history:
      "By the 15th century, coffee was being roasted and brewed in Yemen. Sufi monks drank it to stay awake during night prayers. Yemen’s port of Mocha became the main hub for coffee export.",
  },
  {
    id: 3,
    title: "Expand in Europe",
    image: require('../assets/europe.jpg'),
    history:
      "Coffee entered Europe in the early 17th century through Venice. Initially seen as suspicious, it became popular in European cafés and salons.",
  },
  {
    id: 4,
    title: "Global Expansion",
    image: require('../assets/plantation.jpg'),
    history:
      "In the 18th and 19th centuries, coffee spread across colonies. Brazil became the largest exporter, shaping global coffee trade.",
  },
];
const SIZE_ICONS = {
  Small: 'cafe-outline',
  Medium: 'cafe-sharp',
  Large: 'cafe', // changed from 'coffee-outline' to 'cafe'
};

 // Example notifications with unread property
const notifications = [
    { id: '1', message: 'Your order has been shipped!', time: '2 mins ago', unread: true },
    { id: '2', message: 'New flavor available: Mango Tango!', time: '10 mins ago', unread: false },
    { id: '3', message: 'Your feedback is important to us.', time: '30 mins ago', unread: true },
    { id: '4', message: 'Limited time offer: 20% off on all drinks!', time: '1 hour ago', unread: false },
    { id: '5', message: 'We have received your payment. Thank you!', time: '2 hours ago', unread: false },
  ];



const Dashboard = ({ navigation, route }) => {
  const user = route?.params?.user;
  const [isDelivery, setIsDelivery] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [bounceAnim] = useState(new Animated.Value(1));
  const [activeTab, setActiveTab] = useState('Home');
  const [userComment, setUserComment] = useState('');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [selectedSize, setSelectedSize] = useState('Small');
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBakeryVisible, setModalBakeryVisible] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalSize, setModalSize] = useState('Small');
  const [modalQty, setModalQty] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecommendation((prev) => (prev + 1) % recommendedCoffees.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    animateCart();
  };

  const animateCart = () => {
    bounceAnim.setValue(1);
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const recommended = recommendedCoffees[currentRecommendation];

  // Open modal for drinks (flavors/iced)
  const openItemModal = (item) => {
    setModalItem(item);
    setModalQty(1);
    setModalSize('Small');
    setModalVisible(true);
  };

  // Open modal for bakery
  const openBakeryModal = (item) => {
    setModalItem(item);
    setModalQty(1);
    setModalBakeryVisible(true);
  };

  // Add to cart from modal
  const handleAddToCart = () => {
    if (modalItem) {
      const itemToAdd = { ...modalItem, quantity: modalQty, size: modalSize };
      addToCart(itemToAdd);
      setModalVisible(false);
    }
  };
  const handleAddBakeryToCart = () => {
    if (modalItem) {
      const itemToAdd = { ...modalItem, quantity: modalQty };
      addToCart(itemToAdd);
      setModalBakeryVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcome}>Welcome {user?.username || 'Guest'}</Text>
          <Text style={styles.subHeader}>Dashboard</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
            <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
              <Ionicons name="cart-outline" size={28} color="#fff" />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
          <View style={{ position: 'relative', zIndex: 9999 }}>
            <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
            {showNotifications && (
              <View style={styles.notificationDropdown}>
                {notifications.slice(0, 5).map((notif) => (
                  <View key={notif.id} style={[styles.notificationItem, notif.unread && styles.notificationUnread]}>
                    <Text style={styles.notificationTime}>{notif.time}</Text>
                    <Text style={styles.notificationMessage}>{notif.message}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.panel}>
              {/* Recommended Section */}
              <Text style={styles.sectionTitle}>Recommended</Text>
               <View style={styles.recommendBox}>
                  <Image source={recommended.image} style={styles.recommendedImage} />
                </View>

                <Text style={styles.recommendedTitle}>{recommended.name}</Text>
                <Text style={styles.recommendedPrice}>STARTING AT {recommended.price}</Text>

                <View style={styles.priceContainer}>
                      <Text style={styles.label}>Choose Cup Size:</Text>

                      <View style={styles.row}>
                          {['Small', 'Medium', 'Large'].map((size) => {
                            const isSelected = selectedSize === size;
                            return (
                              <TouchableOpacity
                                key={size}
                                style={[
                                  styles.optionBox,
                                  isSelected && styles.selectedOptionBox
                                ]}
                                onPress={() => setSelectedSize(size)}
                              >
                                <Ionicons
                                  name={SIZE_ICONS[size]}
                                  size={20}
                                  color={isSelected ? '#fff' : '#6f4e37'}
                                  style={styles.optionIcon}
                                />
                                <Text
                                  style={[
                                    styles.optionText,
                                    isSelected && { color: '#fff' }
                                  ]}
                                >
                                  {size}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}

                        {/* Quantity Controls */}
                        <View style={styles.optionBox}>
                          <Text style={styles.labelSmall}>Qty:</Text>
                          <View style={styles.quantityRow}>
                            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                              <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                              <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                
                
                


                <TouchableOpacity style={styles.orderButton} onPress={() => addToCart(recommended)}>
                  <Text style={styles.orderButtonText}>ORDER NOW</Text>
                </TouchableOpacity>

              {/* Flavors */}
              <Text style={styles.popularHeader}>Flavors</Text>
              <FlatList
                horizontal
                data={coffeeFlavors}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.popularItem} onPress={() => openItemModal(item)}>
                    <Image source={item.image} style={styles.popularImage} resizeMode="contain" />
                    <Text style={styles.popularText}>{item.name}</Text>
                    <Text style={styles.popularPrice}>{item.price}</Text>
                    <Text style={styles.popularDesc}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Iced Coffee */}
              <Text style={styles.popularHeader}>Iced Coffee</Text>
              <FlatList
                horizontal
                data={icedCoffee}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.popularItem} onPress={() => openItemModal(item)}>
                    <Image source={item.image} style={styles.popularImage} resizeMode="contain" />
                    <Text style={styles.popularText}>{item.name}</Text>
                    <Text style={styles.popularPrice}>{item.price}</Text>
                    <Text style={styles.popularDesc}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Cookies & Bread */}
              <Text style={styles.popularHeader}>Cookies & Bread</Text>
              <FlatList
                horizontal
                data={bakeryItems}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.popularItem} onPress={() => openBakeryModal(item)}>
                    <Image source={item.image} style={styles.popularImage} resizeMode="contain" />
                    <Text style={styles.popularText}>{item.name}</Text>
                    <Text style={styles.popularPrice}>{item.price}</Text>
                    <Text style={styles.popularDesc}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Nearby Coffee Shops */}
              <Text style={styles.popularup}>Nearby Coffee Shops</Text>
              <View style={styles.nearbyShopsContainer}>
                {nearbyShops.map((shop) => (
                  <View key={shop.id} style={styles.shopCard}>
                    <Image source={shop.image} style={styles.shopImage} />
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <Text style={styles.shopInfo}>🏪 {shop.store}</Text>
                    <Text style={styles.shopInfo}>📍 {shop.address}</Text>
                    <Text style={styles.shopInfo}>📞 {shop.contact}</Text>
                  </View>
                ))}
              </View>


             <Text style={styles.popularup}>Coffee History</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyScroll}>
                  {coffeeHistoryData.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.historyCard} onPress={() => setSelectedCoffee(item)}>
                      <Image source={item.image} style={styles.historyImage} resizeMode="contain" />
                      <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Modal visible={selectedCoffee !== null} animationType="slide" transparent>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>{selectedCoffee?.title}</Text>
                      <Text style={styles.modalText}>{selectedCoffee?.history}</Text>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedCoffee(null)}>
                        <Text style={styles.closeText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>


              {/* Customer Feedback */}
              <Text style={styles.popularup}>Customer Feedback</Text>
             <View style={styles.feedbackContainer}>
                {feedbacks.map((feedback) => (
                  <View key={feedback.id} style={styles.feedbackCard}>
                    <View style={styles.feedbackHeader}>
                      <Image source={feedback.image} style={styles.feedbackAvatar} />
                      <Text style={styles.feedbackTime}>20 minutes ago</Text>
                    </View>
                    <View style={styles.feedbackContent}>
                      <Text style={styles.feedbackName}>{feedback.name}</Text>
                      <Text style={styles.feedbackComment}>{feedback.comment}</Text>
                    </View>
                  </View>
                ))}
              </View>

                
                  <View style={styles.footer}>
                      <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => Linking.openURL('https://play.google.com/store')}
                      >
                        <Ionicons name="logo-google-playstore" size={20} color="#8B4513" />
                        <Text style={styles.linkText}>Download Our App</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => Linking.openURL('mailto:your@email.com')}
                      >
                        <Ionicons name="mail-outline" size={20} color="#8B4513" />
                        <Text style={styles.linkText}>Contact Us</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => Linking.openURL('https://yourwebsite.com')}
                      >
                        <Ionicons name="globe-outline" size={20} color="#8B4513" />
                        <Text style={styles.linkText}>Visit Website</Text>
                      </TouchableOpacity>

                      <View style={styles.linkRow}>
                        <Ionicons name="call-outline" size={20} color="#8B4513" />
                        <Text style={styles.linkText}>+63 912 345 6789</Text>
                      </View>

                      <Text style={styles.reserved}>© 2025 All Rights Reserved</Text>
                    </View>
            </View>
          </>
        }
        data={[]}
        keyExtractor={() => 'dummy'}
        renderItem={null}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Home' && styles.activeNavItem]}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home-outline" size={24} color={activeTab === 'Home' ? '#ffd700' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Order' && styles.activeNavItem]}
          onPress={() => navigation.navigate('Order')}
        >
          <Ionicons name="receipt-outline" size={24} color={activeTab === 'Order' ? '#ffd700' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Favorite' && styles.activeNavItem]}
          onPress={() => navigation.navigate('Favorite')}
        >
          <Ionicons name="heart-outline" size={24} color={activeTab === 'Favorite' ? '#ffd700' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Settings' && styles.activeNavItem]}
          onPress={() => navigation.navigate('Settings', { user })}
        >
          <Ionicons name="settings-outline" size={24} color={activeTab === 'Settings' ? '#ffd700' : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* Modals for Drinks and Bakery Items */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalItem && (
              <>
                <Image source={modalItem.image} style={{ width: 100, height: 100, marginBottom: 10 }} />
                <Text style={styles.modalTitle}>{modalItem.name}</Text>
                <Text style={styles.modalText}>{modalItem.description}</Text>
                <Text style={styles.label}>Select Size:</Text>
                <View style={styles.row}>
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.optionBox,
                        modalSize === size && styles.selectedOptionBox,
                        { flexDirection: 'column', alignItems: 'center',padding:10,height: 70,width:80, justifyContent: 'center', gap: 4 }
                      ]}
                      onPress={() => setModalSize(size)}
                    >
                      <Ionicons
                        name={SIZE_ICONS[size]}
                        size={30}
                        color={modalSize === size ? '#fff' : '#6f4e37'}
                        style={{ marginBottom: 4 }}
                      />
                      <Text style={[styles.optionText, modalSize === size && { color: '#fff' }]}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.label}>Quantity:</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity style={[styles.quantityButtonModal]} onPress={() => setModalQty(Math.max(1, modalQty - 1))}>
                    <Text style={styles.quantityButtonTextModal}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{modalQty}</Text>
                  <TouchableOpacity style={[styles.quantityButtonModal]} onPress={() => setModalQty(modalQty + 1)}>
                    <Text style={styles.quantityButtonTextModal}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.modalOrderButton} onPress={handleAddToCart}>
                  <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.modalOrderButtonText}>Order Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for bakery (quantity only) */}
      <Modal visible={modalBakeryVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalItem && (
              <>
                <Image source={modalItem.image} style={{ width: 100, height: 100, marginBottom: 10 }} />
                <Text style={styles.modalTitle}>{modalItem.name}</Text>
                <Text style={styles.modalText}>{modalItem.description}</Text>
                <Text style={styles.label}>Quantity:</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity style={[styles.quantityButtonModal]} onPress={() => setModalQty(Math.max(1, modalQty - 1))}>
                    <Text style={styles.quantityButtonTextModal}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{modalQty}</Text>
                  <TouchableOpacity style={[styles.quantityButtonModal]} onPress={() => setModalQty(modalQty + 1)}>
                    <Text style={styles.quantityButtonTextModal}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.modalOrderButton} onPress={handleAddBakeryToCart}>
                  <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.modalOrderButtonText}>Order Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalBakeryVisible(false)}>
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#592B1F',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subHeader: {
    color: '#e0d5cb',
    fontSize: 14,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  panel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 24,
    paddingTop: 30,

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6F4E37',
  },
  recommendBox: {
    backgroundColor: '#6F4E37',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendedImage: {
    width: 140,
    height: 140,
  },
  recommendedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3c2e25',
    textAlign: 'center',
  },
  recommendedPrice: {
    fontSize: 14,
    color: '#7a6b61',
    textAlign: 'center',
    marginBottom: 16,
  },
    priceContainer: {
    marginVertical: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },

  labelSmall: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },

  optionBox: {
    width: '22%',
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  selectedOptionBox: {
    backgroundColor: '#6f4e37',
    borderColor: '#6f4e37',
  },

  optionText: {
    color: '#000',
    fontWeight: 'bold',
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  quantityButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6f4e37',
    paddingHorizontal: 6,
  },

  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dineInButton: {
    backgroundColor: '#6F4E37',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dineInText: {
    color: '#fff',
    fontWeight: '600',
  },
  deliveryToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderButton: {
    backgroundColor: '#6F4E37',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 24,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  popularHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 20,
  },
  popularup:{
 fontSize: 20,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 20,
    marginTop:10,
    marginLeft:20,
  },
  popularScroll: {
    paddingRight: 10,
  },
  popularItem: {
    backgroundColor: '#6F4E37',
    padding: 16,
    borderRadius: 16,
    width: 180,
    height:220,
    marginRight: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  popularImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  popularText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },

  popularPrice: {
    fontSize: 14,
    color: '#ffd9b3',
    marginTop: 4,
  },
  popularDesc: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },

 bottomNav: {
  position: 'absolute',
  bottom: 20, 
  left: '5%', 
  width: '90%', 
  height: 60,
  backgroundColor: '#6F4E37',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: 30, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5, 
},


navItem: {
  alignItems: 'center',
  justifyContent: 'center',
},
nearbyShopsContainer: {
  marginTop: 10,
  marginBottom: 20,
  gap: 12,
},
shopCard: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 12,
  elevation: 3,
  marginBottom: 10,
},
shopImage: {
  width: '100%',
  height: 150,
  borderRadius: 10,
  marginBottom: 10,
},
shopName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#6f4e37',
  marginBottom: 5,
},
shopInfo: {
  fontSize: 14,
  color: '#333',
},
shopRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 4,
  gap: 6,
},

ratingRow: {
  flexDirection: 'row',
  marginTop: 4,
},
feedbackCard: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

feedbackHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
feedbackAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
},

feedbackTime: {
  fontSize: 12,
  color: '#888',
},

feedbackContent: {
  marginTop: 6,
},

feedbackName: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 2,
  color: '#6F4E37',
},

feedbackComment: {
  fontSize: 14,
  color: '#444',
},

 historyScroll: {
  paddingHorizontal: 10,
  gap: 16,
  marginBottom: 20,
},

historyCard: {
  width: 200,
  alignItems: 'center',
justifyContent: 'center',
  marginRight: 12,
  backgroundColor: '#6F4E37',
  borderRadius: 12,
  padding: 20,
  elevation: 3,
},

historyImage: {
  width: 160,
  height: 160,
  borderRadius: 10,
  marginBottom: 8,
},

  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: 20,
},

modalContent: {
  width: '100%',
  maxHeight: '80%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 10,
  alignItems: 'center',
},

modalTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 12,
  textAlign: 'center',
  color: '#4B2E2E',
},

modalText: {
  fontSize: 16,
  color: '#444',
  textAlign: 'justify',
  marginBottom: 20,
  lineHeight: 22,
},

closeButton: {
  backgroundColor: '#8B4513',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 30,
  marginTop: 10,
},

closeText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
footer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'flex-start',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#8B4513',
  }, 
  reserved: {
    marginTop: 10,
    fontSize: 12,
    color: '#8B4513',
    alignSelf: 'center',
  },

  // New styles for modals
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  modalDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sizeQtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sizeContainer: {
    width: '48%',
  },
  quantityContainer: {
    width: '48%',
  },
  sizeOption: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 8,
  },
  selectedSizeOption: {
    backgroundColor: '#6f4e37',
    borderColor: '#6f4e37',
  },
  sizeText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#6F4E37',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityButtonModal: {
    backgroundColor: '#6F4E37',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  quantityButtonTextModal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOrderButton: {
    backgroundColor: '#6F4E37',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  modalOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCancelButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  modalCancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationDropdown: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 24,
    padding: 0,
    width: 280,
    maxHeight: 340,
    zIndex: 99999,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    overflow: 'hidden',
  },
  notificationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  notificationMessage: {
    fontSize: 15,
    color: '#3c2e25',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 2,
    textAlign: 'right',
  },
  // Highlight unread notifications
  notificationUnread: {
    backgroundColor: '#fffbe6', // light yellow for unread
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700', // gold highlight
  },
});
