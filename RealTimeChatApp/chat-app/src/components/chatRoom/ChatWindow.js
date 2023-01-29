import React, { useContext } from "react";
import { Row, Col, Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230,230,230);

    .header {
        &__info{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title{
            margin: 0px;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const WrapperStyled = styled.div`
    height: 100%;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230,230,230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`

const MessageListStyled = styled.div`
    max-height: 100%;
    over-flow: auto;

`

export default function ChatWindow(){
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
    console.log({ members })
    return(
        <WrapperStyled>
            {
                selectedRoom.id ? (
                    <><HeaderStyled>
                    <div className='header__info'>
                        <p className='header__title'>{ selectedRoom.name }</p>
                        <span className='header__description'>{ selectedRoom.description }</span>
                    </div>
                    <div>
                        <ButtonGroupStyled>
                            <Button icon={<UserAddOutlined />} type='text' onClick={() => setIsInviteMemberVisible(true)}>Invite</Button>
                            <Avatar.Group size="small" maxCount = {2}>
                                {
                                    members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                                                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0)?.toUpperCase()}</Avatar>
                                                           </Tooltip>)
                                }
                            </Avatar.Group>
                        </ButtonGroupStyled>                    
                    </div>
                </HeaderStyled>
    
                <ContentStyled>
                    <MessageListStyled>
                        <Message text="Test" photoURL={null} displayName="Henry" createdAt={123123123123123} />
                        <Message text="Tet" photoURL={null} displayName="Kenny" createdAt={123123123123123} />
                        <Message text="Hello" photoURL={null} displayName="Danny" createdAt={123123123123123} />
                        <Message text="Love" photoURL={null} displayName="Manny" createdAt={123123123123123} />
                    </MessageListStyled>
                    <FormStyled>
                        <Form.Item>
                            <Input placeholder="New message" bordered={false} autoComplete="off" />
                        </Form.Item>
                        <Button type="primary">Send</Button>
                    </FormStyled>
                </ContentStyled></>
                ) : <Alert message="Let choose a room" type="info" showIcon style={{ margin: 5}} closable/>
            }
            
        </WrapperStyled>        
    )        
}