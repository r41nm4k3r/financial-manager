import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Transactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true); // Show loading indicator
      const storedTransactions = await AsyncStorage.getItem('transactions');
      console.log('Stored Transactions:', storedTransactions); // Debug log

      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions);
        setTransactions(Array.isArray(parsedTransactions) ? parsedTransactions : []);
      } else {
        setTransactions([]); // No transactions found
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.transactionCard,
        item.transactionType === 'Income' ? styles.income : styles.expense,
      ]}
    >
      <Text style={styles.transactionCategory}>{item.category}</Text>
      <Text style={styles.transactionAmount}>
        {item.transactionType === 'Income' ? '+' : '-'}$
        {parseFloat(item.amount).toFixed(2)}
      </Text>
      <Text style={styles.transactionType}>{item.transactionType}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : transactions.length === 0 ? (
        <Text style={styles.noTransactionsText}>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  income: {
    backgroundColor: '#e8f5e9', // Light green for income
    borderColor: '#4CAF50',
  },
  expense: {
    backgroundColor: '#ffebee', // Light red for expense
    borderColor: '#f44336',
  },
  transactionCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionType: {
    fontSize: 14,
    color: '#757575',
  },
  noTransactionsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Transactions;
