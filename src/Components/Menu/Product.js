import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_ATTRIBUTES, GET_PRODUCT } from '../../Api'
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
const Product =()=>{
   const {id} = useParams()
   const [product, setProduct] = React.useState({})
   const [attributes, setAttributes] = React.useState([])
   const [formAttribute, setFormAttribute] = React.useState(false)
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
    React.useEffect(()=>{
        getData()
        getAttributes()
    },[])
    return(
        <>
            <MainNav />
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
                                    <MenuItem>{attribute.title}</MenuItem>
                                )
                            })}
                        </SimpleMenu>}
                        </GridCell>
                        </GridRow>
                        {
                            formAttribute &&
                            <form> 
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
                                                        <MenuItem>Adionar valor</MenuItem>
                                                    {attribute.values.map(value =>{
                                                        console.log(value)
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