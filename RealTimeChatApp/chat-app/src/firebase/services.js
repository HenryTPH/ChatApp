import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config';

export const addDocument = (addCollection, data) =>{
    const query = collection(db, addCollection);
    addDoc(query, {
        ...data,
        createdAt: serverTimestamp()
    })
}

// Sear: "Tun"
/**
 * db: collection "users"
 * {
 *  displayName: "Tung Nguyen David" -> ["Tung", "Nguyen", "David"] -> [Tung, David, Nguyen] -> [David, Nguyen, Tung]...
 *  keywords: ["T", "Tu", " Tun", "Tung"..., "N", "Ng", ...]
 * ...
 * }
 * {
 *  displayName: "ABC Tung"
 * }
 */

//Create keywords for displayName and use it for searching
export const generateKeywords = (displayName) => {
    //List all conversion of name. Ex: name = ["David", "Van", "Tung"]
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length
    let flagArray = []
    let result = []
    let stringArray = []

    /**
     * Generate flag false to use for determine the value at a 
     * particular position is used or not
     */

    for(let i = 0; i < name.length; i++){
        flagArray[i] = false
    }

    const createKeywords = (name) => {
        const arrName = []
        let  curName = '';
        name.split('').forEach(letter => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    }

    function findPermutation(k){
        for(let i = 0; i < length; i++){
            if(!flagArray[i]){
                flagArray[i] = true;
                result[k] = name[i];

                if(k === length - 1){
                    stringArray.push(result.join(' '))
                }

                findPermutation(k+1)
                flagArray[i] = false
            }
        }
    }
    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words]
    }, [])
    return keywords
}