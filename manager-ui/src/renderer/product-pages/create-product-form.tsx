import { Button, Col, Form, Input, InputNumber, notification, Row, Typography } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProductAsync } from '../../store/actions/products';
import { Product, ProductData } from '../../store/interfaces';
import { AppDispatch } from '../../store/store';

const { Title } = Typography;

export default function CreateProductForm() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values: ProductData) => {
        const notificationMutual: { placement: NotificationPlacement, duration: number} = {
            placement: 'topRight',
            duration: 4,
        }
        dispatch(createProductAsync(values)).then(() => {
            notification.success({
                message: 'Продукт создан!',
                description: 'Перенаправляем на страницу продуктов',
                ...notificationMutual,
            });
            setTimeout(() => {
                navigate( `/`);
            }, 1000);
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
        <div className='tc-create-product-form'>
            <Row justify='center' className='tc-register-title'>
                <Col>
                    <Title level={2}>Создать продукт</Title>
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
                name="name_product"
                rules={[{ required: true, message: 'Please input product name!' }]}
            >
                <Input
                    placeholder='Название продукта'
                    autoComplete='false'
                />
            </Form.Item>
            
            <Form.Item name='price'>
                <InputNumber
                    style={{'width': '100%'}}
                    placeholder='Цена за шт'
                    autoComplete='false'
                />
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Button type="primary" htmlType="submit">
                        Создать продукт
                    </Button>
                </Row>
            </Form.Item>
            </Form>
        </div>
    )
}