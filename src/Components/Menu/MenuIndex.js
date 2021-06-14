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

const MenuIndex = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <>
          <MainNav />
          <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Cardápio</Typography></h1>             
          </div>
            

          <Dialog open={open} onClose={evt => {
            console.log(evt.detail.action);
            setOpen(false);
          }}
        onClosed={evt => console.log(evt.detail.action)}>
        <DialogTitle>Cadastrar novo item no cardápio</DialogTitle>
        <DialogContent>
           <TextField fullwidth placeholder="Nome ou título do produto" />
           <TextField textarea fullwidth placeholder="Resumo ou descrição" />
           <Select label="Selecione a categoria" options={['Carnes', 'Bebidas', 'Pizzas']}/>
           <TextField fullwidth placeholder="Preço"/>
        </DialogContent>
        <DialogActions>
          <DialogButton className={"BtnSecondaryAction"} action="close">Cancelar</DialogButton>
          <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
            Salvar!
          </DialogButton>
        </DialogActions>
      </Dialog>


            <Grid className={"CustomContainer"}>
            <GridRow>
                    <GridCell span={8}>
                      <Button className={"BtnDefaultTmenu"} label="Cadastrar Item" icon="add" />
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Categoria" icon="filter_list" />}>
                        <MenuItem>Carnes</MenuItem>
                        <MenuItem>Bebidas</MenuItem>
                        <MenuItem>Pizzas</MenuItem>
                      </SimpleMenu>
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Status" icon="filter_list" />}>
                        <MenuItem>Ativo</MenuItem>
                        <MenuItem>Fora de Estoque</MenuItem>
                        <MenuItem>Desativado</MenuItem>
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
                        <DataTableHeadCell>Nome</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Cód.</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Preço</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Ações</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Status</DataTableHeadCell>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                      <DataTableRow>
                        <DataTableCell><a href="">Carne de Sol Nordestina</a></DataTableCell>
                        <DataTableCell alignEnd>SKU0012</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 59,00</DataTableCell>
                          <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'create', size: 'small' }} /> Editar</MenuItem>
                            <MenuItem style={{color: '#b00020'}}><Icon icon={{ icon: 'delete', size: 'small' }} style={{color: '#b00020'}} /> Deletar</MenuItem>
                          </SimpleMenu>
                        <DataTableCell alignEnd><Badge className={"TmenuSuccess"} align="inline" label="Ativo" /></DataTableCell>
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Filé à Parmegiana</a></DataTableCell>
                        <DataTableCell alignEnd>SKU0091</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 64,00</DataTableCell>
                        <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'create', size: 'small' }} /> Editar</MenuItem>
                            <MenuItem style={{color: '#b00020'}}><Icon icon={{ icon: 'delete', size: 'small' }} style={{color: '#b00020'}} /> Deletar</MenuItem>
                          </SimpleMenu> 
                        <DataTableCell alignEnd><Badge className={"TmenuDanger"} align="inline" label="Fora de Estoque" /></DataTableCell>
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Filé Mignon</a></DataTableCell>
                        <DataTableCell alignEnd>SKU092</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 78,00</DataTableCell>
                        <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'create', size: 'small' }} /> Editar</MenuItem>
                            <MenuItem style={{color: '#b00020'}}><Icon icon={{ icon: 'delete', size: 'small' }} style={{color: '#b00020'}} /> Deletar</MenuItem>
                          </SimpleMenu> 
                        <DataTableCell alignEnd><Badge className={"TmenuDisabled"} align="inline" label="Desativado" /></DataTableCell>
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Heineken Longneck</a></DataTableCell>
                        <DataTableCell alignEnd>SKU123</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 7,50</DataTableCell>
                          <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                            <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                            <MenuItem><Icon icon={{ icon: 'create', size: 'small' }} /> Editar</MenuItem>
                            <MenuItem style={{color: '#b00020'}}><Icon icon={{ icon: 'delete', size: 'small' }} style={{color: '#b00020'}} /> Deletar</MenuItem>
                          </SimpleMenu>                        
                        <DataTableCell alignEnd><Badge className={"TmenuSuccess"} align="inline" label="Ativo" /></DataTableCell>
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

export default MenuIndex;
