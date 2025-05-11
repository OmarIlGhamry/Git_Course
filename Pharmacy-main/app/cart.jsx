// app/cart.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../app/cartContext';

export default function Cart() {
  const router = useRouter();
  const { cartItems, setCartItems } = useCart();

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>

        <Text style={styles.header}>🛒 My Cart</Text>

        <View style={styles.itemsContainer}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  {item.price} EGP × {item.quantity}
                </Text>
              </View>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => decreaseQty(item.id)}
                >
                  <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => increaseQty(item.id)}
                >
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total: {total} EGP</Text>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    elevation: 3,
    minHeight: '100%',
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  itemDetails: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  controlText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
    color: '#333',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
