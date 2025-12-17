# Reset All Votes - Instructions

## 🎯 Quick Reset (Recommended - Firebase Console)

### Step 1: Open Firestore Console
Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/data

### Step 2: Delete All Votes
1. Click on the **"votes"** collection in the left sidebar
2. You'll see all vote documents listed
3. Click the **checkbox** at the top (selects all documents)
4. Click the **Delete** button (trash icon) at the top
5. Confirm the deletion

### Step 3: Verify
- The votes collection should now be empty
- Users can vote again with the new Yes/No system

---

## 🔧 Alternative: Using Script (Advanced)

If you prefer using a script:

1. Make sure you have Node.js installed
2. Run: `node reset-votes.js`
3. The script will delete all votes automatically

---

## ✅ After Resetting

- All users can vote again
- Vote counter will reset to 0 Yes / 0 No
- New votes will use the Yes/No system
- Each user can still only vote once (enforced by Firestore rules)

---

**Note**: The vote counter will automatically update when users vote. No manual reset needed for the counter - it reads from Firestore in real-time.

