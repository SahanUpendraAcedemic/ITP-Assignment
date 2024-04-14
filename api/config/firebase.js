/**const admin = require('firebase-admin');

// Replace with the actual path to your downloaded serviceAccountKey.json file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Option 1: Export the entire Firebase Admin app instance
// export default admin;

// Option 2: Export the storage bucket explicitly
const storage = admin.storage().bucket();
export default storage;*/