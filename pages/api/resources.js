import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_KEY
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NNEXT_PUBLIC_FIREBASE_URL,
  });
} catch(err) {
  if ( err.message.indexOf("already exists") === -1 ) {
    console.log("firebase err:", err.stack);
  }
}

export default admin.firestore();
