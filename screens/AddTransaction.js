import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTransaction = ({ navigation }) => {
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [index, setIndex] = useState(0); // Tab index

  const incomeCategories = ['Salary', 'Investment', 'Other'];
  const expenseCategories = ['Groceries', 'Utilities', 'Entertainment', 'Other'];

  const handleSubmit = async (type) => {
    if (amount && !isNaN(amount) && category) {
      const transaction = {
        id: Date.now().toString(),
        type,
        amount: parseFloat(amount),
        category,
      };

      // Fetch existing transactions
      const existingTransactions = await AsyncStorage.getItem('transactions');
      const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];

      // Add new transaction
      transactions.push(transaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // Reset fields and navigate back
      setAmount('');
      setCategory('');
      navigation.goBack();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const renderIncome = React.memo(() => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add Income</Text>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Amount"
        placeholderTextColor={colors.border}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          if (text === '' || /^[0-9.]+$/.test(text)) {
            setAmount(text);
          }
        }}
      />

      <Text style={[styles.text, { color: colors.text }]}>Category:</Text>
      {incomeCategories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.categoryButton, category === cat && styles.selectedCategory]}
          onPress={() => setCategory(cat)}
        >
          <Text style={[styles.categoryText, { color: category === cat ? colors.background : colors.text }]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}

      <Button title="Submit Income" onPress={() => handleSubmit('Income')} />
    </View>
  ));

  const renderExpense = React.memo(() => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add Expense</Text>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Amount"
        placeholderTextColor={colors.border}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          if (text === '' || /^[0-9.]+$/.test(text)) {
            setAmount(text);
          }
        }}
      />

      <Text style={[styles.text, { color: colors.text }]}>Category:</Text>
      {expenseCategories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.categoryButton, category === cat && styles.selectedCategory]}
          onPress={() => setCategory(cat)}
        >
          <Text style={[styles.categoryText, { color: category === cat ? colors.background : colors.text }]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}

      <Button title="Submit Expense" onPress={() => handleSubmit('Expense')} />
    </View>
  ));

  return (
    <TabView
      navigationState={{ index, routes: [{ key: 'income', title: 'Income' }, { key: 'expense', title: 'Expense' }] }}
      renderScene={SceneMap({ income: renderIncome, expense: renderExpense })}
      onIndexChange={setIndex}
      initialLayout={{ width: 100 }}
    />
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
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 18,
  },
});

export default AddTransaction;
