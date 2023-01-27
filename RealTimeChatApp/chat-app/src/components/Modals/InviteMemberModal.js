import React, { useContext, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from 'lodash'

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }){
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)
    
            fetchOptions(value).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    return (
        <Select
            labelInValue
            onSearch={ debounceFetcher }
            notFoundContent={ fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {
                //[(lable:, value, photoURL)]
                options.map(opt => {
                    <Select.Option>
                        <Avatar size="small" src={opt.photoURL}>
                            { opt.photoURL ? '' : opt.label?.CharacterData(0).toUpperCase() }
                        </Avatar>
                        {` ${opt.label}`}
                    </Select.Option>
                })
            }
        </Select>
    )    
}

async function fetchUserList(){

} 

export default function InviteMemberModal(){
    const { isInviteMemberVisible, setIsInviteMemberVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user:{ uid } } = useContext(AuthContext)
    const [value, setValue] = useState()
    const [form] = Form.useForm();
    const handleOk = () => {
        //Reset form value
        form.resetFields()
        
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false)
    }
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
                    />
                </Form>
            </Modal>
        </div>
    )
}