import React from 'react'
import { Row, Col, Button, Typography } from 'antd' //In ant, there are 24 cols
import { auth, app } from '../../firebase/config';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const {Title} = Typography
const fbProvider = new FacebookAuthProvider()

export default function Login(){
    const auth = getAuth();
    const handleFbLogin = () => {
        signInWithPopup(auth, fbProvider)
    }
    auth.onAuthStateChanged((user) => {
        console.log({user});
        if(user){
            
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