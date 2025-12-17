// Script to reset all votes in Firestore
// Run with: node reset-votes.js

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
    console.log('🔍 Fetching all votes from Firestore...');
    const votesRef = collection(db, 'votes');
    const snapshot = await getDocs(votesRef);
    
    const voteCount = snapshot.size;
    console.log(`📊 Found ${voteCount} votes to delete`);
    
    if (voteCount === 0) {
      console.log('✅ No votes to delete. Database is already empty.');
      process.exit(0);
    }
    
    const deletePromises = [];
    let deletedCount = 0;
    
    snapshot.forEach((docSnapshot) => {
      deletePromises.push(
        deleteDoc(doc(db, 'votes', docSnapshot.id))
          .then(() => {
            deletedCount++;
            console.log(`🗑️  Deleted vote ${deletedCount}/${voteCount}`);
          })
      );
    });
    
    await Promise.all(deletePromises);
    console.log(`\n✅ Successfully deleted ${deletedCount} votes!`);
    console.log('🎉 All votes have been reset. Users can now vote again.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting votes:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

console.log('🚀 Starting vote reset process...\n');
resetVotes();

