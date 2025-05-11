import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const addMedicine = async (medicineData) => {
  try {
    await addDoc(collection(db, 'medicines'), medicineData);
    console.log('Medicine added!');
  } catch (error) {
    console.error('Error adding medicine:', error);
  }
};
