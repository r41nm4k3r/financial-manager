import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native'; // For getting passed parameters
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // For the date picker
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to have this installed
import AsyncStorage from '@react-native-async-storage/async-storage'; // For saving data

const AddTransactionDetails = ({ navigation }) => {
  const route = useRoute();
  const { category } = route.params; // Retrieve the category passed from AddTransaction
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Income');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleSaveTransaction = async () => {
    // Construct the transaction object
    const newTransaction = {
      category,
      amount: parseFloat(amount),
      transactionType: transactionType,
      date: date.toISOString(),
    };

    try {
      // Retrieve existing transactions
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      
      // Add the new transaction
      transactions.push(newTransaction);

      // Save updated transactions back to AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      console.log('Transaction saved:', newTransaction);
      navigation.navigate('Dashboard'); // Navigate back to Dashboard
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <View style={styles.categoryContainer}>
        <Icon name="category" size={50} color="#4CAF50" />
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <View style={styles.transactionTypeContainer}>
        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'Income' && styles.selectedTransactionType]}
          onPress={() => setTransactionType('Income')}
        >
          <Text style={styles.transactionButtonText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'Expense' && styles.selectedTransactionType]}
          onPress={() => setTransactionType('Expense')}
        >
          <Text style={styles.transactionButtonText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTransaction}>
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Going back to AddTransaction
      >
        <Text style={styles.backButtonText}>Back to Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTransactionType: {
    backgroundColor: '#4CAF50',
  },
  transactionButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  datePickerButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 18,
    color: 'white',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default AddTransactionDetails;
