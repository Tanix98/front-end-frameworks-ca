import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/index';
import ErrorPage from './pages/ErrorPage/index';
import Home from './pages/HomePage/index';
import Product from './pages/ProductPage/index';
import Checkout from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccessPage';
import Contact from './pages/ContactPage/index';
import { Routes, Route } from 'react-router-dom';

// Use the routers to navigate to different pages, cannot use anchor tags as React is a SPA
// The links in the header are linked to specific routes, which the user will be navigated to when clicking the links

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='product/:id' element={<Product />} />
                <Route path='contact' element={<Contact />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path='checkoutsuccess' element={<CheckoutSuccess />} />
                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;
