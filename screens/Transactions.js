import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PageLayout from '../components/PageLayout';

const Transactions = ({ navigation }) => {
  const { colors } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);  // State to track loading

  // Fetch transactions from AsyncStorage on screen focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          setLoading(true);  // Start loading
          const existingTransactions = await AsyncStorage.getItem('transactions');
          if (existingTransactions) {
            setTransactions(JSON.parse(existingTransactions));
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setLoading(false);  // End loading
        }
      };

      fetchTransactions();
    }, [])
  );

  return (
    <PageLayout navigation={navigation}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Transactions</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : transactions.length === 0 ? (
          <Text style={{ color: colors.text }}>No transactions found.</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.transaction, { borderColor: colors.border }]}>
                <Text style={[styles.transactionText, { color: colors.text }]}>
                  {item.type}: ${item.amount} - {item.category}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transaction: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 18,
  },
});

export default Transactions;
