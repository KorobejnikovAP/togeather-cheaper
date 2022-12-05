
import { Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsAsync } from '../../store/actions/collections';
import { AppState, Collection } from '../../store/interfaces';
import { AppDispatch } from '../../store/store';
import CollectionCard from './collection-card';
import './styles.sass'

export default function CollectionsPage() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCollectionsAsync());
    }, []);

    const collections = useSelector((state: AppState) => state.collections.current);

    return (
        <div className='tc-page tc-collections-page'>
            <Row justify='center'>
                <Col span={22}>
                    {
                        collections?.map((collection: Collection) => {
                            return <CollectionCard collection={collection} key={collection.id}/>
                        })
                    }
                </Col>
            </Row>
        </div>
    )
}