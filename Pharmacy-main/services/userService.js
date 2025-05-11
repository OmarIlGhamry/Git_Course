import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Register new user with default role "user"
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Create Firestore document with role
  await setDoc(doc(db, 'users', uid), {
    email,
    role: 'user' 
  });

  return uid;
};


export const checkIfAdmin = async () => {
  const user = auth.currentUser;
  if (!user) return false;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) return false;

  const userData = userDoc.data();
  return userData.role === 'admin';
};
