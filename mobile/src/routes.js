import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import DeliveryDetails from '~/pages/DeliveryDetails';
import Problems from '~/pages/Deliveries/Problems';
import InformProblem from '~/pages/Deliveries/InformProblem';
import ConfirmDelivery from '~/pages/Deliveries/ConfirmDelivery';

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
        name="Problems"
        component={Problems}
        options={({ navigation }) => ({
          title: 'Visualizar problemas',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            left: 10,
          },
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitle: 'Visualizar problemas',
          headerTintColor: '#fff',

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="InformProblem"
        component={InformProblem}
        options={({ navigation }) => ({
          title: 'Informar problema',
          headerTitle: 'Informar problema',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={({ navigation }) => ({
          title: 'Confirmar entrega',
          headerTitle: 'Confirmar entrega',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#7D40E7',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
        })}
      />

      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={({ navigation }) => ({
          title: 'Detalhes da encomenda',
          headerTitle: 'Detalhes da encomenda',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTitleStyle: { fontWeight: 'bold' },

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
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
