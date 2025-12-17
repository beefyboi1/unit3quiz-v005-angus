# Firebase Setup Guide

This guide will walk you through setting up Firebase for this application.

## Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "drug-overdose-awareness")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Voter Registration App")
3. **Don't** check "Set up Firebase Hosting" (unless you want to)
4. Click "Register app"
5. **Copy the firebaseConfig object** - you'll need this!

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Click on the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **Enable** to ON
6. Click "Save"

## Step 4: Update Your Code

Open `src/firebase.js` and replace the firebaseConfig with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",              // Your API Key
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 5: (Optional) Set Up Firestore

If you want to store voter registration data:

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Start in **Test mode** (for development)
4. Choose a location
5. Click "Enable"

### Sample Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /voters/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Only authenticated users can register
    match /registrations/{registrationId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
    }
  }
}
```

## Step 6: Add Voter Storage (Optional Enhancement)

If you want to store voter registrations in Firestore, add this to `src/components/Auth.jsx`:

```javascript
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Inside the register logic (after successful registration):
const user = userCredential.user;
await setDoc(doc(db, 'voters', user.uid), {
  email: user.email,
  registeredAt: serverTimestamp(),
  supportStatement: true
});
```

## Security Best Practices

### For Production:

1. **Never commit Firebase keys to public repositories**
   - Add `src/firebase.js` to `.gitignore` if using real credentials
   - Or use environment variables (see below)

2. **Set up proper Firestore rules** (see above)

3. **Enable Firebase App Check** to prevent abuse

4. **Set up authorized domains** in Firebase Console

### Using Environment Variables (Recommended)

Create a `.env` file:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Testing Authentication

1. Start your dev server: `npm run dev`
2. Open http://localhost:5173
3. Try registering with an email and password
4. Check Firebase Console → Authentication → Users to see registered users

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've enabled Email/Password authentication
- Check that your Firebase config is correct

### "Firebase: Access to this account has been temporarily disabled"
- Firebase has rate limits. Wait a few minutes or upgrade your plan

### CORS errors
- Add your development URL to authorized domains:
  - Firebase Console → Authentication → Settings → Authorized domains
  - Add `localhost`

### "auth/email-already-in-use"
- This email is already registered
- Try logging in instead or use a different email

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## Need Help?

- Firebase Support: https://firebase.google.com/support
- Firebase Community: https://firebase.google.com/community

---

Once you've completed these steps, your application will have full authentication capabilities!

