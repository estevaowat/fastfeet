import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

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
        component={Deliveries}
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
  // createAppContainer(
  //   createSwitchNavigator(
  //     {
  //       Sign: createSwitchNavigator({
  //         SignIn,
  //         SignUp,
  //       }),
  //       App: createBottomTabNavigator(
  //         {
  //           Dashboard,
  //           New: {
  //             screen: createStackNavigator(
  //               {
  //                 SelectProvider,
  //                 SelectDateTime,
  //                 Confirm,
  //               },
  //               {
  //                 defaultNavigationOptions: {
  //                   headerTransparent: true,
  //                   headerTintColor: '#fff',
  //                   headerLeftContainerStyle: {
  //                     marginLeft: 20,
  //                   },
  //                 },
  //               }
  //             ),
  //             navigationOptions: {
  //               tabBarVisible: false,
  //               tabBarLabel: 'Agendar',
  //               tabBarIcon: (
  //                 <Icon
  //                   name="add-circle-outline"
  //                   size={20}
  //                   color="rgba(255, 255, 255, 0.6)"
  //                 />
  //               ),
  //             },
  //           },
  //           Profile,
  //         },
  //         {
  //           resetOnBlur: true,
  //           tabBarOptions: {
  //             keyboardHidesTabBar: true,
  //             activeTintColor: '#FFF',
  //             inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
  //             style: {
  //               backgroundColor: '#8d41a8',
  //             },
  //           },
  //         }
  //       ),
  //     },
  //     {
  //       initialRouteName: signedIn ? 'App' : 'Sign',
  //     }
  //   )
  // );
}
