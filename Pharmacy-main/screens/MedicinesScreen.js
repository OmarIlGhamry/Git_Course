import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchMedicines } from '../services/medicineService';

export default function MedicinesScreen() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMedicines();
      setMedicines(data);
    };

    getData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.price}>{item.price} EGP</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicines List</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
    fontWeight: 'bold',
    marginBottom: 15
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    marginTop: 5,
    color: 'green'
  }
});
