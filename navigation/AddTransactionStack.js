import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddTransaction from '../screens/AddTransaction';  // Ensure the path is correct
import AddTransactionDetails from '../screens/AddTransactionDetails';  // Ensure the path is correct

const Stack = createStackNavigator();

const AddTransactionStack = () => {
  return (
    <Stack.Navigator initialRouteName="AddTransaction">
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{ title: 'Add Transaction' }}  // Customize header title for AddTransaction
      />
      <Stack.Screen
        name="AddTransactionDetails"
        component={AddTransactionDetails}
        options={{ title: 'Transaction Details' }}  // Customize header title for AddTransactionDetails
      />
    </Stack.Navigator>
  );
};

export default AddTransactionStack;
