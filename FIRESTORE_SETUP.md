# Firestore Setup for Voting System

## Quick Setup

Your voting system is now integrated! You just need to set up Firestore security rules.

## Step 1: Enable Firestore Database

1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore
2. Click "Create database"
3. Choose **"Start in test mode"** (for development)
4. Select a location (choose closest to your users)
5. Click "Enable"

## Step 2: Set Up Security Rules

1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/rules
2. Replace the default rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Votes collection - users can only create their own vote document
    match /votes/{userId} {
      // Users can read their own vote
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can create their own vote (only once)
      allow create: if request.auth != null 
                    && request.auth.uid == userId
                    && !exists(/databases/$(database)/documents/votes/$(userId));
      
      // Users cannot update or delete their vote (prevents duplicate votes)
      allow update, delete: if false;
    }
  }
}
```

3. Click "Publish"

## How It Works

- **Vote Storage**: Each user's vote is stored in Firestore at `/votes/{userId}`
- **Duplicate Prevention**: The security rules prevent users from creating a vote if one already exists
- **No Cache**: Votes are stored only in Firestore, not in browser cache
- **User-Specific**: Each authenticated user can only vote once

## Testing

1. Sign in to your app
2. Scroll to the Statement of Intent section
3. Click "🗳️ Vote to Support"
4. The vote will be saved to Firestore
5. Try voting again - it should show "You have already voted"

## Viewing Votes

To see all votes in Firestore:
1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/data
2. Click on the "votes" collection
3. You'll see all user votes with their email, timestamp, etc.

## Troubleshooting

### "Missing or insufficient permissions" error
- Make sure Firestore is enabled
- Check that security rules are published
- Verify the user is authenticated

### Vote button doesn't work
- Check browser console (F12) for errors
- Verify Firestore is enabled
- Make sure security rules are set correctly

### Can vote multiple times
- Check that security rules include the `!exists()` check
- Make sure rules are published

---

**Your voting system is now ready!** 🎉

