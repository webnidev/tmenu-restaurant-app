import React from "react";
import { 
  Grid, Typography, GridCell, 
  GridRow,DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell, } from "rmwc";
import { GET_PRINTERS } from "../../Api";
import MainNav from "../../MainNav";


const PrintersIndex = () => {
  const [data, setData] = React.useState([])
  const getData = async ()=>{
    try {
      const token = window.localStorage.getItem('token')
      if(!token) throw new Error('Token inválido')
      const {url,options} = GET_PRINTERS(token)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {printers} = await response.json()
      console.log(printers)
      setData(printers)
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
            <h1><Typography use="headline1">Impressoras</Typography></h1>             
          </div>
            <Grid className={"CustomContainer"}>
                <GridRow>
                  <GridCell>
                    <DataTable className={"TabelaProdutos"}>
                      <DataTableContent>
                        <DataTableHead>
                          <DataTableRow>
                            <DataTableHeadCell>Nome</DataTableHeadCell>
                            <DataTableHeadCell alignEnd>Código</DataTableHeadCell>
                          </DataTableRow>
                        </DataTableHead>
                          <DataTableBody>
                            { data.map( printer =>{
                              return(
                                <DataTableRow key={printer.id}>
                                  <DataTableCell><a href="">{printer.name}</a></DataTableCell>
                                  <DataTableCell alignEnd>{printer.code}</DataTableCell>
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

export default PrintersIndex;
