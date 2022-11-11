import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../store/auth';

export function RegisterForm () {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(loginAsync(values));
    };

    const onFinishFailed = (errorInfo) => {
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
            <Input />
        </Form.Item>
        
        <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Регистрация
            </Button>
        </Form.Item>
        </Form>
    );
};