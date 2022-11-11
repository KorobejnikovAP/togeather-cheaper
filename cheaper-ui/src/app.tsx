import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { HomePage } from "./components/home-page/home-page";
import { LoginPage } from "./components/login-page/login-page";
import { RegisterPage } from "./components/register-page/register-page";
import { ProfilePage } from "./components/profile-page/profile-page";
import { Layout, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "./store/interfaces";

const { Header, Footer, Content } = Layout;

function App() {
  const user = useSelector((state: AppState) => state.auth.user);
  return (
    <Router>
    <Layout className='tc-main'>
      <Header className="tc-header">
        <Row justify='space-between'>
          <Col>
            <Link to="/" className="c1">Главная</Link>
          </Col>
          <Col>
            {
              user ? (
                <Link to="/profile">{user.username}</Link>
              ) : (
                <>
                  <Link to="/login">Вход</Link>
                  <Link to="/register">Регистрация</Link> 
                </>
              )
            }
          </Col>
        </Row>
      </Header>
      <Content>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Content>
      <Footer>
        Footer
      </Footer>
    </Layout>
  </Router>
  );
}

export default App;
