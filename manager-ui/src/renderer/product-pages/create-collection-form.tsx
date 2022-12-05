import { Button, Col, Form, Input, InputNumber, notification, Row, Typography } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCollectionAsync } from '../../store/actions/collections';
import { AppState, CollectionData, Product, ProductData } from '../../store/interfaces';
import { AppDispatch } from '../../store/store';

const { Title } = Typography;

export default function CreateCollectionForm() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const products = useSelector((state: AppState) => state.products.current);
    const { productId } = useParams();
    const product = products.find((pr) => productId ? pr.id === +productId : false);

    const onFinish = (values: CollectionData) => {
        const notificationMutual: { placement: NotificationPlacement, duration: number} = {
            placement: 'topRight',
            duration: 4,
        }
        if (!product) throw Error(`No such product ${productId}`)
        dispatch(createCollectionAsync({ ...values, name_product: product.name })).then(() => {
            notification.success({
                message: 'Сбор создан!',
                description: 'Перенаправляем на страницу продукта',
                ...notificationMutual,
            });
            setTimeout(() => {
                navigate(`/products/${productId}`);
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
                    <Title level={2}>Создать сбор</Title>
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
            
            <Form.Item name='count_for_buy'>
                <InputNumber
                    style={{'width': '100%'}}
                    placeholder='Количество продуктов'
                    autoComplete='false'
                />
            </Form.Item>

            <Form.Item>
                <Row justify='center'>
                    <Button type="primary" htmlType="submit">
                        Создать сбор
                    </Button>
                </Row>
            </Form.Item>
            </Form>
        </div>
    )
}