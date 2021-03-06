import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "./Logo";
import "material-icons";

import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  List,
  ListItem,
  ListItemGraphic,
  Badge,
} from "rmwc";

import "rmwc/dist/styles";
import "./GlobalCustom.css";
import Home from "./Components/Home";
import MenuIndex from "./Components/Menu/MenuIndex";
import AccountIndex from "./Components/Account/AccountIndex";
import CustomersIndex from "./Components/Customers/CustomersIndex";
import InvoicesIndex from "./Components/Invoices/InvoicesIndex";
import OrdersIndex from "./Components/Orders/OrdersIndex";
import TablesIndex from "./Components/Tables/TablesIndex";
import UsersIndex from "./Components/Users/UsersIndex";
import ReportsIndex from "./Components/Reports/ReportsIndex";
import SettingsIndex from "./Components/Settings/SettingsIndex";
import PrintersIndex from "./Components/Printers/PrintersIndex";

const MainNav = () => {

  //const [billingNotify, setBillingNotify] = React.useState("");

  return (
    <>

    
      <BrowserRouter>
        <Drawer>
          <DrawerHeader>
            <Logo/>
            {/* <DrawerSubtitle>Subtítulo</DrawerSubtitle> */}
          </DrawerHeader>
          <DrawerContent className={"Menu"}>
            <hr className={"Divider"} />
            <List>
              <ListItem tag={Link} to="/">
                <ListItemGraphic icon="dashboard" /> Painel
              </ListItem>
              <ListItem tag={Link} to="/cardapio">
                <ListItemGraphic icon="restaurant" /> Cardápio
              </ListItem>
              <ListItem tag={Link} to="/pedidos">
                <ListItemGraphic icon="list" /> Pedidos
              </ListItem>
              <ListItem tag={Link} to="/mesas">
                <ListItemGraphic icon="view_comfy" /> Mesas <Badge align="inline" label={3} style={{ background: '#2196f3' }} />
              </ListItem>
              <ListItem tag={Link} to="/clientes">
                <ListItemGraphic icon="supervisor_account" /> Clientes
              </ListItem>
              <ListItem tag={Link} to="/minhas-faturas">
                <ListItemGraphic icon="attach_money" /> Minhas Faturas <Badge align="inline" label={2} />
              </ListItem>
              <ListItem tag={Link} to="/usuarios">
                <ListItemGraphic icon="supervised_user_circle" /> Usuários do
                Sistema
              </ListItem>
              <ListItem tag={Link} to="/relatorios">
                <ListItemGraphic icon="bar_chart" /> Relatórios
              </ListItem>
              <hr className={"Divider"} />              
              <ListItem tag={Link} to="/configuracoes">
                <ListItemGraphic icon="settings" /> Configurações Gerais
              </ListItem>
              <ListItem tag={Link} to="/impressoras">
                <ListItemGraphic icon="local_printshop" /> Impressoras
              </ListItem>
              <ListItem tag={Link} to="/meu-perfil">
                <ListItemGraphic icon="insert_drive_file" /> Meu Perfil
              </ListItem>
              <hr className={"Divider"} />              
              <ListItem tag={Link} to="/logout">
                <ListItemGraphic icon="exit_to_app" /> Sair
              </ListItem>
            </List>
          </DrawerContent>
        </Drawer>

        <Routes>
          <Route path="/" element={<Home />} end />
          <Route path="/cardapio" element={<MenuIndex />} />
          <Route path="/pedidos" element={<OrdersIndex />} />
          <Route path="/mesas" element={<TablesIndex />} />
          <Route path="/clientes" element={<CustomersIndex />} />
          <Route path="/minhas-faturas" element={<InvoicesIndex />} />
          <Route path="/usuarios" element={<UsersIndex />} />
          <Route path="/relatorios" element={<ReportsIndex />} />          
          <Route path="/configuracoes" element={<SettingsIndex />} />
          <Route path="/impressoras" element={<PrintersIndex />} />
          <Route path="/meu-perfil" element={<AccountIndex />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainNav;
