import React, { useContext, useState } from "react";
import { Form, Modal, Input } from 'antd';
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddRoomModal(){
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user:{ uid } } = useContext(AuthContext)
    const [form] = Form.useForm();
    const handleOk = () => {
        //handle logic
        //Add new room to firestore
        console.log({ formData: form.getFieldValue()})
        addDocument('rooms', {...form.getFieldValue(), members: [uid]})

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
                title="Create rooms"
                open={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Room Name:" name='name'>
                        <Input placeholder="Type room's name" />
                    </Form.Item>
                    <Form.Item label="Description:" name='description'>
                        <Input.TextArea placeholder="Type description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}