import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // * Sing Up with Email and Password
  const signUpWithEmailAndPassWord = (email, Password) => {
    return createUserWithEmailAndPassword(auth, email, Password);
  };

  // * Login with Email and Password
  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // * Sign In with Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () =>{
    return signInWithPopup(auth, googleProvider)
  }

  // * Sing OUt User
  const signOUt = () => {
    return signOut(auth);
  };

  // * Track User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    signUpWithEmailAndPassWord,
    loginWithEmailAndPassword,
    signInWithGoogle,
    user,
    setUser,
    signOUt,
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
