const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Ensure common local firestore database features are mapped uniformly
module.exports = { db };