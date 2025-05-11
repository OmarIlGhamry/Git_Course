import React, { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      router.replace("/tabs"); // Correct path for new Expo Router setup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>──────── OR ────────</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => alert("Google Sign In not implemented")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#007BFF",
    fontSize: 14,
  },
  signinButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signinText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    color: "#999",
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: "#333",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  signupText: {
    color: "#666",
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "600",
  },
});
