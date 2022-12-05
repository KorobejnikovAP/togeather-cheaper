
import { Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsAsync } from '../../store/actions/collections';
import { AppState, Collection } from '../../store/interfaces';
import { searchCollections } from '../../store/reducers/collections';
import { AppDispatch } from '../../store/store';
import CollectionCard from './collection-card';
import './styles.sass'

export default function CollectionsPage() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCollectionsAsync());
    }, []);

    const onSearch = useCallback((search:string) => {
        dispatch(searchCollections(search));
    }, []);

    const collections = useSelector((state: AppState) => state.collections.current);

    return (
        <div className='tc-page tc-collections-page'>
            <Row justify='center' style={{ marginBottom: '16px'}}>
                <Col span={22}>
                    <Search placeholder="Поиск товара" onSearch={onSearch} style={{ width: 400 }} />   
                </Col>
            </Row>
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