import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_PRODUCT } from '../../Api'
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
  import MainNav from "../../MainNav";
const Product =()=>{
   const {id} = useParams()
   const [product, setProduct] = React.useState({})
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
    React.useEffect(()=>{
        getData()
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
                    <GridCell>
                    <Typography use="headline6">Variações</Typography>
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