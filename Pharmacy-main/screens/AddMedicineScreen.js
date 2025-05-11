import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { checkIfAdmin } from '../services/userService';

export default function AddMedicineScreen() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const verifyAdmin = async () => {
      const result = await checkIfAdmin();
      setIsAdmin(result);
    };

    verifyAdmin();
  }, []);

  const handleAddMedicine = async () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'medicines'), {
        name,
        description,
        price: parseFloat(price)
      });

      Alert.alert('Success', 'Medicine added successfully.');
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding medicine:', error);
      Alert.alert('Error', 'Failed to add medicine.');
    }
  };

  if (isAdmin === null) {
    return <Text style={styles.centered}>Checking permissions...</Text>;
  }

  if (!isAdmin) {
    return <Text style={styles.centered}>Access denied. Admins only.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Medicine</Text>
      <TextInput
        placeholder="Medicine Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Medicine" onPress={handleAddMedicine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  centered: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16
  }
});
