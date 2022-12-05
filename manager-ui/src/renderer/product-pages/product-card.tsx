import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Product } from '../../store/interfaces';

interface Props {
    product: Product
}

export default function ProductCard (props: Props) {
const { product } = props;
const { name, price } = product;
const navigate = useNavigate();
return (  
    <div className="tc-product-card" >
        <Card title={name} style={{ width: 300 }} onClick={()=>{ navigate(`/products/${product.id}`) }}>
            <p>Цена за шт: {price}р</p>
        </Card>
    </div>
  )
}
