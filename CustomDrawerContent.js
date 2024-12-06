import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Text style={[styles.copyright, { color: colors.text }]}>
          © 2024 Your Company
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
