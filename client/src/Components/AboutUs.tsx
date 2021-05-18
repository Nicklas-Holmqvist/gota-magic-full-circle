import { CSSProperties } from '@material-ui/styles';
import '../main.css';
import '../css/components.css';
import { Link } from 'react-router-dom';
import {  Grid } from '@material-ui/core'


function AboutUs() {
    return (

        <Grid container 
        justify="center" 
        alignItems="center" 
        className="landingContainer" 
        style={landingContainer}>

            <Grid container xs={12} md={10} style={infoLandingContainer}>
  
               <img style={infoLandingContainerImage} src="./assets/imgs/play/STASIS.jpg" alt="glatt-turnerings-sallskap" />                   
                <Grid container className="component-title flex" style={titleHeader}>
                    <h2>
                        Om oss                       
                    </h2>
                </Grid>
                <Grid container className="flex" style={textLandingContainer}>
                    <Grid container className="tour-kort">

                    <Grid className="tour-kort-item" item xs={10} md={12}>
                    <h2>Göta Magic</h2>
                    <p className="kort-p">
                        Vi är ett glatt sällskap Magicentusiaster lokaliserade 
                        i Göteborg
                        Vårt mål är att kunna bistå med allt som krävs 
                        för att kunna spela
                        vårat favoritspel både genom att 
                        sälja produkter 
                        samt anordna turneringar och hålla er uppdaterade
                        med vad som händer i Magic-Sverige.

                        <br/>
                        <br/>
                        Kontakta oss gärna <Link to="./Contact">här</Link> med frågor eller förslag
                    </p>
                    </Grid>
                   
                    </Grid>
                     <div className="breaker"></div>
                
                    <Grid container className="bottom-p">
                        <p>picture above: Stasis illustrated by: Seb McKinnon</p>
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

const titleHeader: CSSProperties = {
    fontSize: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: '100%',
    backgroundImage: 'url(./assets/imgs/mtg)',
    objectFit: 'cover',
    color: 'white'
}

const infoLandingContainer: CSSProperties = {  
    maxWidth: '60rem',
    margin: '8rem 2rem 2rem 2rem',
    bottom: 0,
    borderRadius: '15px',
    overflow: 'hidden'
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

export default AboutUs;