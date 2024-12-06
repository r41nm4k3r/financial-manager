import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const [totalBudget, setTotalBudget] = useState(0);

  // Function to fetch and calculate the total budget
  const fetchTotalBudget = async () => {
    try {
      const transactions = await AsyncStorage.getItem('transactions');
      const parsedTransactions = transactions ? JSON.parse(transactions) : [];

      // Calculate total budget
      let income = 0;
      let expense = 0;
      parsedTransactions.forEach((transaction) => {
        if (transaction.type === 'Income') {
          income += parseFloat(transaction.amount);
        } else if (transaction.type === 'Expense') {
          expense += parseFloat(transaction.amount);
        }
      });

      setTotalBudget(income - expense); // Update total budget
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Use focus effect to refresh budget when Dashboard gains focus
  useFocusEffect(
    useCallback(() => {
      fetchTotalBudget();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Total Budget Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Budget</Text>
        <Text style={styles.cardAmount}>${totalBudget.toFixed(2)}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTransactionStack')}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Text style={styles.buttonText}>View Transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
  },
  cardAmount: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Dashboard;
