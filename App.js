import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddTransaction from './screens/AddTransaction'; // Ensure the path is correct
import AddTransactionDetails from './screens/AddTransactionDetails'; // Ensure the path is correct
import Dashboard from './screens/Dashboard'; // Ensure the path is correct
import Transactions from './screens/Transactions'; // Ensure the path is correct
import colors from './colors'; // Your custom colors for theme

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for AddTransaction and AddTransactionDetails screens
const AddTransactionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{ title: 'Add Transaction' }}
      />
      <Stack.Screen
        name="AddTransactionDetails"
        component={AddTransactionDetails}
        options={{ title: 'Transaction Details' }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Using DefaultTheme for light mode and DarkTheme for dark mode
  const appTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={appTheme}>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary },
          headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
        }}
      >
        {/* Dashboard Screen */}
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerIcon: ({ color }) => <Icon name="dashboard" size={22} color={color} />,
          }}
        />

        {/* AddTransaction Stack */}
        <Drawer.Screen
          name="AddTransactionStack"
          component={AddTransactionStack}
          options={{
            drawerIcon: ({ color }) => <Icon name="add-circle-outline" size={22} color={color} />,
            title: 'Add Transaction', // Label in the drawer
          }}
        />

        {/* Transactions Screen */}
        <Drawer.Screen
          name="Transactions"
          component={Transactions}
          options={{
            drawerIcon: ({ color }) => <Icon name="list" size={22} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
