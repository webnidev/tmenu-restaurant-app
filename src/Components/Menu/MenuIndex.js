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
  Avatar,
  CircularProgress
} from "rmwc";
import MainNav from "../../MainNav";
import {GET_PRODUCTS, API_URL} from '../../Api'
import Pagination from '../Pagination/Pagination'
import CategoryList from "../Category/CategoryList";
import  Modal from '../Modal/Modal'
import Content from '../Menu/AddProduct'
const MenuIndex = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([])
  const [paginate, setPaginate] = React.useState({total:0, perPage:5, page:1, lastpage:0})
  const [loadind, setLoadind] = React.useState(true)
  const token = window.localStorage.getItem('token')
  const getData = async ()=>{
    try {
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
      setLoadind(false)
    }
  }

  const handleSubimit = async event =>{
    event.preventDefault()
    const search = `${event.target.name.value}`
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
        paginate.page=event.target.id
        setPaginate(paginate)
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
          { loadind && <div className="loading" ><CircularProgress size={125} /></div>}
        {!loadind &&  <div className={"PageContainer"}>
          <Modal open={open} setOpen={setOpen} Content={Content}/>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Cardápio</Typography></h1>             
          </div>
            <Grid className={"CustomContainer"}>
            <GridRow>
                    <GridCell span={8}>
                      <Button className={"BtnDefaultTmenu"} label="Cadastrar Item" icon="add" onClick={()=>setOpen(!open)} />
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
                        <DataTableHeadCell></DataTableHeadCell>
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
                                <DataTableCell>
                                  { product.images.length>0 && <Avatar
                                      src={`${API_URL}manager/image-product/${product.images[0].id}?token=${token}`}
                                      size="large"
                                      name="Natalia Alianovna Romanova"
                                      square
                                    />}
                                </DataTableCell>
                                <DataTableCell><a href={`/product/${product.id}`}>{product.name}</a></DataTableCell>
                                <DataTableCell alignEnd>{product.code}</DataTableCell>
                                <DataTableCell alignEnd className={"strong"}>R$ {product.value}</DataTableCell>
                                  <SimpleMenu handle={<IconButton icon="zoom_in"/>}>
                                    <MenuItem><Icon icon={{ icon: 'info', size: 'small' }} /><a href={`/product/${product.id}`}>Ver Detalhes</a></MenuItem>
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

            

        </div>   }
      
    </>
  );
};

export default MenuIndex;
