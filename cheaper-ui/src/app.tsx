import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CollectionsPage from "./components/collections-page/collections-page";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";
import ProfilePage from "./components/profile-page/profile-page";
import { Layout } from 'antd';
import Header from "./components/header/header";

const { Content } = Layout;

function App() {
  return (
    <Router>
    <Layout className='tc-main'>
      <Header/>
      <Content>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/" element={<CollectionsPage/>}/>
        </Routes>
      </Content>
    </Layout>
  </Router>
  );
}

export default App;
