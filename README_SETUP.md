# Drug Overdose Crisis Awareness Platform

A React/Vite application featuring drug overdose data visualization, voter registration system, and a political Statement of Intent.

## Features

✅ **Firebase Authentication** - Secure login and registration system  
✅ **Data Visualization** - Interactive charts showing drug overdose statistics  
✅ **Filter by Drug Type** - View specific drug data individually  
✅ **Filter by Month** - Analyze trends month-by-month  
✅ **Statement of Intent** - Comprehensive policy proposal from a political perspective  
✅ **Voter Registration** - Users who sign up are considered registered voters  
✅ **Modern UI** - Beautiful, responsive design with gradient backgrounds

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Firebase** - Authentication and potential data storage
- **Recharts** - Data visualization library
- **CSS3** - Modern styling with gradients and animations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

You need to create a Firebase project and configure it:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Authentication** → **Email/Password** sign-in method
4. Get your Firebase configuration from Project Settings
5. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## Project Structure

```
src/
├── components/
│   ├── Auth.jsx                 # Login/Registration component
│   ├── DataVisualization.jsx    # Charts and data display
│   └── StatementOfIntent.jsx    # Political statement
├── data/
│   └── drugOverdoseData.js      # Sample drug overdose data
├── styles/
│   ├── Auth.css
│   ├── DataVisualization.css
│   └── StatementOfIntent.css
├── App.jsx                       # Main application component
├── App.css                       # Global app styles
├── firebase.js                   # Firebase configuration
├── index.css                     # Root styles
└── main.jsx                      # React entry point
```

## Using the Application

### Registration/Login

1. When you first open the app, you'll see the voter registration/login screen
2. To register:
   - Enter your email address
   - Create a password (minimum 6 characters)
   - Click "Register to Vote"
3. To login:
   - Click "Sign in" toggle
   - Enter your credentials
   - Click "Sign In"

### Viewing Data

Once logged in, you can:

- View overall drug overdose statistics for 2024
- See total deaths by month across all drugs
- Compare deaths by drug type
- Filter by specific drug to see monthly trends
- Filter by specific month to see drug breakdown

### Statement of Intent

Scroll down to read the comprehensive policy proposal addressing the drug overdose crisis, including:

- Data analysis and key findings
- 6-point policy plan
- Funding strategy
- Commitment to action

## Data Notes

The drug overdose data in this application is **simulated for demonstration purposes**. It represents realistic trends showing:

- Fentanyl as the leading cause of overdose deaths
- Increasing death rates throughout 2024
- Various drug types (Fentanyl, Heroin, Cocaine, Methamphetamine, Prescription Opioids)
- Monthly breakdowns for the year 2024

## Firebase Security Rules

For production use, add these security rules to your Firebase project:

### Firestore Rules (if using Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Authentication

Ensure Email/Password authentication is enabled in Firebase Console.

## Customization

### Updating the Data

Edit `src/data/drugOverdoseData.js` to modify the dataset. You can:

- Add more months
- Add different drug types
- Update statistics
- Change colors for different drugs

### Modifying the Statement

Edit `src/components/StatementOfIntent.jsx` to change the political stance or policy proposals.

### Styling

All CSS files are in `src/styles/` and `src/App.css`. Modify these to change colors, layouts, or add new styles.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions, please check the Firebase documentation and React documentation.

---

**Note:** Remember to replace the placeholder Firebase configuration with your actual Firebase project credentials before deploying.

