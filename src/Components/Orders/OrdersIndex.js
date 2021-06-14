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
  Icon

} from "rmwc";
import MainNav from "../../MainNav";


const OrdersIndex = () => {

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  return (
    <>          
    <MainNav/>
     <div className={"PageContainer"}>
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
                      <DataTableRow>
                        <DataTableCell><a href="">Mesa 10</a></DataTableCell>
                        <DataTableCell alignEnd>02/10/2020 às 21:54</DataTableCell>
                        <DataTableCell alignEnd>0983</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 390</DataTableCell>
                          <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>                            
                            <MenuItem><Icon icon={{ icon: 'print', size: 'small' }} /> Imprimir</MenuItem>
                          </SimpleMenu>
                        <DataTableCell alignEnd>                           
                              <Badge className={"TmenuSuccess"} align="inline" label="Finalizado" />                                                                            
                        </DataTableCell>
                        <SimpleMenu handle={<IconButton icon="keyboard_arrow_down" label="Aterar status" />}>
                                <MenuItem>Atualizar para:  <strong className="TmenuSuccessText"> Finalizado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuDangerText"> Cancelado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuInProcessText"> Em Andamento</strong></MenuItem>
                        </SimpleMenu>  
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Mesa 10</a></DataTableCell>
                        <DataTableCell alignEnd>02/10/2020 às 20:25</DataTableCell>
                        <DataTableCell alignEnd>0982</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 274</DataTableCell>
                          <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'print', size: 'small' }} /> Imprimir</MenuItem>
                          </SimpleMenu> 
                        <DataTableCell alignEnd><Badge className={"TmenuDanger"} align="inline" label="Cancelado" /></DataTableCell>
                        <SimpleMenu handle={<IconButton icon="keyboard_arrow_down" label="Aterar status" />}>
                                <MenuItem>Atualizar para:  <strong className="TmenuSuccessText"> Finalizado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuDangerText"> Cancelado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuInProcessText"> Em Andamento</strong></MenuItem>
                              </SimpleMenu>  
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Mesa 07</a></DataTableCell>
                        <DataTableCell alignEnd>01/10/2020 às 19:42</DataTableCell>
                        <DataTableCell alignEnd>0981</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 198</DataTableCell>
                          <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'print', size: 'small' }} /> Imprimir</MenuItem>
                          </SimpleMenu> 
                        <DataTableCell alignEnd><Badge className={"TmenuInProcess"} align="inline" label="Em andamento" /></DataTableCell>
                              <SimpleMenu handle={<IconButton icon="keyboard_arrow_down" label="Aterar status" />}>
                                <MenuItem>Atualizar para:  <strong className="TmenuSuccessText"> Finalizado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuDangerText"> Cancelado</strong></MenuItem>
                                <MenuItem>Atualizar para:  <strong className="TmenuInProcessText"> Em Andamento</strong></MenuItem>
                              </SimpleMenu>  
                      </DataTableRow>                      
                    </DataTableBody>
                  </DataTableContent>
                </DataTable>
                </GridCell>
                </GridRow>
            </Grid>


        </div>   
      
    </>
  );
};

export default OrdersIndex;
