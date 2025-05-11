import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showRoleModal, setShowRoleModal] = useState(false);

  const roles = ['user', 'admin'];

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        uid: user.uid,
        role,
      });

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/signIn');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/images/logo-removebg-preview.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Sign up as:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowRoleModal(true)}
        >
          <Text style={styles.dropdownText}>{role}</Text>
        </TouchableOpacity>

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
                      setRole(item);
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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signIn')}>
            <Text style={styles.signinLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
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
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signinContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  signinText: {
    color: '#666',
  },
  signinLink: {
    color: '#007BFF',
    fontWeight: '600',
  },
});
