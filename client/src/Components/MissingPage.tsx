import {  Grid } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import '../css/components.css';
import { useHistory } from 'react-router-dom';

function MissingPage() {
	let history = useHistory();
	
	return (
    <Grid container justify="center" alignItems="center" className="landingContainer" style={landingContainer}>
      <Grid container sm={12} lg={12} style={infoLandingContainer}>
        <img style={infoLandingContainerImage} src="./assets/imgs/play/wrong.png" alt="glatt-turnerings-sallskap" /> 
        <Grid container className="flex" style={textLandingContainer}> 
          <Grid container style={goBack}>
						<h1>Någonting gick fel - </h1>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => history.goBack()}
						>
              Gå Tillbaka
						</Button>
          </Grid>
        	<div className="breaker"></div>
					<Grid container className="bottom-p">
						<p>picture above: 'Thoughtseize' illustrated by: Chuck Lukacs</p>
					</Grid> 
				</Grid>
    	</Grid>
  	</Grid>    
  );
}

const landingContainer: CSSProperties = {
    backgroundImage: 'url(./assets/imgs/what-the-hex.png)',    
    height: '100%', 
}

const infoLandingContainer: CSSProperties = {  
    maxWidth: '60rem',
    margin: '8rem 2rem 2rem 2rem',
    bottom: 0,
    borderRadius: '15px',
    overflow: 'hidden',
}

const infoLandingContainerImage: CSSProperties = {
    width: '100%',
    height: '25rem',
    objectFit: 'cover',
    top: 0,
    bottom: 0,
}

const textLandingContainer: CSSProperties = {
    width: '100%',
    top: 0,
    backgroundColor: '#E2E2E2',
    padding: '2rem'
}

const goBack: CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
}


export default MissingPage;