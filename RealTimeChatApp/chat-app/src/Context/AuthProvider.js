import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Spin } from 'antd'

export const AuthContext = React.createContext();

export default function AuthProvider( { children }) {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate()
    const auth = getAuth()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if(user){
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                })
                setIsLoading(false)
                navigate('/')
                //setIsLoading(false)
                return
            }
            setIsLoading(false)
            navigate('/login')            
        })
        
        //Clean function
        return () => {
            unsubscribed();
        }
    }, [navigate])
    
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>            
    )
}