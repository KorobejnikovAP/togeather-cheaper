import React from 'react';
import { Button, notification, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../store/actions/auth';
import { AppDispatch } from '../../store/store';
import { RegisterData } from '../../store/interfaces';
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from 'antd/es/notification';

export function RegisterForm () {
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
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='tc-login-form'
        >
        <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input 
                autoComplete='false'
             />
        </Form.Item>
        
        <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
            <Input 
                autoComplete='false'
            />
        </Form.Item>

        <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password 
                autoComplete='new-password'
            />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Регистрация
            </Button>
        </Form.Item>
        </Form>
    );
}