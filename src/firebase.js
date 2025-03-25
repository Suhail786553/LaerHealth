import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // ✅ Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDVNap1F5OB_K3XUHv4mN4uCtadKDyGIcQ",
  authDomain: "laerhealth.firebaseapp.com",
  projectId: "laerhealth",
  storageBucket: "laerhealth.appspot.com",  // ✅ Fix storageBucket URL
  messagingSenderId: "814499859426",
  appId: "1:814499859426:web:e826dec9d3d76ccfed87bb"
};

// ✅ Check if Firebase is already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
