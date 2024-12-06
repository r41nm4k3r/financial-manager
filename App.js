import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddTransaction from './screens/AddTransaction';
import AddTransactionDetails from './screens/AddTransactionDetails';
import Dashboard from './screens/Dashboard';
import Transactions from './screens/Transactions';
import colors from './colors';
import CustomDrawerContent from './CustomDrawerContent'; // Import your custom drawer

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for AddTransaction and AddTransactionDetails screens
const AddTransactionStack = () => {
  return (
    <Stack.Navigator initialRouteName="AddTransaction">
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

  const appTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={appTheme}>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary },
          headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer Content
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ drawerIcon: ({ color }) => <Icon name="dashboard" size={22} color={color} /> }}
        />
        <Drawer.Screen
          name="AddTransactionStack"
          component={AddTransactionStack}
          options={{ drawerIcon: ({ color }) => <Icon name="add-circle-outline" size={22} color={color} /> }}
        />
        <Drawer.Screen
          name="Transactions"
          component={Transactions}
          options={{ drawerIcon: ({ color }) => <Icon name="list" size={22} color={color} /> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
