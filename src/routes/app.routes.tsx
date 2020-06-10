import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <App.Screen
        options={{
          cardStyle: { backgroundColor: '#C72828' },
        }}
        name="Home"
        component={Home}
      />
      <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
