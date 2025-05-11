// app/product.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../app/cartContext';

export default function ProductScreen() {
  const { name, price, description, id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: id || name,
      name,
      price: parseFloat(price),
    });
    alert('Added to cart');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>

      <View style={styles.imagePlaceholder} />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price} EGP</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 20 },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#cce6ff',
    borderRadius: 12,
    marginBottom: 20,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 10 },
  price: { fontSize: 18, color: '#333', marginBottom: 10 },
  description: { fontSize: 16, color: '#555', marginBottom: 30 },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
