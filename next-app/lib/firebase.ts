import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { FirebaseResponse } from "type";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsF2G6kG0ivGAfDg6bQoE21i5Yr_Guyg8",
  authDomain: "weighty-triode-359415.firebaseapp.com",
  projectId: "weighty-triode-359415",
  storageBucket: "weighty-triode-359415.appspot.com",
  messagingSenderId: "642993486547",
  appId: "1:642993486547:web:68a0511a05ef43acd87226",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const signInAuth = () =>
  new Promise<FirebaseResponse>((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/fitness.location.read");
    provider.setCustomParameters({
      clientId: process.env.NEXT_PUBLIC_client_id!,
      clientSecret: process.env.NEXT_PUBLIC_client_secret!,
      redirectUri: process.env.NEXT_PUBLIC_redirect_uris!,
    });
    console.log(process.env.NEXT_PUBLIC_client_id);
    console.log(process.env.NEXT_PUBLIC_client_secret);
    console.log(process.env.NEXT_PUBLIC_redirect_uris);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
        resolve(user as unknown as FirebaseResponse);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  });

export const signOutAuth = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const userToken = async () => {
  return await getAuth(app).currentUser?.getIdToken();
};
