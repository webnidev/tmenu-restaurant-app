import React from "react";
import { Grid, GridCell, GridRow,
  Typography,
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell,
  SimpleMenu,
  MenuItem,
  Badge,
  IconButton,
  Icon,
  Button

} from "rmwc";

import './Invoices.css';


const InvoicesIndex = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <>          
     <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Minhas Faturas</Typography></h1>             
          </div>
          


            <Grid className={"CustomContainer"}>
            <GridRow>
              <GridCell>
                <DataTable className={"TabelaProdutos"}>
                  <DataTableContent>
                    <DataTableHead>
                      <DataTableRow>
                        <DataTableHeadCell>Referência</DataTableHeadCell>                        
                        <DataTableHeadCell alignEnd>Comandas Fechadas</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Total a Pagar</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Ações</DataTableHeadCell>
                        <DataTableHeadCell alignEnd>Status</DataTableHeadCell>                      
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                      <DataTableRow>
                        <DataTableCell><a href="">Fatura 02 - Janeiro 2021</a></DataTableCell>
                        <DataTableCell alignEnd>598</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 3982</DataTableCell>
                        <DataTableCell alignEnd>
                          <Button label="Ver Extrato" icon="visibility" outlined />
                          <Button label="Pagar Fatura" icon="attach_money" unelevated style={{background:"#4CAF50"}} />
                        </DataTableCell>
                        <DataTableCell alignEnd>                           
                              <Badge className={"TmenuInProcess"} align="inline" label="Aberta" />                                                                            
                        </DataTableCell>                        
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Fatura 01 - Janeiro 2021</a></DataTableCell>
                        <DataTableCell alignEnd>871</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 8761</DataTableCell>
                        <DataTableCell alignEnd>
                          <Button label="Ver Extrato" icon="visibility" outlined />
                          <Button label="Pagar Fatura" icon="attach_money" unelevated style={{background:"#4CAF50"}} />
                        </DataTableCell>
                        <DataTableCell alignEnd><Badge className={"TmenuDanger"} align="inline" label="Vencida" /></DataTableCell>
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell><a href="">Fatura 02 - Dezembro 2020</a></DataTableCell>
                        <DataTableCell alignEnd>981</DataTableCell>
                        <DataTableCell alignEnd className={"strong"}>R$ 8172</DataTableCell>
                        <DataTableCell alignEnd>
                          <Button label="Ver Extrato" icon="visibility" outlined />
                          <Button label="Pagar Fatura" icon="attach_money" unelevated disabled />
                        </DataTableCell>
                          
                        <DataTableCell alignEnd><Badge className={"TmenuSuccess"} align="inline" label="Paga" /></DataTableCell>                             
                      </DataTableRow>                      
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

export default InvoicesIndex;
