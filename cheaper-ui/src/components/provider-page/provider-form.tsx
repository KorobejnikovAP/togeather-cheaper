import React from 'react';
import { Button, notification, Form, Input, Col, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { RegisterData } from '../../store/interfaces';
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from 'antd/es/notification';
import TextArea from 'antd/lib/input/TextArea';


const { Title } = Typography;


export default function ProviderForm () {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: RegisterData) => {
        console.log('not implemented')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='tc-provider-form'>
            <Row justify='center' className='tc-provider-title'>
                <Col>
                    <Title level={2}>У вас есть товар который вы хотите продать? Свяжитесь с нами!</Title>
                </Col>
            </Row>
            <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='tc-provider-form'
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder='Ваше имя'
                    autoComplete='false'
                />
            </Form.Item>
            
            <Form.Item name={'email'} rules={[{ type: 'email' }]}>
                <Input 
                    placeholder='Email'
                    autoComplete='false'
                />
            </Form.Item>

            <Form.Item
                name="text"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <TextArea rows={4} placeholder="Сообщите нам о вашем товаре" />
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Row>
            </Form.Item>
            </Form>
        </div>
    );
}