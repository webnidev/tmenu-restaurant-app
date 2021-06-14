import React from "react";
import { Grid,
  GridCell,
  Typography,
  Card,
  Badge,
  Button,
  GridRow,
  Icon,
  SimpleMenu,
  IconButton,
  MenuItem
 } from "rmwc";
import MainNav from "../../MainNav";

  import "./Tables.css";


const TablesIndex = () => {
  return (
    <>          
    <MainNav/>
     <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">Mesas</Typography></h1>             
          </div>
          <Grid className={"CardsMesas"} z={1}>
              <GridCell span={3}>
                <Card>
                  <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={8}>
                          <SimpleMenu handle={<Button style={{color: "black"}} label="Ações" icon="settings" />}>
                                  <MenuItem><Icon icon="add_circle_outline" /> Incluir Pedido</MenuItem>
                                  <MenuItem><Icon icon="visibility" /> Ver Extrato</MenuItem>
                                  <MenuItem><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  <MenuItem><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>
                                  <MenuItem><Icon icon="switch_account" /> Definir Garçom</MenuItem>
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>                  
                  
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>12</span>
                  <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>João</span></span>
                  <a href="">
                    <div className={"CardsMesasAlertZone"}>
                        Nenhum novo pedido
                    </div>
                  </a>
                </Card>
              </GridCell>
              <GridCell span={3}>
                <Card>
                <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={8}>
                          <SimpleMenu handle={<Button style={{color: "black"}} label="Ações" icon="settings" />}>
                                  <MenuItem><Icon icon="add_circle_outline" /> Incluir Pedido</MenuItem>
                                  <MenuItem><Icon icon="visibility" /> Ver Extrato</MenuItem>
                                  <MenuItem><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  <MenuItem><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>
                                  <MenuItem><Icon icon="switch_account" /> Definir Garçom</MenuItem>
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>09</span>
                  <span className={"AttendedByNoOne"}>Sem garçom definido</span>
                  <a href="">                  
                      <div className={"CardsMesasAlertZone AlertZoneRequestNewOrder"}>                        
                        <Badge align="inline" label={2} style={{ background: '#2196f3' }}/>
                        <Typography use="overline" className={"strong"}> Novo(s) pedido(s)!</Typography>
                      </div>
                  </a>
                </Card>
              </GridCell>
              <GridCell span={3}>
                <Card>
                <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={8}>
                          <SimpleMenu handle={<Button style={{color: "black"}} label="Ações" icon="settings" />}>
                                  <MenuItem><Icon icon="add_circle_outline" /> Incluir Pedido</MenuItem>
                                  <MenuItem><Icon icon="visibility" /> Ver Extrato</MenuItem>
                                  <MenuItem><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  <MenuItem><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>
                                  <MenuItem><Icon icon="switch_account" /> Definir Garçom</MenuItem>
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>07</span>
                  <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>José</span></span>
                    <a href="">
                      <div className={"CardsMesasAlertZone AlertZoneRequestTheBill"}>                        
                        <Icon icon="notification_important" />
                        <Typography use="overline" className={"strong"}> Pedindo a conta!</Typography>
                      </div>
                    </a>
                </Card>
              </GridCell>
              <GridCell span={3}>
                <Card>
                <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={8}>
                          <SimpleMenu handle={<Button style={{color: "black"}} label="Ações" icon="settings" />}>
                                  <MenuItem><Icon icon="add_circle_outline" /> Incluir Pedido</MenuItem>
                                  <MenuItem><Icon icon="visibility" /> Ver Extrato</MenuItem>
                                  <MenuItem><Icon icon="account_balance_wallet" /> Fechar Conta</MenuItem>
                                  <MenuItem><Icon icon="add_to_queue" /> Abrir Mesa</MenuItem>
                                  <MenuItem><Icon icon="switch_account" /> Definir Garçom</MenuItem>
                          </SimpleMenu>
                        </GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>05</span>
                  <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>João</span></span>
                  <a href="">
                    <div className={"CardsMesasAlertZone"}>
                      Nenhum novo pedido
                    </div>
                  </a>
                </Card>
              </GridCell>                     
            </Grid> 
        </div>   
      
    </>
  );
};

export default TablesIndex;
