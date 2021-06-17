import React from 'react'
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
  import MainNav from '../../MainNav'
const CreateMenuItem =()=>{
    const handleSubimit = async  event=>{

    } 

    return(
        <>
        <MainNav />
        <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Cadastrar Ítem</Typography></h1>             
          </div>
        
        <form  onSubmit={handleSubimit}>
            <div className="formContainer"> 
                <Grid>
                    <GridRow>
                        <GridCell span={12}>
                            <GridCell span={4}>
                            <TextField type="text" name="name" fullwidth placeholder="Nome"  />
                            <TextField type="text" name="name" fullwidth placeholder="Nome"  />
                            </GridCell>
                            <GridCell span={4}>
                           
                            </GridCell>
                        </GridCell>    
                    </GridRow>
                </Grid>
            </div>
        </form>
        </div>
        </>
    )
}

export default CreateMenuItem