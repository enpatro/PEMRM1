# PEMRM1 KPI Visible Entry Fixed Bundle

Upload all files to GitHub repository root. This version shows all KPI rows by default. User selects month and fills only Actual / Trend / Judgt / Remarks on right side.

If data is not saving, update Firestore Rules temporarily:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

Important: Authentication > Email/Password must be enabled and user must exist.
