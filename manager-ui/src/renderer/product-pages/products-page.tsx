import { Button, Col, Row, Typography } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch } from '../../store/store';
import { AppState, Product } from '../../store/interfaces';
import { getProductsAsync } from '../../store/actions/products';
import ProductCard from './product-card';
import './style.sass';

export default function ProductsPage() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: AppState) => state.auth.user);
    const products = useSelector((state: AppState) => state.products.current);
    useEffect(() => {
        if(!user) navigate('/login');
    }, [user, navigate]);

    useEffect(() => {
        if (user) {
            dispatch(getProductsAsync(user.id));
        }
    }, [user, dispatch]);

    const onAdd = useCallback(() => {
        navigate('/products/create');
    }, [navigate]);
    return (
        <div className='tc-page'>
            <Row justify='center'>
                <Col span={20}>
                    <Row justify='end'>
                        <Col>
                            <Button onClick={onAdd} type='primary'>
                                Добавить товар
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={22}>
                    <Row>
                        {
                            products?.map((product: Product) => {
                                return <ProductCard product={product} key={product.id}/>
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}