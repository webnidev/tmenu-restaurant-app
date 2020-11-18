import React from "react";
import MainNav from "./MainNav";
import { Grid, GridCell, GridRow, TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust, Card, CardPrimaryAction, CardMedia,
  Typography, CardActions, CardActionButtons, CardActionButton, CardActionIcons, CardActionIcon} from "rmwc";


const App = () => {
  return (
    <>    
            
      <div className={"MainContainer"}>
        <MainNav />
  
        <div className={"PageContainer"}>
          <div className={"PageTitle"}>        
            <h1><Typography use="headline1">PAINEL</Typography></h1>             
          </div>
          <Grid className={"CardsHome"} z={1}>
              <GridCell>
                <Card>
                  Card 1
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                  Card 2
                </Card>
              </GridCell>
              <GridCell>
                <Card>
                  Card 3
                </Card>
              </GridCell>              
            </Grid> 
        </div>       
           
      </div>
      
    </>
  );
};

export default App;
