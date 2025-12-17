import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import '../styles/VoteButton.css';

function VoteButton() {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'yes' or 'no'
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteMessage, setVoteMessage] = useState('');
  const [voteCounts, setVoteCounts] = useState({ yes: 0, no: 0 });

  useEffect(() => {
    checkVoteStatus();
    loadVoteCounts();
  }, []);

  const loadVoteCounts = async () => {
    try {
      const votesRef = collection(db, 'votes');
      const snapshot = await getDocs(votesRef);
      
      let yesCount = 0;
      let noCount = 0;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.vote === 'yes') {
          yesCount++;
        } else if (data.vote === 'no') {
          noCount++;
        }
      });
      
      setVoteCounts({ yes: yesCount, no: noCount });
    } catch (error) {
      console.error('Error loading vote counts:', error);
    }
  };

  const checkVoteStatus = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setIsChecking(false);
        return;
      }

      const voteRef = doc(db, 'votes', user.uid);
      const voteSnap = await getDoc(voteRef);

      if (voteSnap.exists()) {
        const voteData = voteSnap.data();
        setHasVoted(true);
        setUserVote(voteData.vote || 'yes');
        setVoteMessage(`✅ Thank you! Your ${voteData.vote === 'yes' ? 'support' : 'feedback'} has been recorded.`);
      }
      setIsChecking(false);
    } catch (error) {
      console.error('Error checking vote status:', error);
      setIsChecking(false);
    }
  };

  const handleVote = async (voteType) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setVoteMessage('❌ Please sign in to vote.');
        return;
      }

      if (hasVoted) {
        setVoteMessage('⚠️ You have already voted.');
        return;
      }

      setIsSubmitting(true);
      setVoteMessage('');

      // Save vote to Firestore
      const voteRef = doc(db, 'votes', user.uid);
      await setDoc(voteRef, {
        email: user.email,
        userId: user.uid,
        vote: voteType,
        votedAt: serverTimestamp(),
        timestamp: new Date().toISOString()
      });

      setHasVoted(true);
      setUserVote(voteType);
      setVoteMessage(`✅ Thank you! Your ${voteType === 'yes' ? 'support' : 'feedback'} has been recorded.`);
      
      // Update vote counts
      await loadVoteCounts();
    } catch (error) {
      console.error('Error submitting vote:', error);
      const errorMessage = error.message || 'Unknown error';
      const errorCode = error.code || '';
      
      console.error('Full error details:', {
        code: errorCode,
        message: errorMessage,
        error: error
      });
      
      if (errorCode === 'permission-denied') {
        setVoteMessage('❌ Permission denied. Please check Firestore security rules.');
      } else if (errorCode === 'unavailable' || errorMessage.includes('Firestore')) {
        setVoteMessage('❌ Firestore is not enabled. Please enable Firestore in Firebase Console.');
      } else {
        setVoteMessage(`❌ Error: ${errorMessage}. Check console (F12) for details.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="vote-container">
        <div className="vote-checking">Checking vote status...</div>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <div className="vote-buttons-wrapper">
        <button
          onClick={() => handleVote('yes')}
          disabled={hasVoted || isSubmitting}
          className={`vote-button vote-yes ${hasVoted && userVote === 'yes' ? 'voted' : ''} ${hasVoted ? 'disabled' : ''}`}
        >
          <span className="vote-emoji">✨</span>
          <span className="vote-text">YES - I Support This Policy</span>
          <span className="vote-shine">✨</span>
        </button>
        
        <button
          onClick={() => handleVote('no')}
          disabled={hasVoted || isSubmitting}
          className={`vote-button vote-no ${hasVoted && userVote === 'no' ? 'voted' : ''} ${hasVoted ? 'disabled' : ''}`}
        >
          <span className="vote-emoji">😢</span>
          <span className="vote-text">NO - I Do Not Support</span>
        </button>
      </div>

      {/* Vote Counts */}
      <div className="vote-counts">
        <div className="vote-count-item vote-count-yes">
          <span className="count-label">Support:</span>
          <span className="count-number">{voteCounts.yes}</span>
        </div>
        <div className="vote-count-item vote-count-no">
          <span className="count-label">Oppose:</span>
          <span className="count-number">{voteCounts.no}</span>
        </div>
      </div>

      {voteMessage && (
        <div className={`vote-message ${voteMessage.includes('✅') ? 'success' : voteMessage.includes('❌') ? 'error' : 'warning'}`}>
          {voteMessage}
        </div>
      )}
      
      {hasVoted && (
        <p className="vote-note">
          Your {userVote === 'yes' ? 'support' : 'feedback'} has been recorded in our database. Thank you!
        </p>
      )}
    </div>
  );
}

export default VoteButton;
