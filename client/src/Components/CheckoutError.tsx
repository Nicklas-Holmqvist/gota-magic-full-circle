import { Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import React from 'react'
import '../main.css';

function CheckoutError() {
    return(
        <div style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
            <h3 style={{paddingBottom: '2rem'}}>Inget i kundkorgen</h3>
            <Link to="/" className="link-style">
            <Button
                    variant="contained"
                    color="primary"
                    href="/"
                  >
                    Gå till start
                  </Button>
            </Link>
        </div>
    )
}

export default CheckoutError