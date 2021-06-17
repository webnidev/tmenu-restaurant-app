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
import {GET_PRODUCTS} from '../../Api'
import Pagination from '../Pagination/Pagination'
import CategoryList from "../Category/CategoryList";
const MenuIndex = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([])
  const [paginate, setPaginate] = React.useState({total:0, perPage:2, page:1, lastpage:0})
  const [loaded, setLoaded] = React.useState(true)

  const getData = async ()=>{
    try {
      const token = window.localStorage.getItem('token')
      if(!token) throw new Error('Token inválido')
      const {url, options} = GET_PRODUCTS(token, paginate)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {products} = await response.json()
      setData(products.data)
      setPaginate({total:products.total, perPage:products.perPage, page:products.page, lastpage:products.lastPage})
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoaded(false)
    }
  }

  const handleSubimit = async event =>{
    event.preventDefault()
    const search = `${event.target.name.value}`
    const token = window.localStorage.getItem('token')
    const {url, options} = GET_PRODUCTS(token, paginate, search)
    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Error: ${response.statusText}`)
    const {products} = await response.json()
    setData(products.data)
    setPaginate({total:products.total, perPage:products.perPage, page:products.page, lastpage:products.lastPage})
  }

  const handleSearchToStatus = async event =>{
    event.preventDefault()
    try {
      const status = ["ATIVO", "FORA DE ESTOQUE", "INATIVO"]
      const token = window.localStorage.getItem('token')
      if(!token) throw new Error(`Error: Token Inválido!`)
      const search = `&status=${status[event.target.value]}`
      const {url, options} = GET_PRODUCTS(token, paginate, search)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {products} = await response.json()
      setData(products.data)
      setPaginate({total:products.total, perPage:products.perPage, page:products.page, lastpage:products.lastPage})
    } catch (error) {
      console.log(error)
    }
  }
  const handleSearchToCategory =async event =>{
    event.preventDefault()
    const token = window.localStorage.getItem('token')
    if(!token) throw new Error(`Error: Token Inválido!`)
    const search = event.target.id
    const {url, options} = GET_PRODUCTS(token, paginate, search)
    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Error: ${response.statusText}`)
    const {products} = await response.json()
    setData(products.data)
    setPaginate({total:products.total, perPage:products.perPage, page:products.page, lastpage:products.lastPage})
  }

  const paginateUpdate =async event =>{
    try {
        const token = window.localStorage.getItem('token')
        paginate.page=event.target.id
        setPaginate(paginate)
        if(!token){
            throw new Error(`Error: Token inválido`)
        }
        const {url, options} = GET_PRODUCTS(token, paginate)
        const response = await fetch(url, options)
        if(!response.ok) throw new Error(`Error: ${response.statusText}`)
        const {products} = await response.json()
        setData(products.data)
        
    } catch (error) {
        console.log(error)
    }
  }

  function cadastrarNovo(){
    window.location.href = "/add-product";
  }

  React.useEffect(()=>{
    getData()
  },[])

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
                      <Button className={"BtnDefaultTmenu"} label="Cadastrar Item" icon="add" onClick={()=>cadastrarNovo()} />
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Categoria" icon="filter_list" />}>
                        <CategoryList data={data} handleSearchToCategory={handleSearchToCategory}/>
                      </SimpleMenu>
                      <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Filtrar por Status" icon="filter_list" />}>
                        <MenuItem  value="0" onClick={handleSearchToStatus}>Ativo</MenuItem>
                        <MenuItem  value="1" onClick={handleSearchToStatus}>Fora de Estoque</MenuItem>
                        <MenuItem  value="2" onClick={handleSearchToStatus}>Desativado</MenuItem>
                      </SimpleMenu>          
                      
                    </GridCell>                    
                    <GridCell span={4}>
                        <form onSubmit={handleSubimit}>                      
                        <TextField className={"CustomInputSearch"} name="name" outlined label="Buscar por Nome ou Código..." />
                        <Button label="Pesquisar" outlined icon="search" className={"BtnDefaultSearch"} type="submit"/>
                        </form>
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
                     
                        { data.map( product =>{
                          return(
                            <DataTableRow key={product.id} >
                             <DataTableCell><a href="">{product.name}</a></DataTableCell>
                              <DataTableCell alignEnd>{product.code}</DataTableCell>
                              <DataTableCell alignEnd className={"strong"}>R$ {product.value}</DataTableCell>
                                <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                                  <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /> Ver Detalhes</MenuItem>
                                  <MenuItem><Icon icon={{ icon: 'create', size: 'small' }} /> Editar</MenuItem>
                                  <MenuItem style={{color: '#b00020'}}><Icon icon={{ icon: 'delete', size: 'small' }} style={{color: '#b00020'}} /> Deletar</MenuItem>
                                </SimpleMenu>

                              { product.status === 'ATIVO' && <DataTableCell alignEnd><Badge className={"TmenuSuccess"} align="inline" label="Ativo" /></DataTableCell>}
                              { product.status === 'FORA DE ESTOQUE' && <DataTableCell alignEnd><Badge className={"TmenuDanger"} align="inline" label="Fora de Estoque" /></DataTableCell>}
                              { product.status === 'INATIVO' && <DataTableCell alignEnd><Badge className={"TmenuDisabled"} align="inline" label="Desativado" /></DataTableCell>}
                            
                            </DataTableRow>
                          )
                        })
                        }
                        

                    </DataTableBody>
                  </DataTableContent>
                </DataTable>
                </GridCell>
                </GridRow>
                <GridRow>
                  <Pagination paginate={paginate} paginateUpdate={paginateUpdate}/>
                </GridRow>
            </Grid>

            

        </div>   
      
    </>
  );
};

export default MenuIndex;
