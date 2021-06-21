import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_ATTRIBUTES, GET_PRODUCT, POST_ATTRIBUTE, PUT_PRODUCT_ATTRIBUTE,POST_ATTRIBUTE_VALUE } from '../../Api'
import { Grid, GridCell, GridRow,
    Typography,
    Button,
    TextField,
    Switch,
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
  import useForm from '../../Hooks/UseForm'
const Product =()=>{
   const {id} = useParams()
   const [product, setProduct] = React.useState({})
   const [attributes, setAttributes] = React.useState([])
   const [formAttribute, setFormAttribute] = React.useState(false)
   const [open, setOpen] = React.useState(false)
   const [attributeid, setAttributeid] = React.useState(0)
   const maxItem = useForm()
   const additionalValue = useForm()
   const valueName = useForm()
   const valueDescription = useForm()
    const getData = async ()=>{
        try {
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error(`Error: Token inválido`)
            const {url, options} = GET_PRODUCT(token, id)
            const respose = await fetch(url, options)
            if(!respose.ok) throw new Error(`Error: ${respose.statusText}`)
            const {product} = await respose.json()
            setProduct(product)
        } catch (error) {
            console.log(error)
        }
    }

    const getAttributes = async ()=>{
        try {
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error(`Error: Token inválido`)
            const {url, options} = GET_ATTRIBUTES(token)
            const respose = await fetch(url, options)
            if(!respose.ok) throw new Error(`Error: ${respose.statusText}`)
            const {attributes} = await respose.json()
            setAttributes(attributes)
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
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error(`Error: Token inválido`)
            const {url, options} = POST_ATTRIBUTE(token, body)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            const {attribute} = await response.json()
            if(attribute.id){
                const valuesApi = PUT_PRODUCT_ATTRIBUTE(token, product.id, attribute.id)
                const resp = await fetch(valuesApi.url, valuesApi.options)
                if(!resp.ok) throw new Error(`Error: ${resp.statusText}`)
                getAttributes()
                getData()
            } 

        } catch (error) {
            console.log(error)
        }
    }

    const attributeToProduct = async event =>{
        event.preventDefault()
        try {
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error(`Error: Token inválido`)
            const {url, options} = PUT_PRODUCT_ATTRIBUTE(token, product.id, event.target.id)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            getData()
        } catch (error) {
            console.log(error)
        }
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
           getData()
           valueName.setValue('')
           valueDescription.setValue('')
           maxItem.setValue('')
           additionalValue.setValue('')
        } catch (error) {
            console.log(error)
        }
    }

    const openModalAddId = (event) =>{
        event.preventDefault()
        setOpen(true)
        setAttributeid(event.target.id)
    }

    React.useEffect(()=>{
        getData()
        getAttributes()
    },[])
    return(
        <>
            <MainNav />
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

            <div className={"PageContainer"}>
                <div className={"PageTitle"}>        
                    <h1><Typography use="headline1">{product.name}</Typography></h1>             
                </div>
                <div  className="formContainer">
                <Grid>
                    <GridRow>
                        <GridCell span={12}>
                            <GridRow>
                                <GridCell span={6}>   
                                <Typography use="overline">Nome: {product.name}</Typography>
                                </GridCell>
                                <GridCell span={6}>   
                                <Typography use="overline">Código: {product.code}</Typography>
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={12}>
                                    <Typography use="overline">Descrição: {product.description}</Typography>
                                </GridCell>
                            </GridRow>
                            <GridRow>
                                <GridCell span={6}>   
                                <Typography use="overline">Preço: R${product.value}</Typography>
                                </GridCell>
                                <GridCell span={6}>   
                                <Typography use="overline">Status: {product.status}</Typography>
                                </GridCell>
                            </GridRow>

                        </GridCell>
                    </GridRow>
                </Grid>
                <Grid>
                <GridRow>
                    <GridCell span={12}>
                        <GridRow>
                        <GridCell span={6}>
                            <Typography use="headline6">Variações</Typography>
                        </GridCell>
                        <GridCell span={6}>
                        { formAttribute && <Button className={"BtnDefaultTmenu"} label="Fechar" icon="filter_list" onClick={()=>setFormAttribute(!formAttribute)}/>}
                        {!formAttribute && <SimpleMenu handle={                 
                        <Button className={"BtnDefaultTmenu"} label="Adicionar variação" icon="filter_list" />
                        }>
                            <MenuItem onClick={()=>setFormAttribute(!formAttribute)}>Cadastrar variação</MenuItem>
                            { attributes && attributes.map(attribute=>{
                                return(
                                    <MenuItem key={attribute.id} id={attribute.id} onClick={attributeToProduct}>{attribute.title}</MenuItem>
                                )
                            })}
                        </SimpleMenu>}
                        </GridCell>
                        </GridRow>
                        {
                            formAttribute &&
                            <form onSubmit={addAttribute}> 
                            <GridCell span={12}>
                                <GridRow>
                                    <GridCell span={6}>
                                    <TextField type="text" name="title" fullwidth placeholder="Nome"  />
                                    </GridCell>
                                    <GridCell span={6}>
                                    <TextField type="text" name="description" fullwidth placeholder="Descrição"  />
                                    </GridCell>
                                </GridRow>
                                <GridRow>
                                    <GridCell span={6}>
                                    <TextField type="number" name="max_item" fullwidth placeholder="Número máximo de itens"  />
                                    </GridCell>
                                    <GridCell span={6}>
                                    <Switch  label="Item obrigatório?" name="required" />
                                    </GridCell>
                                </GridRow>
                                <GridRow>
                                    <GridCell span={6}></GridCell>
                                    <GridCell span={6}>
                                    <Button label="Cadastrar" outlined icon="add" className={"BtnDefaultSearch"} type="submit"/>
                                    </GridCell>
                                </GridRow>
                            </GridCell>
                            </form>
                        }
                    </GridCell>
                   
                </GridRow>    
                <br/>
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
                            {product.attributes &&
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
                </Grid>
                </div>
            </div>
        </>
    )
}

export default Product