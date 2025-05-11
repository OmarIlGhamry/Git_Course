import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const router = useRouter();
  const { email, uid } = useLocalSearchParams();
  const [profileImage, setProfileImage] = useState(require('../(tabs)/doctor.png'));
  const [userRole, setUserRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const fetchUserRole = async () => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserRole(docSnap.data().role);
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera roll permission required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const roles = ['user', 'admin'];

  const menuItems = [
    { title: 'Edit Profile', icon: 'person' },
    { title: 'Orders', icon: 'clipboard' },
    { title: 'Addresses', icon: 'location' },
    { title: 'Payment Methods', icon: 'card' },
  ];

  const adminItems = [
    {
      title: 'Add Category Item',
      icon: 'add-circle',
      onPress: () => router.push('/admin/addItem'),
    },
    {
      title: 'Delete Category Item',
      icon: 'trash',
      onPress: () => router.push('/admin/deleteItem'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={profileImage} style={styles.avatar} />
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        </TouchableOpacity>
        <Text style={styles.name}>Email</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={styles.email}>Role: {userRole} </Text>
          <TouchableOpacity onPress={() => setShowRoleModal(true)}>
            <Ionicons name="pencil" size={18} color="#007BFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        <Modal
          visible={showRoleModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowRoleModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={roles}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setUserRole(item);
                      setShowRoleModal(false);
                    }}
                  >
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.menuContainer}>
        {(userRole === 'admin' ? [...adminItems, ...menuItems] : menuItems).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress || (() => {})}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={24} color="#2A3F54" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuItem, { marginTop: 20 }]}
          onPress={() => router.replace('/signIn')}
        >
          <Ionicons name="power" size={24} color="#D9534F" style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: '#D9534F' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  uploadButton: {
    backgroundColor: '#2A3F54',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  uploadButtonText: { color: '#fff', fontSize: 14 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16, color: '#666' },
  menuContainer: { paddingHorizontal: 15, marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: { width: 30, marginRight: 15, alignItems: 'center' },
  menuText: { flex: 1, fontSize: 16, color: '#333' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 250,
    maxHeight: 200,
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});
