import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Footer from './Footer'; // Use the Footer for consistency
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

const PageLayout = ({ children }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>{children}</View>
      <Button
        title="Back to Home"
        color={colors.primary}
        onPress={() => navigation.navigate('Dashboard')}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default PageLayout;
