import { Button, Col, Row } from 'antd';
import React, { useCallback, useEffect } from 'react';
import CreateCollectionForm from './create-collection-form';

export default function CreateCollectionPage() {
    return (
        <div className='tc-page'>
            <Row justify='center'>
                <Col span={12}>
                    <CreateCollectionForm/>
                </Col>
            </Row>
        </div>
    )
}