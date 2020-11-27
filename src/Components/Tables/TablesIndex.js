import React from "react";
import { Grid,
  GridCell,
  Typography,
  Card,
  Badge,
  Button,
  GridRow,
  Icon } from "rmwc";

  import "./Tables.css";


const TablesIndex = () => {
  return (
    <>          
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
                        <GridCell span={6}><Button style={{color: "black"}} label="Ações" icon="settings" /></GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>12</span>
                  <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>João</span></span>
                  <div className={"CardsMesasAlertZone"}>
                      Alert Zone
                  </div>
                </Card>
              </GridCell>
              <GridCell span={3}>
                <Card>
                <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={6}><Button style={{color: "black"}} label="Ações" icon="settings" /></GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>09</span>
                  <span className={"AttendedByNoOne"}>Sem garçom definido</span>                  
                  <div className={"CardsMesasAlertZone"}>
                      Alert Zone
                  </div>
                </Card>
              </GridCell>
              <GridCell span={3}>
                <Card>
                <Grid>  
                      <GridRow>
                        <GridCell span={6}><Badge className={"TmenuSuccess"} align="inline" label="Em atendimento" /> </GridCell>
                        <GridCell span={6}><Button style={{color: "black"}} label="Ações" icon="settings" /></GridCell>
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
                        <GridCell span={6}><Button style={{color: "black"}} label="Ações" icon="settings" /></GridCell>
                      </GridRow>
                  </Grid>
                  <span className={"CardsMesasTitle"}>MESA</span>
                  <span className={"CardsMesasValue"}>05</span>
                  <span className={"AttendedBy"}>Mesa atendida por: <span className={"strong"}>João</span></span>
                  <div className={"CardsMesasAlertZone"}>
                      Alert Zone
                  </div>
                </Card>
              </GridCell>                     
            </Grid> 
        </div>   
      
    </>
  );
};

export default TablesIndex;
