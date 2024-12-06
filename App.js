import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard';
import Transactions from './screens/Transactions';
import AddTransaction from './screens/AddTransaction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from './components/Footer'; // Import Footer component
import colors from './colors';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.light.primary,
      background: colors.light.background,
      card: colors.light.card,
      text: colors.light.text,
      border: colors.light.border,
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.dark.primary,
      background: colors.dark.background,
      card: colors.dark.card,
      text: colors.dark.text,
      border: colors.dark.border,
    },
  };

  const appTheme = isDarkMode ? CustomDarkTheme : CustomLightTheme;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.logoText, { color: isDarkMode ? colors.dark.text : colors.light.text }]}>
          Financial Manager
        </Text>
      </View>
      <DrawerItemList {...props} />
      <Footer /> {/* Add the Footer component here */}
    </DrawerContentScrollView>
  );

  return (
    <NavigationContainer theme={appTheme}>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
          },
          headerTintColor: isDarkMode ? colors.dark.text : colors.light.text,
          headerRight: () => (
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={24}
              color={isDarkMode ? colors.dark.text : colors.light.text}
              style={{ marginRight: 15 }}
              onPress={toggleTheme}
            />
          ),
          drawerStyle: {
            backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
          },
          drawerActiveTintColor: isDarkMode ? colors.dark.primary : colors.light.primary,
          drawerInactiveTintColor: isDarkMode ? colors.dark.text : colors.light.text,
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerIcon: ({ color }) => <Icon name="dashboard" size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Transactions"
          component={Transactions}
          options={{
            drawerIcon: ({ color }) => <Icon name="receipt" size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Add Transaction"
          component={AddTransaction}
          options={{
            drawerIcon: ({ color }) => <Icon name="add-circle-outline" size={22} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
