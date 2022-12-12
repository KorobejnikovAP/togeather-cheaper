import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import Header from "./header/header";
import LoginPage from './login-page/login-page';
import RegisterPage from './register-page/register-page';
import ProductsPage from './product-pages/products-page';
import ProfilePage from './profile-page/profile-page';
import CreateProductPage from './product-pages/create-product-page';
import ProductPage from './product-pages/product-page';
import CreateCollectionPage from './product-pages/create-collection-page';
import { AppDispatch } from '../store/store';
import { getUserAsync } from '../store/actions/auth';
import 'antd/dist/antd.css';
import './base.sass'


const { Footer, Content } = Layout;
export default function App() {
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
          <Route path='/products/:productId/create-collection' element={<CreateCollectionPage/>}/>
          <Route path='/products/:productId' element={<ProductPage/>}/>
          <Route path='/products/create' element={<CreateProductPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/" element={<ProductsPage/>}/>
        </Routes> 
      </Content>
    </Layout>
  </Router>
  );
}
