import React, { useEffect } from "react";
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
import ProviderPage from "./components/provider-page/provider-page";
import CartPage from "./components/cart-page/cart-page";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { getUserAsync } from "./store/actions/auth";

const { Content } = Layout;

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsync());
  })
  return (
    <Router>
    <Layout className='tc-main'>
      <Header/>
      <Content>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/for-providers" element={<ProviderPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/" element={<CollectionsPage/>}/>
        </Routes>
      </Content>
    </Layout>
  </Router>
  );
}

export default App;
