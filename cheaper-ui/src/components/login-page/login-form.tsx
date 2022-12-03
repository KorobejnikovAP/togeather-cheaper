import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../store/actions/auth';
import { AppDispatch } from '../../store/store';
import { LoginData } from '../../store/interfaces';

const { Title } = Typography;

export function LoginForm () {
    const dispatch: AppDispatch = useDispatch();

    const onFinish = (values: LoginData) => {
        dispatch(loginAsync(values));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row justify='center'>
                <Col>
                    <Title level={2}>Вход</Title>
                </Col>
            </Row>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='tc-login-form'
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input 
                    placeholder='Имя пользователя'
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    placeholder='Пароль'            
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 1, span: 16 }}>
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Button type="primary" htmlType="submit">
                            Вход
                    </Button>
                </Row>
            </Form.Item>
            </Form>
        </>
    );
}