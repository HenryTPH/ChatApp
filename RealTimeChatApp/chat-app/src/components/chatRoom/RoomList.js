import React from "react";
import { Row, Col, Collapse, Typography, Button } from 'antd';
import styled from "styled-components";
import { PlusSquareOutlined } from '@ant-design/icons'
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;
// '&&&' use to override css of current class
//Overrid styled of collapse header and content-box
const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }
        
        .addroom{
            color: white;
            padding: 0;
        }
    }
`
const LinkedStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`

export default function RoomList(){
    // const { user:{ uid } } = React.useContext(AuthContext);
    // /**
    //  * {
    //  *  name: 'room name',
    //  *  description: 'detail',
    //  *  members: [uid1, uid2,...]
    //  * }
    //  * 
    //  */

    // const roomsCondition = React.useMemo(() => {
    //     return {
    //         fieldName: 'members',
    //         operator: 'array-contains',
    //         compareValue: uid
    //     }
    // }, [uid])

    // const rooms = useFirestore('rooms', roomsCondition) 

    // console.log({ rooms });

    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext)
    console.log({ rooms })

    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }

    return(
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="List of Room" key={1}>
                {
                    rooms.map((room) => <LinkedStyled key={ room.id } onClick={() => setSelectedRoomId(room.id)}>{ room.name }</LinkedStyled>)
                }
                <Button type="text" icon={<PlusSquareOutlined />} className="addroom" onClick={handleAddRoom}>Add Room</Button>
            </PanelStyled>
        </Collapse>
    )        
}