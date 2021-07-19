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
import {GET_CLIENTS} from '../../Api'
import Pagination from '../Pagination/Pagination'
const CustomersIndex = () => {
  const [loadind, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  const [paginate, setPaginate] = React.useState({total:0, perPage:5, page:1, lastpage:0})
  const token = window.localStorage.getItem('token')

  const getData = async ()=>{
    try {
      const {url, options} = GET_CLIENTS(token, paginate)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(response.statusText)
      const {clients} = await response.json()
      setData(clients)
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
     <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Clientes</Typography></h1>             
          </div>
            <Grid className={"CustomContainer"}>
              <GridRow>
                <GridCell>
                  <DataTable className={"TabelaProdutos"}>
                    <DataTableContent>
                    <DataTableHead>
                      <DataTableRow>
                        <DataTableHeadCell>Nome</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>email</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Telefone</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Ações</DataTableHeadCell>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                      {
                        data.map(client=>{
                          return(
                            <DataTableRow key={client.id}>
                              <DataTableCell>{client.name}</DataTableCell>
                              <DataTableCell>{client.email}</DataTableCell>
                              <DataTableCell>{client.phone}</DataTableCell>
                              <DataTableCell>Ações</DataTableCell>
                            </DataTableRow>
                          )
                        })
                      }
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

export default CustomersIndex;
