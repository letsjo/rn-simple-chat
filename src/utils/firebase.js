import { initializeApp } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../../firebase.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const app = initializeApp(config);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export const signout = async () => {
  await signOut(auth);
  return {};
};

export const signup = async ({ name, email, password, photoUrl }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photoUrl);
  await updateProfile(auth.currentUser, { displayName: name, photoURL });
  return user;
};

const uploadImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserInfo = async photo => {
  const photoUrl = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoUrl });
  return photoUrl;
};

const db = getFirestore(app);

export const createChannel = async ({ title, description }) => {
  const channelCollection = collection(db, 'channels');
  const newChannelRef = doc(channelCollection);
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createdAt: Date.now(),
  };
  await setDoc(newChannelRef, newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  const docRef = doc(db, `channels/${channelId}/messages`, message._id);
  await setDoc(docRef, { ...message, createdAt: Date.now() });
};