import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Spin } from 'antd'
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFireStore";

export const AppContext = React.createContext();

export default function AppProvider( { children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')

    const { user:{ uid } } = React.useContext(AuthContext);
    /**
     * {
     *  name: 'room name',
     *  description: 'detail',
     *  members: [uid1, uid2,...]
     * }
     * 
     */
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition) 

    const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId) || {}, [rooms, selectedRoomId])

    console.log(selectedRoom.members);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        };
    }, [selectedRoom.members])

    const members = useFirestore('users', usersCondition)
    

    console.log({members})

    console.log({rooms});
    
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId, selectedRoom, members }}>
            {children}
        </AppContext.Provider>            
    )
}