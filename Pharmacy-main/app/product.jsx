import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../app/cartContext';

export default function ProductScreen() {
  const { name, price, description, id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [email, setEmail] = useState('');

  const handleAddToCart = () => {
    addToCart({
      id: id || name,
      name,
      price: parseFloat(price),
    });
    alert('Added to cart');
  };

  const handleSubmitReview = () => {
    if (!email || !reviewText) {
      alert('Please enter both email and review.');
      return;
    }

    const newReview = { email, text: reviewText };
    setReviews([...reviews, newReview]);
    setEmail('');
    setReviewText('');
    setShowReviewModal(false);
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6c757d', marginTop: 10 }]}
        onPress={() => setShowReviewModal(true)}
      >
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 10 }]}
        onPress={() => setShowReviewsModal(true)}
      >
        <Text style={styles.buttonText}>Reviews</Text>
      </TouchableOpacity>

      {/* Modal to Submit a Review */}
      <Modal visible={showReviewModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Your Review"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmitReview}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#6c757d', marginTop: 10 }]}
              onPress={() => setShowReviewModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal to Show Reviews */}
      <Modal visible={showReviewsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Customer Reviews</Text>
            {reviews.length === 0 ? (
              <Text style={{ color: '#888' }}>No reviews yet.</Text>
            ) : (
              <FlatList
                data={reviews}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewEmail}>✉️ {item.email}</Text>
                    <Text style={styles.reviewText}>📝 {item.text}</Text>
                  </View>
                )}
              />
            )}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#6c757d', marginTop: 10 }]}
              onPress={() => setShowReviewsModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  reviewEmail: {
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  reviewText: {
    color: '#333',
  },
});
