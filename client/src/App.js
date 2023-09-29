import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Menu } from './Inventory/menu/menu';
import { Register } from './Inventory/registration/registration';
import { Login } from './Inventory/login/login';
import { Dashboard } from './Inventory/dashboard/dashboard';
import { Add } from './Inventory/add product/addproduct';
import { Update } from './Inventory/product update/update';
import { Location } from './Inventory/locations/location';
import { Dispatch } from './Inventory/dispatch/dispatch';
import { Home } from './Inventory/home/home';
import { Contact } from './Inventory/contact/contact';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/home' element={[<Menu />, <Home />]} />
          <Route path='/reg' element={[<Menu />, <Register />]} />
          <Route path='/log' element={[<Menu />, <Login />]} />
          <Route path='/dashboard/:id' element={[<Dashboard />]} />
          <Route path='/add' element={[<Add />]} />
          <Route path='/proupd/:product_id' element={<Update />} />
          <Route path='/loc' element={<Location />} />
          <Route path='/dispatch/:product_id' element={<Dispatch />} />
          <Route path='/cont' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
