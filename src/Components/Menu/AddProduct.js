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
  import { GET_PRINTERS, GET_CATEGORIES, POST_PRODUCT } from '../../Api';
  import './Product.css'
const AddProduct =()=>{
    const [printer, setPrinter] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [printers, setPrinters] = React.useState({id:'', name:''})
    const [categories, setCategories] = React.useState({id:'', name:''})
    const [aproduct, setAproduct] = React.useState(true)
    const [acomplement, setAcomplement] = React.useState(false)
    const [aimage, setAimage] = React.useState(false)
    const [product,setProduc] = React.useState(null)
    const[loadind, setLoading] = React.useState(false)


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
           setLoading(true)
           if(!product){
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
           const {product} = await response.json()
           setProduc(product)
           showAcomplement()
           }else{
               showAcomplement()
           }
           
           //window.location.href = "/cardapio";
       } catch (error) {
           console.log(error)
       }
       finally{
        setLoading(false)
       }
    } 
    const showAproduct =()=>{
        setAcomplement(false)
        setAimage(false)
        setAproduct(true)
    }

    const showAcomplement =()=>{
        setAproduct(false)
        setAimage(false)
        setAcomplement(true)
    }
    const showAimage =()=>{
        setAcomplement(false)
        setAproduct(false)
        setAimage(true)
    }

    React.useEffect(()=>{
        getData()
    },[])

    return(
        <>       
        <div>
          <div className="title">        
          <h1><Typography use="headline5">Cadastrar Ítem</Typography></h1>   
          </div>
          <div className="abas">
          <Grid>
              <GridRow>
                  <GridCell span={12}>
                          <span onClick={()=>showAproduct()}>Produto</span> 
                          <span onClick={()=>showAcomplement()} >Complemento</span>
                          <span onClick={()=>showAimage()} >Imagens</span>
                  </GridCell>
              </GridRow>
          </Grid>
          </div>
        {   aproduct && !product &&
            <form  onSubmit={handleSubimit}>      
            <div className="formContainer">            
                <Grid>
                    <GridRow>
                        <GridCell>
                        <h2><Typography use="headline5">Dados do Produto</Typography></h2>
                        </GridCell>
                    </GridRow>
                    <GridRow>
                        <GridCell span={12}>
                            <GridRow>
                            <GridCell span={7}>                                
                                    <Select label="Selecione a categoria (Obrigatório)" 
                                    options={categories}
                                    onChange={(evt)=>setCategory(evt.currentTarget.value)}
                                    required
                                    />
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={6}>
                                    <TextField type="text" name="name" fullwidth placeholder="Nome (Obrigatório)"  required/>
                                </GridCell>
                                <GridCell span={6}>
                                    <TextField type="text" name="description" fullwidth placeholder="Descrição (Obrigatório)" required />
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={6}>
                                    <TextField type="text" name="code" fullwidth placeholder="Código (Opcional)"  />
                                </GridCell>
                                <GridCell span={6}>
                                    <TextField type="text" name="value" fullwidth placeholder="Preço (Obrigatório)"  required/>
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={6}>
                                    <Select label="Selecione a impressora (Obrigatório)"   
                                    options={printers}
                                    onChange={(evt)=>setPrinter(evt.currentTarget.value)}
                                    required
                                    />
                                </GridCell>
                            </GridRow>
                            <br/>
                            <GridRow>
                            <GridCell span={9}>                                
                            </GridCell>               
                            <GridCell span={3}>
                                <Button label={loadind?"Aguarde...":"Proximo"} outlined icon="add" className={"BtnDefaultSearch"} type="submit" />
                                </GridCell>
                            </GridRow>
                        </GridCell>    
                    </GridRow>
                </Grid>
            </div>
        </form>}
        {product && <div>O Produto {product.name} está cadastrado, adicione imagem e Complementos</div>}
        {acomplement && product &&<div>Complemento do {product.name}</div>}
        {acomplement && !product &&<div>Nenhum produto cadastrado</div>}
        {aimage && <div>Imagens</div>}
        </div>
        </>
    )
}

export default AddProduct