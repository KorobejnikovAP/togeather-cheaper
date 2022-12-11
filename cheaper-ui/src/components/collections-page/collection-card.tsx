/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { AppState, Collection, Product } from '../../store/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { joinCollectionAsync } from '../../store/actions/collections';

interface Props {
    collection: Collection
}

export default function CollectionCard (props: Props) {
const { collection } = props;
const { id, count_for_buy, is_active, count_current_buyers } = collection;
const navigate = useNavigate();
const dispatch: AppDispatch = useDispatch();
const user = useSelector((state: AppState) => state.auth.user);
const onAdd = () => {
    dispatch(joinCollectionAsync(id));
};
const button = (
    is_active ? <Button>Вы участвуете в сборе</Button> : <Button onClick={onAdd}>Принять участие в сборе</Button>
)
return (  
    <div className={`tc-product-card ${is_active ? 'tc-product-card-active' : ''}`}>
        <Card title={`Сбор #${id} | ${collection.product.name} | Цена: ${collection.product.price}р`} style={{ width: 300 }}>
            <p>Количество товара: {count_for_buy}</p>
            <p>Количество участников: {count_current_buyers}</p>
            {user && (count_for_buy > count_current_buyers ? button : null)} 
        </Card>
    </div>
  )
}
