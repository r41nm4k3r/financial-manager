import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Adjust if not using Expo

const Footer = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Made with 
        <FontAwesome name="heart" size={14} color="red" style={styles.icon} />
      </Text>
      <Text style={[styles.text, { color: colors.text }]}>
        © 2024 NnyX All Rights Reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Footer;
