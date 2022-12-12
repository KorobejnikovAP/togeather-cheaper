
import { Row, Col } from 'antd';
import { Header as HeaderAnt } from 'antd/lib/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../store/interfaces';
import './styles.sass';

export default function Header() {
  const user = useSelector((state: AppState) => state.auth.user);

    return (
      <HeaderAnt className="tc-header">
        <Row justify='space-between'>
          <Col>
            <Link to="/" className="c1">Главная</Link>
            <Link to="/for-providers" className="c1">Для поставщиков</Link>
          </Col>
          <Col>
            {
              user ? (
                <>
                  <Link to="/cart">Корзина</Link>
                  <Link to="/profile">{user.username}</Link>     
                </>
              ) : (
                <>
                  <Link to="/login">Вход</Link>
                  <Link to="/register">Регистрация</Link> 
                </>
              )
            }
          </Col>
        </Row>
      </HeaderAnt>
    )
}