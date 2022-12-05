import React from 'react';
import { Card } from 'antd';
import { Product } from '../../store/interfaces';

interface Props {
    product: Product
}

export default function ProductCard (props: Props) {
const { product } = props;
const { name, price } = product;
return (  
    <div className="tc-product-card">
        <Card title={name} style={{ width: 300 }}>
            <p>Цена за шт: {price}</p>
        </Card>
    </div>
  )
}
