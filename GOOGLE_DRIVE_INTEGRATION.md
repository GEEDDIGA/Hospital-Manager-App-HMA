# Google Drive Integration Guide for Goolle Shop

## ✅ Completed Setup

### 1. Google Cloud Platform Configuration
- **Project**: geeddi (ID: fair-root-462221-t4)
- **Google Drive API**: Enabled ✓
- **OAuth Consent Screen**: Configured ✓
  - App Name: Goolle Shop
  - User Type: External
  - Support Email: goolleh1@gmail.com
  - Contact Email: admin@goolle.shop

### 2. OAuth 2.0 Credentials
- **Client ID**: `251115243504-4ei5h3a0uqtn7sh818qmdj603vctqp9m.apps.googleusercontent.com`
- **Client Secret**: `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`
- **Authorized JavaScript Origin**: https://goolle.shop

**⚠️ SECURITY**: Store Client Secret securely. Never commit it to version control.

---

## 🚀 Implementation Steps

### Step 1: Install Dependencies

```bash
npm install gapi-script @react-oauth/google
```

### Step 2: Environment Setup

Create `.env` file (copy from `.env.example`):

```env
VITE_GOOGLE_CLIENT_ID=251115243504-4ei5h3a0uqtn7sh818qmdj603vctqp9m.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_DRIVE_FOLDER_ID=
VITE_APP_NAME=Goolle Shop
```

### Step 3: Create Google Drive Service

Create `src/services/googleDrive.ts`:

```typescript
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let gapiInited = false;
let gisInited = false;
let tokenClient: any;

export const initializeGoogleDrive = () => {
  gapi.load('client', initializeGapiClient);
  gisInited = true;
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
};

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  });
  gapiInited = true;
}

export const uploadFile = async (file: File): Promise<any> => {
  const metadata = {
    name: file.name,
    mimeType: file.type,
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: new Headers({ Authorization: 'Bearer ' + gapi.auth.getToken().access_token }),
      body: form,
    }
  );

  return response.json();
};

export const listFiles = async (): Promise<any> => {
  const response = await gapi.client.drive.files.list({
    pageSize: 10,
    fields: 'files(id, name, webViewLink, mimeType)',
  });
  return response.result.files;
};
```

### Step 4: Create Upload Component

Create `src/components/GoogleDriveUpload.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { initializeGoogleDrive, uploadFile } from '../services/googleDrive';

const GoogleDriveUpload: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    initializeGoogleDrive();
  }, []);

  const handleAuthClick = () => {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setIsSignedIn(true);
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile(file);
      console.log('File uploaded:', result);
      alert(`File uploaded successfully: ${result.name}`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="google-drive-upload">
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Connect Google Drive</button>
      ) : (
        <div>
          <input 
            type="file" 
            onChange={handleFileUpload} 
            disabled={uploading}
          />
          {uploading && <p>Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default GoogleDriveUpload;
```

### Step 5: Load Google API Scripts

Update `index.html` to include Google API scripts:

```html
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client"></script>
```

### Step 6: Use the Component

In your `src/App.tsx` or any page:

```typescript
import GoogleDriveUpload from './components/GoogleDriveUpload';

function App() {
  return (
    <div>
      <h1>Goolle Shop - Product Upload</h1>
      <GoogleDriveUpload />
    </div>
  );
}
```

---

## 📋 Features You Can Implement

1. **Product Image Upload**: Store product photos
2. **User Documents**: Save invoices, receipts
3. **Content Management**: Store marketing materials
4. **File Gallery**: Display uploaded files
5. **File Search**: Search through Drive files
6. **Folder Organization**: Create folders for different categories

---

## 🔒 Security Best Practices

1. **Never expose Client Secret** in frontend code
2. **Use environment variables** for all sensitive data
3. **Implement proper error handling**
4. **Add rate limiting** to prevent API quota exhaustion
5. **Validate file types and sizes** before upload
6. **Use HTTPS only** for all requests

---

## 🐛 Troubleshooting

### Issue: "Access blocked: This app's request is invalid"
**Solution**: Check that your authorized origin (https://goolle.shop) matches exactly.

### Issue: "API key not valid"
**Solution**: Ensure you've created an API key in Google Cloud Console.

### Issue: "Invalid grant"
**Solution**: Re-authorize the application with fresh consent.

---

## 📚 Additional Resources

- [Google Drive API Documentation](https://developers.google.com/drive/api/guides/about-sdk)
- [OAuth 2.0 for Client-side Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google API JavaScript Client](https://github.com/google/google-api-javascript-client)

---

## 🎯 Next Steps

1. ✅ Create `.env` file with your credentials
2. ✅ Install dependencies: `npm install gapi-script @react-oauth/google`
3. ✅ Create `src/services/googleDrive.ts`
4. ✅ Create `src/components/GoogleDriveUpload.tsx`
5. ✅ Add Google API scripts to `index.html`
6. ✅ Test the integration
7. ✅ Deploy to production

---

**Created**: December 15, 2025
**Project**: Goolle Shop (vite-react)
**GCP Project**: geeddi (fair-root-462221-t4)
