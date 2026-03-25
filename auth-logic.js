import { auth, db } from './firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// 1. Potato ID を生成する関数
const generatePotatoId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PBID-${result}`;
};

// 2. Googleログイン & ID発行
export const signInWithPotato = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // すでに登録済みか確認
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // 初回ログインなら Potato ID を新規発行！
      const newPotatoId = generatePotatoId();
      
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        potatoId: newPotatoId, // これがあなたのPotato ID
        createdAt: new Date()
      });
      
      console.log("Welcome to PotatoPlan! Your ID:", newPotatoId);
    } else {
      console.log("Welcome back!", userDoc.data().potatoId);
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
};
