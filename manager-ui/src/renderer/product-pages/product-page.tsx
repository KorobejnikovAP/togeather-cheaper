import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollectionsAsync } from '../../store/actions/collections';
import { AppState, Collection, Product } from '../../store/interfaces';
import CollectionCard from './collection-card';


export default function ProductPage () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: AppState) => state.products.current);
    const { productId } = useParams();
    const product = products.find((pr) => productId ? pr.id === +productId : false);

    useEffect(()=>{
        dispatch(getCollectionsAsync());
    }, [product, dispatch]);
    const collections = useSelector((state: AppState) => state.collections.current);
    const currentCollections = collections.filter((collection) => collection.product.id === product?.id);
    
    return (  
        <div className='tc-page'>
            <Row justify='center'>
                <Col span={22}>
                    <Row justify='space-between'>
                        <Col>
                            Название: { product?.name }, Цена за штуку: { product?.price }р
                        </Col>
                        <Col>
                            <Button onClick={()=> navigate(`/products/${product?.id}/create-collection`)} type='primary'>
                                Добавить сбор
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={22}>
                    <Row>
                        {
                            currentCollections?.length ? 
                                currentCollections?.map((collection: Collection) => {
                                    return <CollectionCard collection={collection} key={collection.id}/>
                                }) : <Typography.Title level={3}>Сборы отсутствуют</Typography.Title>
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
