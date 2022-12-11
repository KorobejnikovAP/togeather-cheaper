import { Col, Row } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppState } from '../../store/interfaces';
import ProviderForm from './provider-form';

import './styles.sass'



export default function ProviderPage() {
    const navigate = useNavigate();
    return (
        <Row className='tc-page tc-register-page' justify='center'>
            <Col span={14}>
                <Row justify='center'>
                    <Col>
                        <ProviderForm/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}