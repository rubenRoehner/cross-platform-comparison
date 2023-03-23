import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs/src';
import { Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import SettingsScreen from './src/screens/SettingsScreen';
import TodosScreen from './src/screens/TodosScreen';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            if (route.name === 'Todos') {
              iconName = 'list'
            } else {
              iconName = 'settings'
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'darkgray',
        })}
      >
        <Tab.Screen name="Todos" component={TodosScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
