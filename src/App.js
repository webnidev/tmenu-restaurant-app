import React from "react";
import MainNav from "./MainNav";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import  ProtectedRoute  from './Helper/ProtectedRoute'
import RedirectToHome from './Helper/RedirectToHome'
import Home from "./Components/Home";
import MenuIndex from "./Components/Menu/MenuIndex";
import CreateItemMenu from "./Components/Menu/CreateItemMenu";
import AccountIndex from "./Components/Account/AccountIndex";
import CustomersIndex from "./Components/Customers/CustomersIndex";
import InvoicesIndex from "./Components/Invoices/InvoicesIndex";
import OrdersIndex from "./Components/Orders/OrdersIndex";
import TablesIndex from "./Components/Tables/TablesIndex";
import UsersIndex from "./Components/Users/UsersIndex";
import ReportsIndex from "./Components/Reports/ReportsIndex";
import SettingsIndex from "./Components/Settings/SettingsIndex";
import PrintersIndex from "./Components/Printers/PrintersIndex";
import Login from "./Components/Auth/Login"
import Logout from "./Components/Logout/Logout"
import { UserStorage } from './UserContext';
import {CompanyStorage} from './CompanyContext';
import Product from "./Components/Menu/Product";
const App = () => {
  return (
    <>          
    <BrowserRouter>  
      <div className={"MainContainer"}>
        <CompanyStorage>
          <UserStorage>
            <Routes>
              <RedirectToHome path="/login" element={<Login />} />
              <ProtectedRoute path="/" element={<Home />} end />
              <ProtectedRoute path="/cardapio" element={<MenuIndex />} />
              <ProtectedRoute path="/pedidos" element={<OrdersIndex />} />
              <ProtectedRoute path="/mesas" element={<TablesIndex />} />
              <ProtectedRoute path="/clientes" element={<CustomersIndex />} />
              <ProtectedRoute path="/minhas-faturas" element={<InvoicesIndex />} />
              <ProtectedRoute path="/usuarios" element={<UsersIndex />} />
              <ProtectedRoute path="/relatorios" element={<ReportsIndex />} />          
              <ProtectedRoute path="/configuracoes" element={<SettingsIndex />} />
              <ProtectedRoute path="/impressoras" element={<PrintersIndex />} />
              <ProtectedRoute path="/meu-perfil" element={<AccountIndex />} />
              <ProtectedRoute path="/logout" element={<Logout />} />
              <ProtectedRoute path="/add-product" element={<CreateItemMenu/>} />
              <ProtectedRoute path="/product/:id" element={<Product/>}/>
            </Routes>
          </UserStorage>
         </CompanyStorage>
      </div>    
      </BrowserRouter>  
    </>
  );
};

export default App;
