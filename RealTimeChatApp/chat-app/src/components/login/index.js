import React from 'react'
import { Row, Col, Button, Typography } from 'antd' //In ant, there are 24 cols
import { signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { useNavigate } from 'react-router-dom' // UseHistory was replaced by useNagigate
import { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const {Title} = Typography
const fbProvider = new FacebookAuthProvider()

export default function Login(){
    const navigate = useNavigate()
    const handleFbLogin = async () => {        
       const result = await signInWithPopup(auth, fbProvider)
       const user = result.user
       const additionalInfo = getAdditionalUserInfo(result)
       if(additionalInfo.isNewUser){
        // const newUser = await addDoc(collection(db, "users"),{
        //     displayName: user.displayName,
        //     email: user.email,
        //     photoURL: user.photoURL,
        //     uid: user.uid,
        //     providerId: additionalInfo.providerId
        // })
        const newUser = addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalInfo.providerId,
            keywords: generateKeywords(user.displayName)
        })
        console.log("============")
        console.log(newUser)
       }          
    }
    auth.onAuthStateChanged((user) => {
        if(user){
            navigate('/')
        }
    })
    return(
        <div>
            <Row justify="center" style={{ height: 800 }}> 
                <Col span={8}>
                    <Title style={{ textAlign: 'center'}} level={3}>Fun Chat</Title>
                    <Button style={{ width: '100%', marginBottom: 5}}>
                        Sign in with Google
                    </Button>
                    
                    <Button style={{ width: '100%'}} onClick={handleFbLogin}>
                        Sign in with Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}