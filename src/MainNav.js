import React from 'react';
import { Link, BrowserRouter, Routes } from 'react-router-dom';
import Logo from './Logo';
import 'material-icons';
import {
    Button,
    Drawer,
    DrawerHeader,
    DrawerTitle,
    DrawerSubtitle,
    DrawerContent,
    List,
    ListItem,
    ListItemGraphic,
    Icon
  } from 'rmwc';
  
import 'rmwc/dist/styles';
import './GlobalCustom.css';


const MainNav = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Drawer>
        <DrawerHeader>
          <Logo/>
          {/* <DrawerSubtitle>Subtítulo</DrawerSubtitle> */}
        </DrawerHeader>
        <DrawerContent className={"Menu"}>
        <hr className={"Divider"}/>
          <List>          
            <ListItem tag={Link} to="/"><ListItemGraphic icon="dashboard" /> Painel</ListItem>
            <ListItem tag={Link} to="/cardapio"><ListItemGraphic icon="restaurant" /> Cardápio</ListItem>
            <ListItem tag={Link} to="/pedidos"><ListItemGraphic icon="list" /> Pedidos</ListItem>
            <ListItem tag={Link} to="/mesas"><ListItemGraphic icon="view_comfy" /> Mesas</ListItem>
            <ListItem tag={Link} to="/clientes"><ListItemGraphic icon="supervisor_account" /> Clientes</ListItem>
            <ListItem tag={Link} to="/minhas-faturas"><ListItemGraphic icon="attach_money" /> Minhas Faturas</ListItem>
            <ListItem tag={Link} to="/usuarios"><ListItemGraphic icon="supervised_user_circle" /> Usuários do Sistema</ListItem>
            <ListItem tag={Link} to="/relatorios"><ListItemGraphic icon="bar_chart" /> Relatórios</ListItem>
            <hr className={"Divider"}/>
            <ListItem tag={Link} to="/meus-dados"><ListItemGraphic icon="insert_drive_file" /> Meus Dados</ListItem>
            <ListItem tag={Link} to="/configuracoes"><ListItemGraphic icon="settings" /> Configurações Gerais</ListItem>
            <ListItem tag={Link} to="/impressoras"><ListItemGraphic icon="local_printshop" /> Impressoras</ListItem>
            <hr className={"Divider"}/>
            <ListItem tag={Link} to="/logout"><ListItemGraphic icon="exit_to_app" /> Sair</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainNav;