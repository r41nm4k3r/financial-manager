import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';  // For the icons
import colors from './colors'; // Assuming you have colors defined for your app

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Logo at the top of the drawer */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')} // Replace with your logo path
          style={styles.logo}
        />
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
      
      {/* Footer (Optional) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 100,
    resizeMode: 'contain', // Keeps aspect ratio intact
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 16,
    color: colors.primary, // Assuming you have a primary color defined
  },
});

export default CustomDrawerContent;
