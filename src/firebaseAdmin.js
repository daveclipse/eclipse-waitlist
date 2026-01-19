// Lazy initialization - only init when actually needed (in API handlers)
console.log("[firebaseAdmin.js] Module loaded at", new Date().toISOString());

let _admin = null;
let _adminDb = null;
let _initialized = false;

function getCredential() {
  console.log("[firebaseAdmin] getCredential() called at", new Date().toISOString());
  
  // Production: Use JSON from environment variable
  if (process.env.FIREBASE_ADMIN_CREDENTIALS_JSON) {
    console.log("[firebaseAdmin] Using FIREBASE_ADMIN_CREDENTIALS_JSON");
    try {
      const creds = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);
      return require("firebase-admin").credential.cert(creds);
    } catch (error) {
      console.error("[firebaseAdmin] Error parsing FIREBASE_ADMIN_CREDENTIALS_JSON:", error);
      throw error;
    }
  }
  
  // Development: Try to read serviceAccountKey.json directly (avoids blocking on applicationDefault)
  const fs = require("fs");
  const path = require("path");
  const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json");
  
  if (fs.existsSync(serviceAccountPath)) {
    console.log("[firebaseAdmin] Reading serviceAccountKey.json from", serviceAccountPath);
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
      return require("firebase-admin").credential.cert(serviceAccount);
    } catch (error) {
      console.error("[firebaseAdmin] Error reading serviceAccountKey.json:", error);
      throw error;
    }
  }
  
  // Fallback: Use GOOGLE_APPLICATION_CREDENTIALS file path (local dev)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("[firebaseAdmin] Using GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
    // Check if file exists before calling applicationDefault to avoid blocking
    if (fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      return require("firebase-admin").credential.applicationDefault();
    } else {
      throw new Error(`GOOGLE_APPLICATION_CREDENTIALS file not found: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
    }
  }
  
  throw new Error("Firebase Admin credentials not configured. Set FIREBASE_ADMIN_CREDENTIALS_JSON (production), place serviceAccountKey.json in project root, or set GOOGLE_APPLICATION_CREDENTIALS (local dev)");
}

function initializeAdmin() {
  if (!_initialized) {
    console.log("[firebaseAdmin] initializeAdmin() called at", new Date().toISOString());
    // Lazy require - only when actually called from API handler
    if (!_admin) {
      console.log("[firebaseAdmin] Requiring firebase-admin module");
      _admin = require("firebase-admin");
      console.log("[firebaseAdmin] firebase-admin module loaded");
    }
    
    if (!_admin.apps.length) {
      console.log("[firebaseAdmin] Initializing Firebase Admin app");
      try {
        _admin.initializeApp({
          credential: getCredential(),
        });
        console.log("[firebaseAdmin] Firebase Admin app initialized successfully");
      } catch (error) {
        console.error("[firebaseAdmin] Initialization error:", error);
        throw error;
      }
    } else {
      console.log("[firebaseAdmin] Firebase Admin app already initialized");
    }
    _initialized = true;
  }
}

// Lazy getter for Firestore - only initializes when first accessed
function getAdminDb() {
  console.log("[firebaseAdmin] getAdminDb() called at", new Date().toISOString());
  if (!_adminDb) {
    initializeAdmin();
    console.log("[firebaseAdmin] Getting Firestore instance");
    _adminDb = _admin.firestore();
    console.log("[firebaseAdmin] Firestore instance obtained");
  }
  return _adminDb;
}

// Export object with getter properties - these only execute when accessed
export const adminDb = {
  get collection() {
    console.log("[firebaseAdmin] adminDb.collection getter accessed at", new Date().toISOString());
    const db = getAdminDb();
    return db.collection.bind(db);
  },
  get runTransaction() {
    console.log("[firebaseAdmin] adminDb.runTransaction getter accessed at", new Date().toISOString());
    const db = getAdminDb();
    return db.runTransaction.bind(db);
  },
};

// Export function for direct access
export function getFirestore() {
  return getAdminDb();
}

export default function getAdmin() {
  initializeAdmin();
  return _admin;
}
