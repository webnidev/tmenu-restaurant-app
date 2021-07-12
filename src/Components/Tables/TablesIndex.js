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
  MenuItem,
  Dialog,
  Select,
  TextField,
  DialogActions,
  DialogButton,
  DialogTitle,
  DialogContent
 } from "rmwc";
import MainNav from "../../MainNav";
import "./Tables.css";
import {GET_TABLES, GET_COMPANY, PUT_ADD_WAITER_TO_TABLE, 
  PUT_UPDATE_TABLE, GET_LAST_ORDERS,
  PUT_CLOSE_ORDER, PUT_CLOSE_TABLE} from '../../Api'
import Ws from '@adonisjs/websocket-client'
const TablesIndex = () => {

  //const url = 'wss://api.tmenu.com.br'
  const url = 'ws://localhost:3333'
  const [tables, setTables] = React.useState([])
  const [company, setCompany] = React.useState({})
  const [waiters, setWaiters] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [openOrder, setOpenorder] = React.useState(false)
  const [opneBilling, setOpenbilling] = React.useState(false)
  const [paginate, setPaginate] = React.useState({total:0, perPage:5, page:1, lastpage:0})
  const [tableid, setTableid] = React.useState(0)
  const [closeTableId, setCloseTableId] = React.useState(0)
  const [message, setMessage] = React.useState('')
  const[lastOrder, setOrder] = React.useState(null)
  const token = window.localStorage.getItem('token') 
  const ws = Ws(url).withApiToken(token).connect()
  const ws1 = Ws(url).withApiToken(token).connect()
  const order = ws.subscribe('notifications')
  const account = ws1.subscribe('account')

  function getWaiters(waiters){
    const wt = {}
    waiters.map(waiter=>{
      wt[waiter.id] = waiter.name      
    })
    return wt
  }
  
  const getCompany = async () =>{
    const {url, options} = GET_COMPANY(token)
    const response = await fetch(url, options)
    const {companys} = await response.json()
    setCompany(companys)
    setWaiters(getWaiters(companys.waiters))
  }

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

  const setWaiter = async event =>{
    event.preventDefault()  
    try {
      const {url, options} = PUT_ADD_WAITER_TO_TABLE(token, tableid, event.target.waiter.value)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      getTables()      
    } catch (error) {
      console.log(error)
    }
  }

const setTable = (table_id) =>{
  setTableid(table_id)
  setOpen(true)
}
  order.on('new:order', (response)=>{
    console.log(response)
    getTables()
  })
  account.on('new:card', (response)=>{
    getTables()
  })
const openTable = async event =>{
  event.preventDefault()
  try {
    const body ={
      status:true
    }
    const {url, options} = PUT_UPDATE_TABLE(token,body, event.target.id)
    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Error: ${response.statusText}`)
    const {table} = await response.json()
    setMessage(`Mesa ${table.number} aberta`)
    getTables()
  } catch (error) {
    console.log(error)
  }
}


  const getLastOrders = async event =>{
    event.preventDefault()
    try {
      const {url, options} =GET_LAST_ORDERS(token, event.target.id)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {order} = await response.json()
      console.log('ULTIMO PEDIDO', order.itens)
      setOrder(order)
      setOpenorder(true)
    } catch (error) {
      console.log(error)
    }
  }

  const closeTable = async event =>{
    event.preventDefault()
    try {
      const body = {
        data:[]
      }
      const {url, options} = PUT_CLOSE_TABLE(token, closeTableId, body)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      alert('Conta fechada com sucesso!')
      getTables()
    } catch (error) {
      console.log(error)
    }
  }

  const openModalBilling = async event =>{
    event.preventDefault()
    try {
      setCloseTableId(event.target.id)   
      setOpenbilling(true)  
    } catch (error) {
      console.log(error)
    }
    
  }

  React.useEffect(()=>{
    getTables()
    getCompany()
  },[])
  


  return (
    <>          
    <MainNav/>

    <Dialog open={opneBilling} onClose={evt => {
      console.log(evt.detail.action);
      setOpenbilling(false);
    }}
  onClosed={evt => console.log(evt.detail.action)} >
      <DialogTitle>Fechar conta da mesa</DialogTitle>
          <form onSubmit={closeTable} >
          <DialogContent>     
              loijnnns
          </DialogContent>
          <DialogActions>
            <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
              Fechar!
            </DialogButton>
          </DialogActions>
          </form>
        </Dialog>

    <Dialog open={open} onClose={evt => {
      console.log(evt.detail.action);
      setOpen(false);
    }}
  onClosed={evt => console.log(evt.detail.action)}>
      <DialogTitle>Selecione o garçom</DialogTitle>
      <form onSubmit={setWaiter}>
      <DialogContent>     
          {company && <Select label="Selecione o garçom" name="waiter" options={waiters}/>}
      </DialogContent>
      <DialogActions>
        <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
          Definir!
        </DialogButton>
      </DialogActions>
      </form>
    </Dialog>

    <Dialog open={openOrder} onClose={evt => {
      console.log(evt.detail.action);
      setOpenorder(false);
    }}
  onClosed={evt => console.log(evt.detail.action)}>
      <DialogTitle>Últimos pedidos</DialogTitle>
      <DialogContent>     
         { lastOrder &&
           lastOrder.itens.map(item=>{
             return(
               <div>{item.quantity} {item.product_name} </div>
             )
           })
         }
      </DialogContent>
      <DialogActions>
        <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
          ok
        </DialogButton>
      </DialogActions>
    </Dialog>

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
                                  <MenuItem onClick={()=>setOpenbilling(true)}><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  {!table.status && <MenuItem onClick={openTable} id={table.id}><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>}
                                  { table.status && <MenuItem onClick={()=>setTable(table.id)}><Icon icon="switch_account" /> Definir Garçom</MenuItem>}
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>                  
                  
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>{table.number}</span>
                  { table.waiter && <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>{table.waiter.name}</span></span>}
                  { !table.waiter && <span className={"AttendedBy"}>Sem garçom definido</span>}
                  { !table.asking && !table.calling &&
                  <a >
                    <div className={`CardsMesasAlertZone`}>
                        Nenhum novo pedido
                    </div>
                  </a>}
                  { table.calling &&
                     <a >
                     <div className={"CardsMesasAlertZone AlertZoneRequestTheBill"} onClick={openModalBilling}>                        
                       <Icon icon="notification_important" />
                       <Typography use="overline" className={"strong"} id={table.id} > Pedindo a conta!</Typography>
                     </div>
                   </a>
                  }
                  { table.asking && !table.calling &&
                    <a>                  
                    <div className={"CardsMesasAlertZone AlertZoneRequestNewOrder"}  onClick={getLastOrders}>                        
                      <Badge align="inline" label={table.orders} style={{ background: '#2196f3' }}/>
                      <Typography use="overline" className={"strong"} id={table.last_order}> Novo(s) pedido(s)!</Typography>
                    </div>
                    </a>
                  }

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
