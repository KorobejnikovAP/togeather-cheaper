import { Button, Col, Row } from 'antd';
import React, { useCallback, useEffect } from 'react';
import CreateProductForm from './create-product-form';

export default function CreateProductPage() {
    return (
        <div className='tc-page'>
            <Row justify='center'>
                <Col span={12}>
                    <CreateProductForm/>
                </Col>
            </Row>
        </div>
    )
}