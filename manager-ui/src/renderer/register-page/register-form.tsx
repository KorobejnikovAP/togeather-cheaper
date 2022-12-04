import React from 'react';
import { Button, notification, Form, Input, Col, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from 'antd/es/notification';
import { registerAsync } from '../../store/actions/auth';
import { AppDispatch } from '../../store/store';
import { RegisterData } from '../../store/interfaces';


const { Title } = Typography;


export default function RegisterForm () {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: RegisterData) => {
        const notificationMutual: { placement: NotificationPlacement, duration: number} = {
            placement: 'topRight',
            duration: 4,
        }
        dispatch(registerAsync(values)).then(() => {
            notification.success({
                message: 'Регистрация завершена!',
                description: 'Перенаправляем на главную страницу через несколько секунд',
                ...notificationMutual,
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);
            return null;
        }).catch((err) => {
            console.log(err);
            notification.error({
                message: 'Registration error!',
                description: 'An error occured, check console for details',
                ...notificationMutual,
            });
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='tc-login-form'>
            <Row justify='center' className='tc-register-title'>
                <Col>
                    <Title level={2}>Регистрация</Title>
                </Col>
            </Row>
            <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder='Имя пользователя'
                    autoComplete='false'
                />
            </Form.Item>
            
            <Form.Item name='email' rules={[{ type: 'email' }]}>
                <Input 
                    placeholder='Email'
                    autoComplete='false'
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    placeholder='Пароль'
                    autoComplete='new-password'
                />
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Button type="primary" htmlType="submit">
                        Регистрация
                    </Button>
                </Row>
            </Form.Item>
            </Form>
        </div>
    );
}