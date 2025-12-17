// Script to reset all votes in Firestore
// Run with: node scripts/resetVotes.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWmCCj2Zoa6q-CS1SDfuaMLw44U7bY_zU",
  authDomain: "unit3quiz-v005-angus.firebaseapp.com",
  projectId: "unit3quiz-v005-angus",
  storageBucket: "unit3quiz-v005-angus.firebasestorage.app",
  messagingSenderId: "931603632892",
  appId: "1:931603632892:web:3d4fab1e536876f23b7d79",
  measurementId: "G-SRZL5HD9J6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function resetVotes() {
  try {
    console.log('Fetching all votes...');
    const votesRef = collection(db, 'votes');
    const snapshot = await getDocs(votesRef);
    
    console.log(`Found ${snapshot.size} votes to delete`);
    
    const deletePromises = [];
    snapshot.forEach((docSnapshot) => {
      deletePromises.push(deleteDoc(doc(db, 'votes', docSnapshot.id)));
    });
    
    await Promise.all(deletePromises);
    console.log('✅ All votes have been deleted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting votes:', error);
    process.exit(1);
  }
}

resetVotes();

