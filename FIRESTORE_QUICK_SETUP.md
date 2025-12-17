# Quick Firestore Setup Guide

## The Error You're Seeing

If you see "Error submitting vote", it means Firestore is not enabled or configured.

## Step-by-Step Fix (5 minutes)

### 1. Enable Firestore Database

1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore
2. Click **"Create database"** button
3. Select **"Start in test mode"** (for development)
4. Choose a location (pick the closest to you)
5. Click **"Enable"**

### 2. Set Security Rules

1. After Firestore is created, go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/rules
2. Replace the default rules with this code:

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

3. Click **"Publish"** button

### 3. Test Again

1. Go back to your app: https://unit3quiz-v005-angus.web.app
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Try voting again

## What Each Rule Does

- **`allow read`**: Users can check if they've voted
- **`allow create`**: Users can vote, but only if they haven't voted before (`!exists()` check)
- **`allow update, delete: if false`**: Prevents users from changing or deleting their vote

## Troubleshooting

### Still getting "Permission denied"?
- Make sure you clicked "Publish" after updating rules
- Wait 30 seconds for rules to propagate
- Check that you're signed in

### Still getting "Firestore is not enabled"?
- Make sure you completed Step 1 (Create database)
- Refresh Firebase Console and check if Firestore appears in the left menu

### Can vote multiple times?
- Check that security rules include the `!exists()` check
- Make sure rules are published

## Verify It's Working

After voting successfully:
1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/data
2. Click on "votes" collection
3. You should see your vote document with your user ID

---

**Once Firestore is enabled and rules are set, voting will work!** 🎉

