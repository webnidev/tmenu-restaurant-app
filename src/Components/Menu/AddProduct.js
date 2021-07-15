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
    Icon,
    Switch,
    Radio
  } from "rmwc";
  import useForm from '../../Hooks/UseForm'
  import { GET_PRINTERS, GET_CATEGORIES, POST_PRODUCT, 
    GET_ATTRIBUTES, POST_ATTRIBUTE,
    PUT_PRODUCT_ATTRIBUTE, GET_PRODUCT,
    POST_ATTRIBUTE_VALUE, POST_ADD_IMAGE_PRODUCT } from '../../Api';
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
    const [attributeid, setAttributeid] = React.useState(0)
    const [value, setValue] = React.useState('withOutComplement')
    const [attributes, setAttributes] = React.useState({})
    const [formAttribute, setFormAttribute] = React.useState(false)
    const maxItem = useForm()
    const additionalValue = useForm()
    const valueName = useForm()
    const valueDescription = useForm()
    const [open, setOpen] = React.useState(false)
    const [img, setImg] = React.useState({})
    const token = window.localStorage.getItem('token')
    const setData=(data)=>{
        const interData = {}
        data.map(obj => {
            interData[obj.id]=obj.name
        })
        return interData
    }

    const getData = async ()=>{
        try {
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

    const getAttributes = async ()=>{
        const {url, options} = GET_ATTRIBUTES(token)
        const response = await fetch(url, options)
        if(!response.ok) throw new Error(response.statusText)
        const {attributes} = await response.json()
        setAttributes(attributes)
        getProduct()
    }

    const getProduct= async () =>{
        try {
            const {url, options} = GET_PRODUCT(token, product.id)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(response.statusText)
            const newProduct = await response.json()
            setProduc(newProduct.product) 
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
    const attributeToProduct = async event =>{
        event.preventDefault()
        try {
            const {url, options} = PUT_PRODUCT_ATTRIBUTE(token, product.id, event.target.id)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            getProduct()
        } catch (error) {
            console.log(error)
        }
    }

    const addAttribute = async event =>{
        event.preventDefault()
        try {
            const body ={
                title: event.target.title.value,
                description: event.target.description.value,
                max_item: event.target.max_item.value,
                required: event.target.required.checked
            }
            const {url, options} = POST_ATTRIBUTE(token, body)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            const {attribute} = await response.json()
            if(attribute.id){
                const valuesApi = PUT_PRODUCT_ATTRIBUTE(token, product.id, attribute.id)
                const resp = await fetch(valuesApi.url, valuesApi.options)
                if(!resp.ok) throw new Error(`Error: ${resp.statusText}`)
                getAttributes()
                setFormAttribute(false)
                alert('Complemento cadastrado com sucesso!')
            } 
        } catch (error) {
            console.log(error)
        }
    }

    const openModalAddId = (event) =>{
        event.preventDefault()
        setOpen(true)
        setAttributeid(event.target.id)
    }

    const addAttributeValue = async event =>{
        event.preventDefault()
        try {
           const body={
               name:event.target.name.value,
               description: event.target.description.value,
               additional_value: event.target.additional_value.value,
               max_item: event.target.max_item.value,
               attribute_id: attributeid
           }
           const token = window.localStorage.getItem('token')
           if(!token) throw new Error(`Error: Token inválido`)
           const {url, options} = POST_ATTRIBUTE_VALUE(token, body)
           const response = await fetch(url, options)
           if(!response.ok) throw new Error(`Error: ${response.statusText}`)
           getProduct()
           valueName.setValue('')
           valueDescription.setValue('')
           maxItem.setValue('')
           additionalValue.setValue('')
        } catch (error) {
            console.log(error)
        }
    }

    function handleImgChange({target}){
        setImg({
            raw:target.files
        })
    }

    const handleImgSubmit = async event =>{
        event.preventDefault()
        const files = event.target.files;
        try {
            const formData = new FormData()
            for(let i = 0; i < files.length; i++){
                formData.append(`file[${i}]`, files[i])
            }
            
            formData.append('product_id', product.id)
            const {url, options} = POST_ADD_IMAGE_PRODUCT(token,formData)
            console.log(img)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(response.statusText)
            getProduct()
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
        getData()
        getAttributes()
    },[])

    return(
        <>       
        <div>
        <Dialog open={open} onClose={evt => {
                console.log(evt.detail.action);
                setOpen(false);
                }}
            onClosed={evt => console.log(evt.detail.action)}>
            <DialogTitle>Cadastrar valor</DialogTitle>
            <form onSubmit={addAttributeValue}>
            <DialogContent>
                <TextField fullwidth placeholder="Nome" name="name" {...valueName}/>
                <TextField fullwidth placeholder="Descrição" name="description" {...valueDescription} />
                <TextField fullwidth placeholder="Valor adicional" name="additional_value" {...additionalValue} />
                <TextField fullwidth placeholder="Qantidade máxima permitida" name="max_item" {...maxItem} />
            </DialogContent>
            <DialogActions>
                <DialogButton className={"BtnDefaultTmenu"} action="accept" isDefaultAction>
                Salvar!
                </DialogButton>
            </DialogActions>
            </form>
            </Dialog>
          <div className="title">        
          <h1><Typography use="headline5">{product?product.name:"Cadastrar Item"}</Typography></h1>   
          </div>
          <div className="abas">
          <Grid>
              <GridRow>
                  <GridCell span={12}>
                          {product?<i>Produto</i>:<span onClick={()=>showAproduct()}>Produto</span>} 
                          {!product?<i>Complemento</i>:<span onClick={()=>showAcomplement()} >Complemento</span>}
                          {!product?<i>Imagens</i>:<span onClick={()=>showAimage()} >Imagens</span>}
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
        {acomplement && product &&
        <div className="complementContainer">
            <h3><Typography use="headline6">Complementos</Typography></h3>
            <h5><Typography use="body1">Seu produto possui complementos? Informe abaixo.</Typography></h5>
            <Grid>
                <GridRow>
                    <GridCell span={12}>
                        <GridRow>
                            <GridCell>
                                <span><Radio  value="withComplement" checked={value==='withComplement'}
                                 onChange={evt => setValue(String(evt.currentTarget.value))}
                                >Possui complemento</Radio></span>
                                <span><Radio   value="withOutComplement" checked={value==='withOutComplement'}
                                 onChange={evt => setValue(String(evt.currentTarget.value))}
                                >Não possui complemento</Radio></span>
                            </GridCell>
                        </GridRow>
            </GridCell>
            </GridRow>
            </Grid>
                        {value === 'withComplement' &&
                        <Grid>
                        <GridRow>
                            <GridCell>
                            {console.log(attributes)}
                             <SimpleMenu handle={<Button  label="Complementos" icon="filter_list" />}>
                                 {  attributes &&
                                     attributes.map(attribute=>{
                                         return(
                                            <MenuItem  value={attribute.id} id={attribute.id} onClick={attributeToProduct}>{attribute.title}</MenuItem>
                                         )
                                     })
                                 }
                             </SimpleMenu>
                             </GridCell>
                             <GridCell>
                             <Button label={formAttribute?"Fechar":"Adicionar complemento"} outlined icon="add"  icon="add" onClick={()=>setFormAttribute(!formAttribute)} />
                             </GridCell>
                        </GridRow>       
                </Grid>                        
                        }                    
            {  value === 'withComplement' && formAttribute && 
                    <Grid>
                        <GridRow>
                        <GridCell span={12}>
                            <form onSubmit={addAttribute}> 
                                <GridRow>
                                    <GridCell span={6}>
                                    <TextField type="text" name="title" fullwidth placeholder="Nome do complemento (obrigatório)"  required/>
                                    </GridCell>
                                    <GridCell span={6}>
                                    <TextField type="text" name="description" fullwidth placeholder="Descrição (obrigatório)"  required/>
                                    </GridCell>
                                </GridRow>
                                <GridRow>
                                    <GridCell span={6}>
                                    <TextField type="number" name="min_item" fullwidth placeholder="Número mínimo de itens (obrigatório)"  required/>
                                    </GridCell>
                                    <GridCell span={6}>
                                    <TextField type="number" name="max_item" fullwidth placeholder="Número máximo de itens (obrigatório)"  required/>
                                    </GridCell>
                                   
                                </GridRow>
                                <br/>
                                <GridRow>
                                <GridCell span={6}>
                                    <Switch  label="Item obrigatório?" name="required" />
                                    </GridCell>
                                    <GridCell span={6}>
                                    <Button label="Cadastrar" outlined icon="add" className={"BtnDefaultSearch"} type="submit"/>
                                    </GridCell>
                                </GridRow>

                            </form>
                            </GridCell>
                            </GridRow>
                        </Grid>
                        }
                        {
                            value === 'withComplement' &&
                            <Grid>
                                <GridRow>
                                    <GridCell span={12}>
                                        <GridRow>
                                            <GridCell span={12}>
                                            <h3><Typography use="headline6">Complementos de {product.name}</Typography></h3>
                                            </GridCell>
                                        </GridRow>
                                        <GridRow>
                                            <GridCell>
                                                <DataTable className={"TabelaProdutos"}>
                                                    <DataTableContent>
                                                    <DataTableHead>
                                                        <DataTableRow>
                                                            <DataTableHeadCell>Nome</DataTableHeadCell>
                                                            <DataTableHeadCell alignEnd>Descrição</DataTableHeadCell>
                                                            <DataTableHeadCell alignEnd>Máximo de itens</DataTableHeadCell> 
                                                            <DataTableHeadCell alignEnd></DataTableHeadCell>                            
                                                        </DataTableRow>
                                                    </DataTableHead>
                                                    <DataTableBody>
                                                        {
                                                            product.attributes &&
                                                            product.attributes.map(attribute=>{
                                                                return(
                                                                    <DataTableRow key={attribute.id} >
                                                                        <DataTableCell >{attribute.title}</DataTableCell>
                                                                        <DataTableCell alignEnd>{attribute.description}</DataTableCell>
                                                                        <DataTableCell >{attribute.max_item}</DataTableCell>
                                                                        <SimpleMenu handle={<Button className={"BtnDefaultTmenu"} label="Valores" icon="filter_list" />}>
                                                                                <MenuItem onClick={openModalAddId} id={attribute.id}>Adionar valor</MenuItem>
                                                                            {attribute.values.map(value =>{
                                                                                return(
                                                                                    <MenuItem  value={value.id}>{value.name}</MenuItem>
                                                                                )
                                                                            })
                                                                        
                                                                            }
                                                                        </SimpleMenu>
                                                                    </DataTableRow>
                                                                )
                                                            })
                                                        }
                                                    </DataTableBody>
                                                    </DataTableContent>
                                                </DataTable>
                                            </GridCell>
                                        </GridRow>
                                    </GridCell>
                                </GridRow>
                            </Grid>
                        }
                        <Grid>
                        <GridRow>
                            <GridCell span={9}>                                
                            </GridCell>
                        <GridCell span={3}>
                            <Button label={loadind?"Aguarde...":"Proximo"} outlined icon="add" className={"BtnDefaultSearch"} onClick={()=>showAimage()}/>
                        </GridCell>
                        </GridRow> 
                        </Grid>
        </div>
        }
        {acomplement && !product &&<div>Nenhum produto cadastrado</div>}
        {aimage && <div className="imageContainer">
                <Grid>
                    <GridRow>
                        <GridCell span={12}>
                            <GridRow>
                                <GridCell span={12}>
                                <h3><Typography use="headline6">Adicione fotos para {product.name}</Typography></h3>
                                </GridCell>
                            </GridRow>
                            <form onSubmit={handleImgSubmit}>
                            <GridRow>
                                <GridCell span={6}>
                                    <input type="file" name="file" onChange={handleImgChange} multiple/>
                                </GridCell>
                                <GridCell span={6}>
                                <Button label="Salvar" outlined icon="add" className={"BtnDefaultSearch"} type="submit"/>
                                </GridCell>
                            </GridRow>
                            </form>
                        </GridCell>
                    </GridRow>
                </Grid>
            </div>}
        </div>
        </>
    )
}

export default AddProduct