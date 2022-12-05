/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { AppState, Collection, Product } from '../../store/interfaces';
import { useSelector } from 'react-redux';

interface Props {
    collection: Collection
}

export default function CollectionCard (props: Props) {
const { collection } = props;
const { id, count_for_buy } = collection;
const navigate = useNavigate();
const user = useSelector((state: AppState) => state.auth.user);

return (  
    <div className="tc-product-card">
        <Card title={`Сбор #${id} | ${collection.product.name} | Цена: ${collection.product.price}р`} style={{ width: 300 }}>
            <p>Количество товара: {count_for_buy}</p>
            <p>Количество участников: 0</p>
            {user && <Button>Принять участие в сборе</Button>} 
        </Card>
    </div>
  )
}
