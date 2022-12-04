import { Button, Col, Row, Typography } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../../store/reducers/auth';
import './styles.sass'
import { AppState } from '../../store/interfaces';

const { Title } = Typography;

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.auth.user);
    return (
        <Row className='tc-page tc-profile-page' justify='center'>
            <Col>
                <Row justify='center'>
                    <Col>
                        <Title level={3}>Добро пожаловать, {user?.username}</Title>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <Button onClick={() => { 
                            dispatch(logout());
                            navigate('/');
                        }}>
                            Выход
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}