import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import DeliveryDetails from '~/pages/DeliveryDetails';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function DeliveryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Deliveries"
        component={Deliveries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{
          title: 'Detalhes da encomenda',
          headerTitle: 'Detalhes da encomenda',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#7D40E7',
          },
          headerLeft: ({ navigation }) => (
            <TouchableOpacity
              onPress={() => {
                return navigation.navigate('Deliveries');
              }}
            >
              <Icon name="chevron-left" size={18} color="#fff" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999',

        style: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen
        name="Deliveries"
        component={DeliveryStack}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={20} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
