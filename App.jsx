import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import SignUpPage from './screens/SignUpPage';
import Dashboard from './screens/dashboard';
import CartScreen from './screens/CartScreen';
import OrderHistoryScreen from './screens/OrderHistory';
import Favorite from './screens/favorite';
import Settings from './screens/setting';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpPage}  options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard"component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false, title: 'Your Cart' }}/>
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
        <Stack.Screen name="Order" component={OrderHistoryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Favorite" component={Favorite} options={{ title: 'Favorites', headerShown: false }} />
       <Stack.Screen name="Settings" component={Settings} options={{headerShown: false }} />

        


      </Stack.Navigator>
    </NavigationContainer>
  );
}
