import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore"
import React from "react"
import { db } from "../firebase/config"

export const useFirestore = (appCollection, condition) => {
    const [documents, setDocuments] = React.useState([]);
    React.useEffect(()=>{
        let collectionRef = collection(db, appCollection); 
        //Condition
        /**
         * {
         *  fieldName: 'abc',
         *  operator: '==', 'in',...,
         *  compareValue: 'adb'
         * }
         */
        if(condition){
            if(!condition.compareValue || !condition.compareValue.length){
                return;
            }
            collectionRef = query(collectionRef, orderBy('createdAt'), where(condition.fieldName, condition.operator, condition.compareValue))
        }

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDocuments(documents)
        })
        return unsubscribe
    },[appCollection, condition])
    return documents
}

export default useFirestore;