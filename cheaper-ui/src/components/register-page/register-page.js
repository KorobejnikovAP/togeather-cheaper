import { Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RegisterForm } from './register-form';
import './styles.sass'


const { Title } = Typography;

export function RegisterPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if(user) navigate('/');
    }, [user])
    return (
        <Row className='tc-page tc-register-page' justify='center'>
            <Col span={7}>
                <Row justify='center'>
                    <Col span={15}>
                        <Title level={2}>Регистрация</Title>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col flex='auto'>
                        <RegisterForm/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}