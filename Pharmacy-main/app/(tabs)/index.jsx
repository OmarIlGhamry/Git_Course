import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/images/logo pharmacy white.png';

const screenWidth = Dimensions.get('window').width;

const originalCategories = [
  { id: '0', title: 'All Categories', isAll: true },
  { id: '1', title: 'Allopathy', icon: 'medkit' },
  { id: '2', title: 'Ayurveda', icon: 'leaf' },
  { id: '3', title: 'Homeo', icon: 'flask' },
  { id: '4', title: 'Baby Care', icon: 'baby' },
];

const featuredDiscounts = [
  { id: '1', title: 'Flat 50% Discount on Medicine', image: require('../../assets/images/disc50.png') },
  { id: '2', title: 'Lab Equipments 20% OFF', image: require('../../assets/images/disc20.png') },
  { id: '3', title: 'Flat 30% Discount on Ayurveda', image: require('../../assets/images/disc30.png') },
];

const originalFeatured = [
  { id: '1', name: 'Panadol', price: '20 EGP', description: 'مسكن شائع يستخدم لعلاج الحمى والصداع.', image: require('../../assets/images/panadol.png') },
  { id: '2', name: 'Vitamin C', price: '35 EGP', description: 'يعزز المناعة ويساعد في الوقاية من الأمراض.', image: require('../../assets/images/vitamin c.png') },
  { id: '3', name: 'Zincovit', price: '40 EGP', description: 'مكمل غني بالزنك والفيتامينات لدعم الصحة.', image: require('../../assets/images/zincovit.png') },
  { id: '4', name: 'Cough Syrup', price: '25 EGP', description: 'شراب مهدئ للسعال الجاف والمزمن.', image: require('../../assets/images/Caugh.png') },
  { id: '5', name: 'Paracetamol', price: '15 EGP', description: 'يخفف الألم ويخفض الحمى بسرعة.', image: require('../../assets/images/paracetamol.png') },
];

const bannerImages = [
  require('../(tabs)/image0.png'),
  // Add more images if needed
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  const filteredFeatured = originalFeatured.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleProductPress = (item) => {
    router.push(`/product?name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&description=${encodeURIComponent(item.description)}`);
  };

  const handleCategoryPress = (category) => {
    if (category.isAll) {
      router.push('/categories');
    } else {
      router.push({ pathname: '/category', params: { id: category.id, name: category.title } });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modified Top Bar with Sign In/Sign Up buttons */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>MEDIC</Text>
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => router.push('/signIn')}
          >
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => router.push('/signUp')}
          >
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={24} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rest of the existing code remains the same */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Featured Medicines..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      <View style={styles.bannerContainer}>
        <Image source={bannerImages[currentBannerIndex]} style={styles.bannerImage} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Offer Ends Today</Text>
          <Text style={styles.bannerSubtitle}>Save up to 50% on Homeo</Text>
          <TouchableOpacity style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arrowControls}>
          <TouchableOpacity onPress={handlePrevBanner} style={{ marginRight: 10 }}>
            <Ionicons name="chevron-back-circle" size={30} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextBanner}>
            <Ionicons name="chevron-forward-circle" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {originalCategories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => handleCategoryPress(cat)}>
            <View style={styles.categoryIcon}>
              <Ionicons name={cat.isAll ? 'menu' : cat.icon} size={24} color="#007bff" />
            </View>
            <Text style={styles.categoryText}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.discountRow}>
        {featuredDiscounts.map((item) => (
          <View key={item.id} style={styles.discountCard}>
            <Image source={item.image} style={styles.discountImage} />
            <Text style={styles.discountText}>{item.title}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Medicines</Text>
      <FlatList
        data={filteredFeatured}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.featuredList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.featuredItem} onPress={() => handleProductPress(item)}>
            <Image source={item.image} style={styles.featuredImage} />
            <Text style={styles.featuredName}>{item.name}</Text>
            <Text style={styles.featuredPrice}>{item.price}</Text>
            <Text style={styles.featuredDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  authButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
  },
  signUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  searchBar: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 45,
    height: 45,
    elevation: 3,
  },
  searchIcon: {
    position: 'absolute',
    top: 13,
    left: 30,
    zIndex: 1,
  },
  bannerContainer: {
    position: 'relative',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  bannerText: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  bannerTitle: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
  bannerSubtitle: { fontSize: 14, color: '#333', marginTop: 4 },
  shopNowBtn: {
    backgroundColor: '#007bff',
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  shopNowText: { color: '#fff', fontWeight: 'bold' },
  arrowControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  categoryScroll: { paddingHorizontal: 10, marginTop: 10 },
  categoryItem: { alignItems: 'center', marginHorizontal: 10 },
  categoryIcon: {
    backgroundColor: '#e6f3ff',
    borderRadius: 30,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: { fontSize: 13, color: '#333' },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  discountCard: {
    width: screenWidth * 0.21,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 6,
  },
  discountImage: {
    width: screenWidth * 0.17,
    height: screenWidth * 0.17,
    borderRadius: 10,
    marginBottom: 5,
  },
  discountText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 10,
  },
  featuredList: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  featuredItem: {
    alignItems: 'center',
    margin: 8,
    width: (screenWidth - 48) / 2,
    backgroundColor: '#f5faff',
    padding: 10,
    borderRadius: 10,
  },
  featuredImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  featuredName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 6,
    textAlign: 'center',
  },
  featuredPrice: { fontSize: 13, color: '#333' },
  featuredDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
});