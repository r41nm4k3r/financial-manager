import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import Footer from './Footer'; // Adjust the import path if necessary

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={{ color: colors.text }}>Financial Manager</Text>
      </View>
      <DrawerItemList {...props} />
      <Footer /> {/* Add the Footer component here */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default CustomDrawerContent;
