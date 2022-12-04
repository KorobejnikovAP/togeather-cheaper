import { Col, Row } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppState } from '../../store/interfaces';
import RegisterForm from './register-form';
import './styles.sass'



export default function RegisterPage() {
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.auth.user);
    useEffect(() => {
        if(user) navigate('/');
    }, [user])
    return (
        <Row className='tc-page tc-register-page' justify='center'>
            <Col span={8}>
                <Row justify='center'>
                    <Col>
                        <RegisterForm/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}