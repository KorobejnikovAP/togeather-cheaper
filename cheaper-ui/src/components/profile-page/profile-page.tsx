import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import { logout } from '../../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './styles.sass'
import { AdressData, AppState } from '../../store/interfaces';
import { setAdressAsync } from '../../store/actions/auth';
import { AppDispatch } from '../../store/store';
import { NotificationPlacement } from 'antd/lib/notification';

const { Title } = Typography;

export default function ProfilePage() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.auth.user);
    useEffect(()=>{
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    const onFinish = (values: AdressData) => {
        const notificationMutual: { placement: NotificationPlacement, duration: number} = {
            placement: 'topRight',
            duration: 4,
        }
        if (user) dispatch(setAdressAsync({ ...values, user_id: user.id})).then(() => {
            notification.success({
                message: 'Адрес изменен!',
                ...notificationMutual,
            });
        }).catch((err) => {
            console.log(err);
            notification.error({
                message: 'Ошибка!',
                ...notificationMutual,
            });
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className='tc-page tc-profile-page' justify='center'>
            <Col span={12}>
                <Row justify='center' className='tc-profile-welcome'>
                    <Col flex='auto'>
                        <Title level={3}>Добро пожаловать, {user?.username}</Title>
                    </Col>
                </Row>
                <Row justify='start' className='tc-adress'>
                    <Col>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row>
                            <Col>
                                <Form.Item
                                    name="adress"
                                    rules={[{ required: true, message: 'Please input your adress!' }]}
                                    >
                                    <Input 
                                        placeholder='Адрес доставки'
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button form="basic" type="primary" htmlType="submit">
                                    Изменить
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col flex='auto'>
                        <Button onClick={() => { 
                            dispatch(logout());
                            navigate('/');
                        }}>
                            Выход
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}