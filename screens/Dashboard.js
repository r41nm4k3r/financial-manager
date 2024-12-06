import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5 } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../components/Footer';

const Dashboard = ({ navigation }) => {
  const { colors } = useTheme();
  const [balance, setBalance] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBalance = async () => {
  try {
    const existingTransactions = await AsyncStorage.getItem('transactions');
    const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];
    const totalBalance = transactions.reduce((total, transaction) => {
      return transaction.type === 'Income'
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);

    setBalance(totalBalance);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};

      fetchBalance();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <FontAwesome5 name="wallet" size={30} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
      </View>
      <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.balanceText, { color: colors.text }]}>Total Balance</Text>
        <Text style={[styles.balanceAmount, { color: colors.primary }]}>
          ${balance.toFixed(2)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Add Transaction')}
        >
          <FontAwesome5 name="plus" size={20} color={colors.background} />
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Transactions')}
        >
          <FontAwesome5 name="list" size={20} color={colors.background} />
          <Text style={styles.buttonText}>View Transactions</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

// Styles remain the same as before

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  balanceCard: {
    padding: 20,
    borderRadius: 10,
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    width: '45%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});

export default Dashboard;
