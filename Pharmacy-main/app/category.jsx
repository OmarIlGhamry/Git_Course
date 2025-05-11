import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const categoryProducts = {
  '1': [
    { id: 'a1', name: 'Paracetamol', price: 20, image: 'https://example.com/paracetamol.jpg', description: 'Used to reduce fever and relieve pain.' },
    { id: 'a2', name: 'Amoxicillin', price: 45, image: 'https://example.com/amoxicillin.jpg', description: 'Antibiotic used to treat bacterial infections.' },
  ],
  '2': [
    { id: 'b1', name: 'Ashwagandha Tablets', price: 60, image: 'https://example.com/ashwagandha.jpg', description: 'Boosts energy and reduces stress.' },
    { id: 'b2', name: 'Triphala Juice', price: 90, image: 'https://example.com/triphala.jpg', description: 'Improves digestion and detoxifies body.' },
  ],
  '3': [
    { id: 'c1', name: 'Nux Vomica', price: 35, image: 'https://example.com/nux.jpg', description: 'Homeopathic remedy for digestive disorders.' },
    { id: 'c2', name: 'Arnica Montana', price: 40, image: 'https://example.com/arnica.jpg', description: 'Relieves muscle pain and bruises.' },
  ],
  '4': [
    { id: 'd1', name: 'Baby Lotion', price: 120, image: 'https://example.com/babylotion.jpg', description: 'Moisturizes baby\'s skin.' },
    { id: 'd2', name: 'Diaper Pack', price: 400, image: 'https://example.com/diaper.jpg', description: 'Soft and absorbent diapers for babies.' },
  ],
  '5': [
    { id: 'e1', name: 'Thermometer', price: 150, image: 'https://example.com/thermometer.jpg', description: 'Digital thermometer for accurate readings.' },
    { id: 'e2', name: 'BP Monitor', price: 1200, image: 'https://example.com/bp.jpg', description: 'Automatic blood pressure monitoring device.' },
  ],
  '6': [
    { id: 'f1', name: 'Hand Sanitizer', price: 50, image: 'https://example.com/sanitizer.jpg', description: 'Kills 99.9% of germs instantly.' },
    { id: 'f2', name: 'Face Mask', price: 30, image: 'https://example.com/mask.jpg', description: 'Protects against airborne particles.' },
  ],
  '7': [
    { id: 'g1', name: 'Vitamin C Tablets', price: 100, image: 'https://example.com/vitaminc.jpg', description: 'Boosts immunity and antioxidant protection.' },
    { id: 'g2', name: 'Iron Tablets', price: 90, image: 'https://example.com/iron.jpg', description: 'Helps treat iron deficiency anemia.' },
  ],
  '8': [
    { id: 'h1', name: 'Cough Syrup', price: 80, image: 'https://example.com/cough.jpg', description: 'Relieves cough and throat irritation.' },
    { id: 'h2', name: 'Liver Tonic', price: 110, image: 'https://example.com/liver.jpg', description: 'Improves liver function and detoxification.' },
  ],
  '9': [
    { id: 'i1', name: 'Protein Powder', price: 500, image: 'https://example.com/protein.jpg', description: 'Supports muscle growth and recovery.' },
    { id: 'i2', name: 'Omega-3 Capsules', price: 350, image: 'https://example.com/omega3.jpg', description: 'Supports heart and brain health.' },
  ],
  '10': [
    { id: 'j1', name: 'Moisturizer', price: 250, image: 'https://example.com/moisturizer.jpg', description: 'Hydrates and nourishes the skin.' },
    { id: 'j2', name: 'Sunscreen SPF 50', price: 300, image: 'https://example.com/sunscreen.jpg', description: 'Protects skin from UV rays.' },
  ],
  '11': [
    { id: 'k1', name: 'Pain Relief Gel', price: 120, image: 'https://example.com/gel.jpg', description: 'Provides fast relief from joint pain.' },
    { id: 'k2', name: 'Ibuprofen Tablets', price: 35, image: 'https://example.com/ibu.jpg', description: 'Reduces pain, swelling, and fever.' },
  ],
  '12': [
    { id: 'l1', name: 'Bandages', price: 60, image: 'https://example.com/bandage.jpg', description: 'For minor cuts and wounds.' },
    { id: 'l2', name: 'Antiseptic Cream', price: 40, image: 'https://example.com/antiseptic.jpg', description: 'Prevents infection in minor cuts.' },
  ],
  '13': [
    { id: 'm1', name: 'Glucometer Strips', price: 600, image: 'https://example.com/strips.jpg', description: 'Strips for monitoring blood sugar levels.' },
    { id: 'm2', name: 'Sugar Control Tablets', price: 150, image: 'https://example.com/sugar.jpg', description: 'Helps manage blood glucose levels.' },
  ],
  '14': [
    { id: 'n1', name: 'Blood Pressure Medicine', price: 200, image: 'https://example.com/bpmed.jpg', description: 'Controls high blood pressure.' },
    { id: 'n2', name: 'Heart Tonic', price: 400, image: 'https://example.com/tonic.jpg', description: 'Supports cardiovascular health.' },
  ],
  '15': [
    { id: 'o1', name: 'Chyawanprash', price: 180, image: 'https://example.com/chyawan.jpg', description: 'Ayurvedic immunity booster.' },
    { id: 'o2', name: 'Zinc Tablets', price: 90, image: 'https://example.com/zinc.jpg', description: 'Supports immune function.' },
  ],
  '16': [
    { id: 'p1', name: 'N95 Mask', price: 150, image: 'https://example.com/n95.jpg', description: 'Respiratory protection mask.' },
    { id: 'p2', name: 'Oximeter', price: 950, image: 'https://example.com/oximeter.jpg', description: 'Measures blood oxygen saturation.' },
  ],
};

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const products = categoryProducts[id] || [];

  const handleProductPress = (item) => {
    router.push(
      `/product?name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&description=${encodeURIComponent(item.description)}&image=${encodeURIComponent(item.image)}`
    );
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={<Text style={styles.empty}>No products available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    margin: 8,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    maxWidth: '48%',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
