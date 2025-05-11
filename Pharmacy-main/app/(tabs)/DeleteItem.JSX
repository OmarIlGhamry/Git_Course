import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function DeleteItemScreen() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
      Alert.alert('Success', 'Item deleted!');
      fetchItems(); // Refresh the list
    } catch (err) {
      Alert.alert('Error', 'Failed to delete item: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} (${item.price})</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: { fontWeight: 'bold' },
  categoryText: { color: '#666' },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: { color: 'white' },
});