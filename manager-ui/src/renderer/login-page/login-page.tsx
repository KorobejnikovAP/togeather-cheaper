import { Col, Row } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoginForm from './login-form';
import './styles.sass'
import { AppState } from '../../store/interfaces';

export default function LoginPage() {
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.auth.user);
    useEffect(() => {
        if(user) navigate('/');
    }, [user, navigate])
    return (
        <Row className='tc-page tc-login-page' justify='center'>
            <Col span={8}>
                <Row justify='center'>
                    <Col>
                        <LoginForm/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}