// CategoriesScreen.js
import React, { useState } from 'react'; 
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const originalCategories = [
  {
    id: '1',
    name: 'Allopathy',
    image: 'https://img.freepik.com/free-photo/assorted-colorful-pharmaceutical-drugs-pills_23-2148751396.jpg',
  },
  {
    id: '2',
    name: 'Ayurveda',
    image: 'https://img.freepik.com/free-photo/herbal-medicine-natural-organic-leaves_53876-15463.jpg',
  },
  {
    id: '3',
    name: 'Homeo',
    image: 'https://img.freepik.com/free-photo/homeopathy-alternative-medicine_23-2148826022.jpg',
  },
  {
    id: '4',
    name: 'Baby Care',
    image: 'https://img.freepik.com/free-photo/baby-products-arrangement-with-toys_23-2148877787.jpg',
  },
  {
    id: '5',
    name: 'Medical Equipments',
    image: 'https://img.freepik.com/free-photo/top-view-medical-equipment-blue-background_23-2148491202.jpg',
  },
  {
    id: '6',
    name: 'Healthcare Products',
    image: 'https://img.freepik.com/free-photo/medicine-healthcare-composition-white-background_23-2148495409.jpg',
  },
  {
    id: '7',
    name: 'Tablets',
    image: 'https://img.freepik.com/free-photo/tablets-blister-packs-white-background_23-2148491686.jpg',
  },
  {
    id: '8',
    name: 'Syrups',
    image: 'https://img.freepik.com/free-photo/syrup-bottle-with-white-cap-medical_23-2148780053.jpg',
  },
  {
    id: '9',
    name: 'Vitamins & Supplements',
    image: 'https://img.freepik.com/free-photo/vitamins-supplements-colorful_23-2149176780.jpg',
  },
  {
    id: '10',
    name: 'Skin Care',
    image: 'https://img.freepik.com/free-photo/skin-care-cream-tube-pink-background_23-2148859149.jpg',
  },
  {
    id: '11',
    name: 'Pain Relief',
    image: 'https://img.freepik.com/free-photo/pain-relief-pill-pack_23-2148498431.jpg',
  },
  {
    id: '12',
    name: 'First Aid',
    image: 'https://img.freepik.com/free-photo/first-aid-kit-contents-laid-out_23-2148827824.jpg',
  },
  {
    id: '13',
    name: 'Diabetes Care',
    image: 'https://img.freepik.com/free-photo/diabetes-glucose-meter-syringe-pills_23-2148821362.jpg',
  },
  {
    id: '14',
    name: 'Heart Care',
    image: 'https://img.freepik.com/free-photo/red-heart-stethoscope-blue-background_23-2148480171.jpg',
  },
  {
    id: '15',
    name: 'Immunity Boosters',
    image: 'https://img.freepik.com/free-photo/immunity-boosting-products-orange-supplements_23-2149100400.jpg',
  },
  {
    id: '16',
    name: 'Covid Essentials',
    image: 'https://img.freepik.com/free-photo/medical-mask-sanitizer-gloves-essentials_23-2148431943.jpg',
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(originalCategories);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const matched = originalCategories.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );
    setFilteredCategories(matched);
    setIsSearching(true);
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilteredCategories(originalCategories);
    setIsSearching(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: '/category', params: { id: item.id, name: item.name } })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.searchHeaderTitle}>Browse Categories</Text>
          <TouchableOpacity style={styles.cartIcon} onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
          {isSearching && (
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        key={'categories-list-2-cols'}
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No categories found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchHeader: {
    backgroundColor: '#007bff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchHeaderTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartIcon: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
    fontSize: 16,
    color: '#000',
    elevation: 2,
  },
  searchButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'white',
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 65,
    backgroundColor: '#ccc',
    height: 25,
    width: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    margin: 8,
    flex: 1,
    maxWidth: '48%',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
