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
import { Layout } from 'antd';
import { Header } from "./components/header/header";

const { Footer, Content } = Layout;

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
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Content>
      {/* <Footer>
        Footer
      </Footer> */}
    </Layout>
  </Router>
  );
}

export default App;
