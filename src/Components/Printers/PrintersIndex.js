import React from "react";
import { 
  Grid, Typography, GridCell, 
  GridRow,DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell, 
  TextField,
  Button
} from "rmwc";
import { GET_PRINTERS, POST_PRINTER } from "../../Api";
import MainNav from "../../MainNav";


const PrintersIndex = () => {
  const [data, setData] = React.useState([])
  const [openform, setOpenform] = React.useState(false)


  const getData = async ()=>{
    try {
      const token = window.localStorage.getItem('token')
      if(!token) throw new Error('Token inválido')
      const {url,options} = GET_PRINTERS(token)
      const response = await fetch(url, options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {printers} = await response.json()
      setData(printers)
    } catch (error) {
      console.log(error)
    }
  }

    const handleSubmit = async event =>{
      event.preventDefault()
      const token = window.localStorage.getItem('token')
      if(!token) throw new Error('Token inválido')
      const {url,options} = POST_PRINTER(token,{name:event.target.name.value, code:event.target.code.value})
      const response = await fetch(url,options)
      if(!response.ok) throw new Error(`Error: ${response.statusText}`)
      const {printer} = await response.json()
      alert(`Inpressora ${printer.name} criada com sucesso`)
      setOpenform(false)
      getData()
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
          <Button className={"BtnDefaultTmenu"} label="Cadastrar Impressora" icon="add" onClick={()=>setOpenform(!openform)} />
            {
              openform && 
              <form lassName="formContainer" onSubmit={handleSubmit}>
              <Grid >
                
                <GridRow>
                    <GridCell span={4}>
                      <TextField type="text" name="name" fullwidth placeholder="Nome" />
                    </GridCell>
                    <GridCell span={3}>
                      <TextField type="text" name="code" fullwidth placeholder="Código" />
                    </GridCell>
                    <GridCell span={3}>
                      <Button type="submit" className={"BtnDefaultTmenu"} label="Cadastrar" icon="add" /> 
                    </GridCell>
                </GridRow>
                
              </Grid>
              </form>
            }

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
                                  <DataTableCell><a href="/">{printer.name}</a></DataTableCell>
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
