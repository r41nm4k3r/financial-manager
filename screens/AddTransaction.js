import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this is installed

const categories = [
  { name: 'Salary', icon: 'attach-money' },
  { name: 'Investment', icon: 'trending-up' },
  { name: 'Groceries', icon: 'shopping-cart' },
  { name: 'Utilities', icon: 'flash-on' },
  { name: 'Entertainment', icon: 'theaters' },
  { name: 'Other', icon: 'category' },
];

const AddTransaction = ({ navigation }) => {
  const handleCategorySelection = (category) => {
    navigation.navigate('AddTransactionDetails', { category });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCategorySelection(item.name)}
    >
      <Icon name={item.icon} size={30} color="white" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={3} // 3 columns for the grid layout
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: 100, // Square shape width
    height: 100, // Square shape height
    backgroundColor: '#4CAF50', // Green background color
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#FF5722', // Orange color
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTransaction;
