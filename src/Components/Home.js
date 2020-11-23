import React from "react";
import { Grid, GridCell, Card,  Typography } from "rmwc";


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
                  Total de Mesas Cadastradas
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                  Total de comandas faturadas
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                  Total de Pedidos Realizados
                </Card>
              </GridCell>              
            </Grid> 
        </div>   
      
    </>
  );
};

export default Home;
