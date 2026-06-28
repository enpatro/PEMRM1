# PE-3F KPI Firebase Web App

## Firebase Setup
1. Go to https://console.firebase.google.com
2. Create project: PE-3F-KPI
3. Build > Authentication > Get started > Sign-in method > Enable Email/Password
4. Build > Firestore Database > Create database > Start in test mode first
5. Project settings > General > Add app > Web app > copy config
6. Paste config in `firebase-config.js`
7. Authentication > Users > Add user: create admin email/password manually
8. Open `admin.html` after login and map admin/user roles

## GitHub Upload
Upload all files to GitHub repository root and enable Settings > Pages > Deploy from branch > main/root.

## Firestore Collections
- kpis
- absot
- roles

## PPT Automation
Download data CSV from dashboard, then run `ppt_export.py` locally with Python to create PPT.
