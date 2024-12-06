import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const storedTransactions = await AsyncStorage.getItem('transactions');
          const parsedTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];
          setTransactions(parsedTransactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTransactions();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : transactions.length === 0 ? (
        <Text>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text>{item.date}</Text>
              <Text>{item.category}</Text>
              <Text>{item.type === 'Income' ? `+${item.amount}` : `-${item.amount}`}</Text>
              <Text>{item.method}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  transactionItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default Transactions;
