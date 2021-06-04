import { CSSProperties } from '@material-ui/styles';
import '../main.css';
import '../css/components.css';
import {  Grid } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';


function Contact() {
	return (
			<Grid container justify="center" alignItems="center" className="landingContainer" style={landingContainer}>
				<Grid container xs={12} md={10} style={infoLandingContainer}>
					<img style={infoLandingContainerImage} src="./assets/imgs/play/totallylost.png" alt="glatt-turnerings-sallskap" />                   
					<Grid container className="component-title flex" style={titleHeader}>
						<h2>
							Kontakta oss                      
						</h2>
					</Grid>
					<Grid container className="flex" style={textLandingContainer}>
						<Grid container className="tour-kort">
							<Grid className="tour-kort-item-contact" item xs={12} md={12}>
								<h2>Göta Magic</h2>
								<div className="kontakt-container">
									<div className="kontakt-seperator">
										<div className="icon-div">
											<PhoneIcon style={{ fontSize: 40 }} />
										</div>
										<h3>0737 141414</h3>
									</div>

									<div className="kontakt-seperator">
										<div className="icon-div">
											<MailIcon style={{ fontSize: 40 }} />
										</div>
										<h3>Gotamagic@gmail.com</h3>
									</div>

									<div className="kontakt-seperator">
										<div className="icon-div">
											<HomeIcon style={{ fontSize: 40 }} />
										</div>
										<h3>Helleforsgatan 10B, 41875 Göteborg</h3>
									</div>
							</div>
						</Grid>
					</Grid>

					<div className="breaker"></div>

					<Grid container className="bottom-p">
						<p>picture above: Totally Lost illustrated by: David Palumbo</p>
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
	top: 0,
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
	padding: '1rem 3rem 3rem 3rem'
}

export default Contact;