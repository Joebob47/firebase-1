/*this file does all authentication to tell firebase who we are and get us logged in*/

//****** whenever we import this file from another file it will run all of this code and connect to our firebase database. It returns back the firestore object

//we have to load firebase admin pkg in order to interact w/ our firebase project and database
import admin from 'firebase-admin';

//to get ready to send an authentication request from firebase, we load our json
// here we load our json string and convert to an actual JSON obj instead of loading a file. This is more secure.
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_KEY
);

//wrap all of our code that tries to talk to firebase in a try, to catch errors
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
  });
} catch(err) {
  if ( err.message.indexOf("already exists") === -1 ) {
    console.log("firebase err:", err.stack);
  }
}

export default admin.firestore();
