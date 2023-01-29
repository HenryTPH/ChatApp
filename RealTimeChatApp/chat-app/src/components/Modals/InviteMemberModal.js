import React, { useContext, useState } from "react";
import { Avatar, Form, Modal, Select, Spin, Option } from 'antd';
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from 'lodash'
import { collection, where, query, getDocs, updateDoc, doc, arrayUnion, orderBy, limit } from "firebase/firestore";
import { db } from '../../firebase/config'

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }){
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)
    
            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    console.log(options)
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={ debounceFetcher }
            notFoundContent={ fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            { opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase() }
                        </Avatar>
                        {` ${opt.label}`}
                    </Select.Option>
            ))
            }
        </Select>
    )    
}

async function fetchUserList(search, curMembers){
    const userQuery = query(collection(db, 'users'), orderBy('displayName'), limit(20), where('keywords', 'array-contains', search))
    const querySnapshot = await getDocs(userQuery)
    const result = querySnapshot.docs.map(doc => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
    })).filter(opt => !curMembers.includes(opt.value))
    console.log(result)
    return result
} 

export default function InviteMemberModal(){
    const { isInviteMemberVisible, setIsInviteMemberVisible, setIsAddRoomVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
    const { user:{ uid } } = useContext(AuthContext)
    const [value, setValue] = useState()
    const [form] = Form.useForm();
    const handleOk = async () => {
        //Reset form value
        form.resetFields()
        
        //Update members in current room
        const roomRef = doc(db, 'rooms', selectedRoomId)
        console.log("Heeare")
        console.log(roomRef)

        value.map(async (val) => (
            await updateDoc(roomRef, {
                members: arrayUnion(val.value) //Update element in array
            })
        ))
        setIsInviteMemberVisible(false)
    }

    const handleCancel = () => {
        setIsInviteMemberVisible(false)
    }

    console.log({ value })

    return(
        <div>
            <Modal 
                title="Invite member"
                open={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Members' name"
                        value={value}
                        placeholder="Type member's name"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers = {selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}