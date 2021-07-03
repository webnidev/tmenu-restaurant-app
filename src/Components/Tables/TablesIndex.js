import React from "react";
import { Grid,
  GridCell,
  Typography,
  Card,
  Badge,
  Button,
  GridRow,
  Icon,
  SimpleMenu,
  IconButton,
  MenuItem
 } from "rmwc";
import MainNav from "../../MainNav";
import "./Tables.css";
import {GET_TABLES} from '../../Api'
import Ws from '@adonisjs/websocket-client'

const TablesIndex = () => {
  const [tables, setTables] = React.useState([])
  const [paginate, setPaginate] = React.useState({total:0, perPage:5, page:1, lastpage:0})
  const token = window.localStorage.getItem('token') 
  const ws = Ws('ws://localhost:3333/').withApiToken(token).connect()
  const order = ws.subscribe('notifications')
  
  const getTables = async ()=>{
    try {     
      const {url, options} = GET_TABLES(token, paginate)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {tables} = await response.json()
      setTables(tables.data)
      setPaginate({total:tables.total, perPage:tables.perPage, page:tables.page, lastpage:tables.lastPage})
    } catch (error) {
      console.log(error)
    }
  }

  order.on('new:order', ()=>{
    getTables()
  })
  
  React.useEffect(()=>{
    getTables()
  },[])
  


  return (
    <>          
    <MainNav/>
    {console.log(tables)}
     <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Mesas</Typography></h1>             
          </div>
          <Grid className={"CardsMesas"} z={1}>
            {tables && tables.map(table=>{
              return(
                <GridCell span={3}>
                <Card>
                  <Grid>  
                      <GridRow>
                        <GridCell span={6}>
                          { table.status && <Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" />} 
                          { !table.status && <Badge className={"TmenuDanger"} align="inline" label="Fechada" />} 
                        </GridCell>
                        <GridCell span={8}>
                          <SimpleMenu handle={<Button style={{color: "black"}} label="Ações" icon="settings" />}>
                                  <MenuItem><Icon icon="add_circle_outline" /> Incluir Pedido</MenuItem>
                                  <MenuItem><Icon icon="visibility" /> Ver Extrato</MenuItem>
                                  <MenuItem><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  <MenuItem><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>
                                  <MenuItem><Icon icon="switch_account" /> Definir Garçom</MenuItem>
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>                  
                  
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>{table.number}</span>
                  { table.waiter && <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>{table.waiter.name}</span></span>}
                  { !table.waiter && <span className={"AttendedBy"}>Sem garçom definido</span>}
                  <a href="">
                    <div className={`CardsMesasAlertZone`}>
                        Nenhum novo pedido
                    </div>
                  </a>
                </Card>
              </GridCell>
              )
            })
              
            } 
            </Grid> 
        </div>   
      
    </>
  );
};

export default TablesIndex;
