import React from "react";
import { Grid, GridCell, GridRow,
  Typography,
  Button,
  TextField,
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell,
  SimpleMenu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogButton,
  DialogContent,
  Select,
  Badge,
  IconButton,
  Icon,
  CircularProgress

} from "rmwc";
import MainNav from "../../MainNav";
import {GET_ORDERS} from '../../Api'
import Pagination from '../Pagination/Pagination'

const OrdersIndex = () => {
  const [loadind, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  const [paginate, setPaginate] = React.useState({total:0, perPage:5, page:1, lastpage:0})
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState(false)
  const token = window.localStorage.getItem('token')
  const getData = async ()=>{
    try {
      const {url, options} = GET_ORDERS(token, paginate)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(response.statusText)
      const {orders} = await response.json()
      setData(orders.data)
      setPaginate({total:orders.total, perPage:orders.perPage, page:orders.page, lastpage:orders.lastPage})
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const paginateUpdate =async event =>{
    try {
        paginate.page=event.target.id
        setPaginate(paginate)
        const {url, options} = GET_ORDERS(token, paginate)
        const response = await fetch(url, options)
        if(!response.ok) throw new Error(`Error: ${response.statusText}`)
        const {orders} = await response.json()
        setData(orders.data)
    } catch (error) {
        console.log(error)
    }
  }

  React.useEffect(()=>{
    getData()
  },[])
  return (
    <>          
    <MainNav/>
    { loadind && <div className="loading" ><CircularProgress size={125} /></div>}
     { !loadind &&  <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Pedidos</Typography></h1>             
          </div>
         
        <Dialog open={open} onClose={evt => {
            console.log(evt.detail.action);
            setOpen(false);
          }}
        onClosed={evt => console.log(evt.detail.action)}>
        <DialogTitle>Novo pedido</DialogTitle>
        <DialogContent>
           <TextField fullwidth placeholder="Pesquisar item" />
           <Select label="Selecione a mesa" options={['Mesa 1', 'Mesa 5', 'Mesa 10']}/>
        </DialogContent>
        <DialogActions>
          <DialogButton className={"BtnSecondaryAction"} action="close">Cancelar</DialogButton>
          <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
            Enviar!
          </DialogButton>
        </DialogActions>
      </Dialog>
          <Grid className={"CustomContainer"}>
            <GridRow>
                    <GridCell span={8}>
                      <Button className={"BtnDefaultTmenu"} label="Novo pedido" icon="add" />
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Mesa" icon="filter_list" />}>
                        <MenuItem>Mesa 1</MenuItem>
                        <MenuItem>Mesa 5</MenuItem>
                        <MenuItem>Mesa 10</MenuItem>
                      </SimpleMenu>
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Status" icon="filter_list" />}>
                        <MenuItem>Finalizado</MenuItem>
                        <MenuItem>Cancelado</MenuItem>
                        <MenuItem>Em Andamento</MenuItem>
                      </SimpleMenu>                     
                    </GridCell>                    
                    <GridCell span={4}>                      
                        <TextField className={"CustomInputSearch"} outlined label="Buscar por Nome ou Código..." />
                        <Button label="Pesquisar" outlined icon="search" className={"BtnDefaultSearch"}/>
                    </GridCell>
                </GridRow>       
            </Grid>

            {console.log(data)}
            <Grid className={"CustomContainer"}>
            <GridRow>
              <GridCell>
                <DataTable className={"TabelaProdutos"}>
                  <DataTableContent>
                    <DataTableHead>
                      <DataTableRow>
                        <DataTableHeadCell>Canal</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Iniciado em</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Nº do Pedido</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Total</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Ações</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Status</DataTableHeadCell>
                        <DataTableHeadCell alignEnd></DataTableHeadCell>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                      { data.map(order=>{
                        return (
                          <DataTableRow key={order.id}>
                          <DataTableCell><a href="">Mesa {order.table}</a></DataTableCell>
                          <DataTableCell alignEnd>{order.created_at}</DataTableCell>
                          <DataTableCell alignEnd>{order.id}</DataTableCell>
                          <DataTableCell alignEnd className={"strong"}>R$ {order.value}</DataTableCell>
                            <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                              <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>                            
                              <MenuItem><Icon icon={{ icon: 'print', size: 'small' }} /> Imprimir</MenuItem>
                            </SimpleMenu>
                          <DataTableCell alignEnd>                           
                                <Badge className={"TmenuSuccess"} align="inline" label={order.status} />                                                                            
                          </DataTableCell>
                          <SimpleMenu handle={<IconButton icon="keyboard_arrow_down" label="Aterar status" />}>
                                  <MenuItem>Atualizar para:  <strong className="TmenuSuccessText"> Finalizado</strong></MenuItem>
                                  <MenuItem>Atualizar para:  <strong className="TmenuDangerText"> Cancelado</strong></MenuItem>
                                  <MenuItem>Atualizar para:  <strong className="TmenuInProcessText"> Em Andamento</strong></MenuItem>
                          </SimpleMenu>  
                        </DataTableRow>
                        )
                      })}                     
                    </DataTableBody>
                  </DataTableContent>
                </DataTable>
                </GridCell>
                </GridRow>
                <GridRow>
                  <Pagination paginate={paginate} paginateUpdate={paginateUpdate}/>
                </GridRow>
            </Grid>
        </div>   }
      
    </>
  );
};

export default OrdersIndex;
