import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { Collection, Product } from '../../store/interfaces';

interface Props {
    collection: Collection
}

export default function CollectionCard (props: Props) {
const { collection } = props;
const { id, count_for_buy } = collection;
const navigate = useNavigate();
return (  
    <div className="tc-product-card" >
        <Card title={`Сбор #${id}`} style={{ width: 300 }}>
            <p>Количество товара: {count_for_buy}</p>
            <p>Суммарная цена: {count_for_buy*collection.product.price}р</p>
            <p>Количество участников: 0</p>
            <Button>Закрыть сбор</Button>
        </Card>
    </div>
  )
}
