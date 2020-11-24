import React from "react";
import { Grid, GridCell, Card, Typography, Icon } from "rmwc";


const Home = () => {
  return (
    <>           
     <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">PAINEL</Typography></h1>             
          </div>
          <Grid className={"CardsHome"} z={1}>
              <GridCell>
                <Card>
                  <Icon icon={{ icon: 'view_comfy', size: 'xlarge' }} style={{ color: '#16A104'}} />
                  <span className={"CardsHomeTitle"}>TOTAL DE MESAS CADASTRADAS</span>
                  <span className={"CardsHomeValue"} style={{ color: '#16A104'}}>0</span>
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                  <Icon icon={{ icon: 'receipt_long', size: 'xlarge' }} style={{ color: '#169FFF'}} />
                  <span className={"CardsHomeTitle"}>TOTAL DE COMANDAS FATURADAS</span>
                  <span className={"CardsHomeValue"} style={{ color: '#169FFF'}}>0</span>
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                <Icon icon={{ icon: 'shopping_cart', size: 'xlarge' }} style={{ color: '#FF144F'}} />
                  <span className={"CardsHomeTitle"}>TOTAL DE PEDIDOS REALIZADOS</span>
                  <span className={"CardsHomeValue"} style={{ color: '#FF144F'}}>0</span>
                </Card>
              </GridCell>            
            </Grid>
        </div>   
      
    </>
  );
};

export default Home;
