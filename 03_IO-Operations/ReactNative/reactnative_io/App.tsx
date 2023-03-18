import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs/src';
import CartsScreen from './src/screens/CartsScreen';
import UserScreen from './src/screens/UserScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            if (route.name === 'Products') {
              iconName = 'list'
            } else if (route.name === 'User') {
              iconName = 'people-outline'
            } else {
              iconName = 'shopping-cart'
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'darkgray',
        })}
      >
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="Carts" component={CartsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
