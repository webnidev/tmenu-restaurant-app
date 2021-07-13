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
  import { GET_PRINTERS, GET_CATEGORIES, POST_PRODUCT } from '../../Api';
const AddProduct =()=>{
    const [printer, setPrinter] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [printers, setPrinters] = React.useState({id:'', name:''})
    const [categories, setCategories] = React.useState({id:'', name:''})


    const setData=(data)=>{
        const interData = {}
        data.map(obj => {
            interData[obj.id]=obj.name
        })
        return interData
    }

    const getData = async ()=>{
        try {
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error('Token inválido!')
            const optionsPrinter = GET_PRINTERS(token)
            const optionsCategory = GET_CATEGORIES(token, {page:1, perPage:0})
            const resPrint = await fetch(optionsPrinter.url, optionsPrinter.options)
            if(!resPrint.ok) throw new Error(`Error: ${resPrint.statusText}`)
            const {printers} = await resPrint.json()
            setPrinters(setData(printers))
            const resCat = await fetch(optionsCategory.url, optionsCategory.options)
            if(!resCat.ok) throw new Error(`Error: ${resCat.statusText}`)
            const {categories} = await resCat.json()
            setCategories(setData(categories))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubimit = async  event=>{
        event.preventDefault()
       try {
           const body = {
                name: event.target.name.value,
                description:event.target.description.value,
                code:event.target.code.value,
                value: event.target.value.value,
                category_id: parseInt(category),
                printer_id: parseInt(printer)
           }
           console.log(body)
           const token = window.localStorage.getItem('token')
           if(!token) throw new Error('Token inválido!')
           const {url, options} = POST_PRODUCT(token, body)
           const response = await fetch(url, options)
           if(!response.ok) throw new Error(`Error: ${response.statusText}`)
           
           window.location.href = "/cardapio";
       } catch (error) {
           console.log(error)
       }
    } 

    React.useEffect(()=>{
        getData()
    },[])

    return(
        <>
        
        <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Cadastrar Ítem</Typography></h1>             
          </div>
        
        <form  onSubmit={handleSubimit}>
            <div className="formContainer"> 
                <Grid>
                    <GridRow>
                        <GridCell span={12}>
                            <GridRow>
                                <GridCell span={6}>
                                    <TextField type="text" name="name" fullwidth placeholder="Nome"  />
                                </GridCell>
                                <GridCell span={6}>
                                    <TextField type="text" name="description" fullwidth placeholder="Descrição"  />
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={4}>
                                    <TextField type="text" name="code" fullwidth placeholder="Código"  />
                                </GridCell>
                                <GridCell span={4}>
                                    <TextField type="text" name="value" fullwidth placeholder="Preço"  />
                                </GridCell>
                                <GridCell span={4}>
                                
                                    <Select label="Selecione a categoria" 
                                    options={categories}
                                    onChange={(evt)=>setCategory(evt.currentTarget.value)}
                                    />
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={6}>
                                    <Select label="Selecione a impressora"   
                                    options={printers}
                                    onChange={(evt)=>setPrinter(evt.currentTarget.value)}
                                    />
                                </GridCell>
                            </GridRow>
                            <br/>
                            <GridRow>
                            <GridCell span={9}>
                                
                            </GridCell>               
                            <GridCell span={3}>
                                <Button label="Cadastrar" outlined icon="add" className={"BtnDefaultSearch"} type="submit"/>
                                </GridCell>
                            </GridRow>
                        </GridCell>    
                    </GridRow>
                </Grid>
            </div>
        </form>
        </div>
        </>
    )
}

export default AddProduct