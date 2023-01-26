import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config';

export const addDocument = (addCollection, data) =>{
    const query = collection(db, addCollection);
    addDoc(query, {
        ...data,
        createdAt: serverTimestamp()
    })
}