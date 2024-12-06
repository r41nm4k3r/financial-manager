import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // To refetch data when screen is focused
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this is installed
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for fetching transactions

const Transactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from AsyncStorage when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const storedTransactions = await AsyncStorage.getItem('transactions');
          if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
          }
        } catch (error) {
          console.error("Failed to load transactions", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionText}>{item.category}</Text>
      <Text style={styles.transactionText}>${item.amount}</Text>
      <Text style={styles.transactionText}>{item.transactionType}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {/* Back to Dashboard button */}
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
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 5,
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
